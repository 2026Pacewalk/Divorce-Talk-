import { z } from "zod";
import { createRouter, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users, posts, comments, categories, reactions, reports } from "@db/schema";
import { eq, and, desc, sql, count, gte, lt } from "drizzle-orm";

export const adminRouter = createRouter({
  stats: adminQuery.query(async () => {
    const db = getDb();

    const totalUsersResult = await db
      .select({ count: count() })
      .from(users);
    const totalPostsResult = await db
      .select({ count: count() })
      .from(posts);
    const pendingReportsResult = await db
      .select({ count: count() })
      .from(reports)
      .where(eq(reports.status, "pending"));

    // Active users in last 24h
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const activeUsersResult = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.lastSignInAt, oneDayAgo));

    // Posts today
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const postsTodayResult = await db
      .select({ count: count() })
      .from(posts)
      .where(gte(posts.createdAt, todayStart));

    return {
      totalUsers: totalUsersResult[0].count,
      activeUsers: activeUsersResult[0].count,
      totalPosts: totalPostsResult[0].count,
      postsToday: postsTodayResult[0].count,
      pendingReports: pendingReportsResult[0].count,
    };
  }),

  userList: adminQuery
    .input(
      z
        .object({
          cursor: z.number().optional(),
          limit: z.number().default(20),
          search: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const db = getDb();
      const params = input || { limit: 20 };

      const conditions = [];
      if (params.cursor) {
        conditions.push(lt(users.id, params.cursor));
      }

      const results =
        conditions.length > 0
          ? await db
              .select()
              .from(users)
              .where(and(...conditions))
              .orderBy(desc(users.id))
              .limit(params.limit + 1)
          : await db
              .select()
              .from(users)
              .orderBy(desc(users.id))
              .limit(params.limit + 1);

      let nextCursor: number | null = null;
      if (results.length > params.limit) {
        nextCursor = results[params.limit - 1].id;
        results.pop();
      }

      return { items: results, nextCursor };
    }),

  userUpdate: adminQuery
    .input(
      z.object({
        userId: z.number(),
        role: z.enum(["user", "moderator", "admin"]).optional(),
        status: z.enum(["active", "muted", "banned"]).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      const updates: Record<string, unknown> = {};

      if (input.role) updates.role = input.role;
      if (input.status) updates.status = input.status;

      await db.update(users).set(updates).where(eq(users.id, input.userId));

      return { success: true };
    }),

  postList: adminQuery
    .input(
      z
        .object({
          status: z.enum(["active", "hidden", "removed"]).optional(),
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
        conditions.push(eq(posts.status, params.status));
      }
      if (params.cursor) {
        conditions.push(lt(posts.id, params.cursor));
      }

      const query =
        conditions.length > 0
          ? db
              .select({
                id: posts.id,
                title: posts.title,
                content: sql<string>`LEFT(${posts.content}, 200)`,
                category: posts.category,
                status: posts.status,
                supportCount: posts.supportCount,
                commentCount: posts.commentCount,
                createdAt: posts.createdAt,
                authorUsername: users.username,
              })
              .from(posts)
              .leftJoin(users, eq(posts.userId, users.id))
              .where(and(...conditions))
              .orderBy(desc(posts.id))
              .limit(params.limit + 1)
          : db
              .select({
                id: posts.id,
                title: posts.title,
                content: sql<string>`LEFT(${posts.content}, 200)`,
                category: posts.category,
                status: posts.status,
                supportCount: posts.supportCount,
                commentCount: posts.commentCount,
                createdAt: posts.createdAt,
                authorUsername: users.username,
              })
              .from(posts)
              .leftJoin(users, eq(posts.userId, users.id))
              .orderBy(desc(posts.id))
              .limit(params.limit + 1);

      const results = await query;

      let nextCursor: number | null = null;
      if (results.length > params.limit) {
        nextCursor = results[params.limit - 1].id;
        results.pop();
      }

      return { items: results, nextCursor };
    }),

  postModerate: adminQuery
    .input(
      z.object({
        postId: z.number(),
        action: z.enum(["hide", "remove", "restore"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const statusMap = {
        hide: "hidden",
        remove: "removed",
        restore: "active",
      } as const;

      await db
        .update(posts)
        .set({ status: statusMap[input.action] })
        .where(eq(posts.id, input.postId));

      return { success: true };
    }),

  growthChart: adminQuery.query(async () => {
    const db = getDb();

    // Get user signups for last 7 days
    const results = await db
      .select({
        date: sql<string>`DATE(${users.createdAt})`,
        count: count(),
      })
      .from(users)
      .where(
        gte(
          users.createdAt,
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      )
      .groupBy(sql`DATE(${users.createdAt})`);

    return results;
  }),
});
