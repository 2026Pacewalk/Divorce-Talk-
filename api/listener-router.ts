import { z } from "zod";
import { createRouter, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { listenerRequests, users } from "@db/schema";
import { eq, desc, and, count, lt } from "drizzle-orm";

export const listenerRouter = createRouter({
  create: authedQuery
    .input(
      z.object({
        urgency: z.enum(["low", "medium", "high", "crisis"]).default("medium"),
        feeling: z.string().min(1).max(2000),
        communication: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(listenerRequests).values({
        userId: ctx.user.id,
        urgency: input.urgency,
        feeling: input.feeling,
        communication: input.communication || null,
      });
      return { id: Number(result[0].insertId) };
    }),

  myRequests: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db
      .select()
      .from(listenerRequests)
      .where(eq(listenerRequests.userId, ctx.user.id))
      .orderBy(desc(listenerRequests.createdAt));
  }),

  list: adminQuery
    .input(
      z
        .object({
          status: z
            .enum(["pending", "matched", "in_progress", "resolved"])
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
        conditions.push(eq(listenerRequests.status, params.status));
      }
      if (params.cursor) {
        conditions.push(lt(listenerRequests.id, params.cursor));
      }

      const query =
        conditions.length > 0
          ? db
              .select({
                id: listenerRequests.id,
                urgency: listenerRequests.urgency,
                feeling: listenerRequests.feeling,
                communication: listenerRequests.communication,
                status: listenerRequests.status,
                createdAt: listenerRequests.createdAt,
                username: users.username,
              })
              .from(listenerRequests)
              .leftJoin(users, eq(listenerRequests.userId, users.id))
              .where(and(...conditions))
              .orderBy(desc(listenerRequests.id))
              .limit(params.limit + 1)
          : db
              .select({
                id: listenerRequests.id,
                urgency: listenerRequests.urgency,
                feeling: listenerRequests.feeling,
                communication: listenerRequests.communication,
                status: listenerRequests.status,
                createdAt: listenerRequests.createdAt,
                username: users.username,
              })
              .from(listenerRequests)
              .leftJoin(users, eq(listenerRequests.userId, users.id))
              .orderBy(desc(listenerRequests.id))
              .limit(params.limit + 1);

      const results = await query;

      let nextCursor: number | null = null;
      if (results.length > params.limit) {
        nextCursor = results[params.limit - 1].id;
        results.pop();
      }

      return { items: results, nextCursor };
    }),

  updateStatus: adminQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["pending", "matched", "in_progress", "resolved"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(listenerRequests)
        .set({ status: input.status })
        .where(eq(listenerRequests.id, input.id));
      return { success: true };
    }),
});
