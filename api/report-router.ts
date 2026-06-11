import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { reports, users } from "@db/schema";
import { eq, and, desc, sql, lt } from "drizzle-orm";

export const reportRouter = createRouter({
  create: authedQuery
    .input(
      z.object({
        postId: z.number().optional(),
        commentId: z.number().optional(),
        reason: z.enum(["harassment", "spam", "harmful", "other"]),
        details: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!input.postId && !input.commentId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Must specify postId or commentId",
        });
      }

      const db = getDb();

      const result = await db.insert(reports).values({
        postId: input.postId || null,
        commentId: input.commentId || null,
        reporterId: ctx.user.id,
        reason: input.reason,
        details: input.details || null,
      });

      return { id: Number(result[0].insertId) };
    }),

  list: adminQuery
    .input(
      z
        .object({
          status: z
            .enum(["pending", "reviewed", "resolved", "dismissed"])
            .optional(),
          cursor: z.number().optional(),
          limit: z.number().default(20),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input || { limit: 20 };

      const conditions = [];
      if (params.status) {
        conditions.push(eq(reports.status, params.status));
      }
      if (params.cursor) {
        conditions.push(lt(reports.id, params.cursor));
      }

      const query =
        conditions.length > 0
          ? db
              .select({
                id: reports.id,
                postId: reports.postId,
                commentId: reports.commentId,
                reason: reports.reason,
                details: reports.details,
                status: reports.status,
                createdAt: reports.createdAt,
                resolvedAt: reports.resolvedAt,
                reporterUsername: users.username,
              })
              .from(reports)
              .leftJoin(users, eq(reports.reporterId, users.id))
              .where(and(...conditions))
              .orderBy(desc(reports.id))
              .limit(params.limit + 1)
          : db
              .select({
                id: reports.id,
                postId: reports.postId,
                commentId: reports.commentId,
                reason: reports.reason,
                details: reports.details,
                status: reports.status,
                createdAt: reports.createdAt,
                resolvedAt: reports.resolvedAt,
                reporterUsername: users.username,
              })
              .from(reports)
              .leftJoin(users, eq(reports.reporterId, users.id))
              .orderBy(desc(reports.id))
              .limit(params.limit + 1);

      const results = await query;

      let nextCursor: number | null = null;
      if (results.length > params.limit) {
        nextCursor = results[params.limit - 1].id;
        results.pop();
      }

      return { items: results, nextCursor };
    }),

  update: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "reviewed", "resolved", "dismissed"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();

      await db
        .update(reports)
        .set({
          status: input.status,
          reviewedBy: ctx.user.id,
          resolvedAt: input.status === "resolved" || input.status === "dismissed" ? new Date() : null,
        })
        .where(eq(reports.id, input.id));

      return { success: true };
    }),
});
