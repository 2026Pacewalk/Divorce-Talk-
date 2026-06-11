import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { comments, posts, users } from "@db/schema";
import { eq, and, desc, sql, lt } from "drizzle-orm";

export const commentRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        postId: z.number(),
        cursor: z.number().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();

      const conditions = [
        eq(comments.postId, input.postId),
        eq(comments.status, "active"),
      ];

      if (input.cursor) {
        conditions.push(lt(comments.id, input.cursor));
      }

      const results = await db
        .select({
          id: comments.id,
          content: comments.content,
          isAnonymous: comments.isAnonymous,
          createdAt: comments.createdAt,
          authorUsername: users.username,
          authorAvatar: users.avatar,
        })
        .from(comments)
        .leftJoin(users, eq(comments.userId, users.id))
        .where(and(...conditions))
        .orderBy(desc(comments.id))
        .limit(input.limit + 1);

      let nextCursor: number | null = null;
      if (results.length > input.limit) {
        nextCursor = results[input.limit - 1].id;
        results.pop();
      }

      return {
        items: results.map((r) => ({
          id: r.id,
          content: r.content,
          isAnonymous: r.isAnonymous,
          createdAt: r.createdAt,
          author: {
            username: r.authorUsername || "Anonymous",
            avatar: r.authorAvatar,
          },
        })),
        nextCursor,
      };
    }),

  create: authedQuery
    .input(
      z.object({
        postId: z.number(),
        content: z.string().min(1).max(2000),
        isAnonymous: z.boolean().default(true),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();

      return db.transaction(async (tx) => {
        const post = await tx
          .select({ id: posts.id })
          .from(posts)
          .where(and(eq(posts.id, input.postId), eq(posts.status, "active")))
          .limit(1);

        if (post.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Post not found",
          });
        }

        const result = await tx.insert(comments).values({
          postId: input.postId,
          userId: ctx.user.id,
          content: input.content,
          isAnonymous: input.isAnonymous,
        });

        await tx
          .update(posts)
          .set({ commentCount: sql`${posts.commentCount} + 1` })
          .where(eq(posts.id, input.postId));

        return { id: Number(result[0].insertId) };
      });
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();

      return db.transaction(async (tx) => {
        const comment = await tx
          .select()
          .from(comments)
          .where(eq(comments.id, input.id))
          .limit(1);

        if (comment.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Comment not found",
          });
        }

        if (comment[0].userId !== ctx.user.id && ctx.user.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Cannot delete this comment",
          });
        }

        if (comment[0].status === "removed") {
          return { success: true };
        }

        await tx
          .update(comments)
          .set({ status: "removed" })
          .where(eq(comments.id, input.id));

        await tx
          .update(posts)
          .set({ commentCount: sql`${posts.commentCount} - 1` })
          .where(eq(posts.id, comment[0].postId));

        return { success: true };
      });
    }),
});
