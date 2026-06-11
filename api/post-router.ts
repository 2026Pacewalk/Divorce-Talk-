import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { posts, reactions, users, categories } from "@db/schema";
import {
  eq,
  desc,
  and,
  sql,
  lt,
  gt,
  like,
  or,
  isNotNull,
} from "drizzle-orm";

export const postRouter = createRouter({
  list: publicQuery
    .input(
      z
        .object({
          cursor: z.number().optional(),
          limit: z.number().min(1).max(50).default(10),
          category: z.string().optional(),
          mood: z.string().optional(),
          sortBy: z.enum(["newest", "popular"]).default("newest"),
          search: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const db = getDb();
      const params = input || {
        limit: 10,
        sortBy: "newest" as const,
      };
      const limit = params.limit;

      const conditions = [eq(posts.status, "active")];

      if (params.category) {
        conditions.push(eq(posts.category, params.category));
      }
      if (params.mood) {
        conditions.push(eq(posts.mood, params.mood));
      }
      if (params.search) {
        conditions.push(
          or(
            like(posts.content, `%${params.search}%`),
            like(posts.title, `%${params.search}%`)
          )!
        );
      }
      if (params.cursor) {
        if (params.sortBy === "newest") {
          conditions.push(lt(posts.id, params.cursor));
        } else {
          conditions.push(lt(posts.supportCount, params.cursor));
        }
      }

      const orderBy =
        params.sortBy === "popular"
          ? [desc(posts.supportCount), desc(posts.id)]
          : [desc(posts.id)];

      const results = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          category: posts.category,
          mood: posts.mood,
          isAnonymous: posts.isAnonymous,
          supportCount: posts.supportCount,
          relateCount: posts.relateCount,
          stayStrongCount: posts.stayStrongCount,
          commentCount: posts.commentCount,
          createdAt: posts.createdAt,
          authorId: posts.userId,
          authorUsername: users.username,
          authorAvatar: users.avatar,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(and(...conditions))
        .orderBy(...orderBy)
        .limit(limit + 1);

      let nextCursor: number | null = null;
      if (results.length > limit) {
        const lastItem = results[limit - 1];
        nextCursor =
          params.sortBy === "popular"
            ? lastItem.supportCount
            : lastItem.id;
        results.pop();
      }

      // Get current user's reactions if authenticated
      const userReactions: Record<number, string> = {};
      if (ctx.user) {
        const postIds = results.map((r) => r.id);
        if (postIds.length > 0) {
          const userReacts = await db
            .select()
            .from(reactions)
            .where(
              and(
                eq(reactions.userId, ctx.user.id),
                sql`${reactions.postId} IN (${sql.join(postIds.map((id) => sql`${id}`))})`
              )
            );
          for (const r of userReacts) {
            userReactions[r.postId] = r.type;
          }
        }
      }

      const items = results.map((r) => ({
        id: r.id,
        title: r.title,
        content: r.content,
        category: r.category,
        mood: r.mood,
        isAnonymous: r.isAnonymous,
        reactions: {
          support: r.supportCount,
          relate: r.relateCount,
          stayStrong: r.stayStrongCount,
        },
        commentCount: r.commentCount,
        createdAt: r.createdAt,
        author: {
          username: r.authorUsername || "Anonymous",
          avatar: r.authorAvatar,
        },
        userReaction: userReactions[r.id] || null,
      }));

      return { items, nextCursor };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = getDb();

      const result = await db
        .select({
          id: posts.id,
          title: posts.title,
          content: posts.content,
          category: posts.category,
          mood: posts.mood,
          isAnonymous: posts.isAnonymous,
          supportCount: posts.supportCount,
          relateCount: posts.relateCount,
          stayStrongCount: posts.stayStrongCount,
          commentCount: posts.commentCount,
          createdAt: posts.createdAt,
          authorUsername: users.username,
          authorAvatar: users.avatar,
          authorBio: users.bio,
        })
        .from(posts)
        .leftJoin(users, eq(posts.userId, users.id))
        .where(and(eq(posts.id, input.id), eq(posts.status, "active")))
        .limit(1);

      if (result.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      const r = result[0];
      return {
        id: r.id,
        title: r.title,
        content: r.content,
        category: r.category,
        mood: r.mood,
        isAnonymous: r.isAnonymous,
        reactions: {
          support: r.supportCount,
          relate: r.relateCount,
          stayStrong: r.stayStrongCount,
        },
        commentCount: r.commentCount,
        createdAt: r.createdAt,
        author: {
          username: r.authorUsername || "Anonymous",
          avatar: r.authorAvatar,
          bio: r.authorBio,
        },
      };
    }),

  create: authedQuery
    .input(
      z.object({
        title: z.string().max(200).optional(),
        content: z.string().min(1).max(5000),
        category: z.string(),
        mood: z.string().optional(),
        isAnonymous: z.boolean().default(true),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();

      return db.transaction(async (tx) => {
        const cat = await tx
          .select({ slug: categories.slug })
          .from(categories)
          .where(eq(categories.slug, input.category))
          .limit(1);
        if (cat.length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Unknown category",
          });
        }

        const result = await tx.insert(posts).values({
          userId: ctx.user.id,
          title: input.title || null,
          content: input.content,
          category: input.category,
          mood: input.mood || null,
          isAnonymous: input.isAnonymous,
        });

        await tx
          .update(categories)
          .set({ postCount: sql`${categories.postCount} + 1` })
          .where(eq(categories.slug, input.category));

        return { id: Number(result[0].insertId) };
      });
    }),

  react: authedQuery
    .input(
      z.object({
        postId: z.number(),
        type: z.enum(["support", "relate", "stayStrong"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();

      return db.transaction(async (tx) => {
        const postExists = await tx
          .select({ id: posts.id })
          .from(posts)
          .where(eq(posts.id, input.postId))
          .limit(1);
        if (postExists.length === 0) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
        }

        const existing = await tx
          .select()
          .from(reactions)
          .where(
            and(
              eq(reactions.postId, input.postId),
              eq(reactions.userId, ctx.user.id),
              eq(reactions.type, input.type)
            )
          )
          .limit(1)
          .for("update");

        let added: boolean;
        if (existing.length > 0) {
          await tx.delete(reactions).where(eq(reactions.id, existing[0].id));
          added = false;
        } else {
          await tx.insert(reactions).values({
            postId: input.postId,
            userId: ctx.user.id,
            type: input.type,
          });
          added = true;
        }

        const counts = await tx
          .select({
            support: sql<number>`SUM(CASE WHEN ${reactions.type} = 'support' THEN 1 ELSE 0 END)`,
            relate: sql<number>`SUM(CASE WHEN ${reactions.type} = 'relate' THEN 1 ELSE 0 END)`,
            stayStrong: sql<number>`SUM(CASE WHEN ${reactions.type} = 'stayStrong' THEN 1 ELSE 0 END)`,
          })
          .from(reactions)
          .where(eq(reactions.postId, input.postId));

        const c = counts[0];
        await tx
          .update(posts)
          .set({
            supportCount: c.support || 0,
            relateCount: c.relate || 0,
            stayStrongCount: c.stayStrong || 0,
          })
          .where(eq(posts.id, input.postId));

        return {
          added,
          counts: {
            support: c.support || 0,
            relate: c.relate || 0,
            stayStrong: c.stayStrong || 0,
          },
        };
      });
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();

      const post = await db
        .select()
        .from(posts)
        .where(eq(posts.id, input.id))
        .limit(1);

      if (post.length === 0) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Post not found" });
      }

      // Only allow deleting own posts or admin
      if (post[0].userId !== ctx.user.id && ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot delete this post",
        });
      }

      await db
        .update(posts)
        .set({ status: "removed" })
        .where(eq(posts.id, input.id));

      return { success: true };
    }),
});
