import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { rooms, roomMessages, users } from "@db/schema";
import { eq, and, desc, lt } from "drizzle-orm";

export const roomRouter = createRouter({
  list: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(rooms).orderBy(rooms.name);
  }),

  getBySlug: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const result = await db
        .select()
        .from(rooms)
        .where(eq(rooms.slug, input.slug))
        .limit(1);
      return result[0] || null;
    }),

  messages: publicQuery
    .input(
      z.object({
        roomId: z.number(),
        cursor: z.number().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const db = getDb();
      const conditions = [eq(roomMessages.roomId, input.roomId)];
      if (input.cursor) {
        conditions.push(lt(roomMessages.id, input.cursor));
      }
      const results = await db
        .select({
          id: roomMessages.id,
          content: roomMessages.content,
          isAnonymous: roomMessages.isAnonymous,
          createdAt: roomMessages.createdAt,
          authorUsername: users.username,
        })
        .from(roomMessages)
        .leftJoin(users, eq(roomMessages.userId, users.id))
        .where(and(...conditions))
        .orderBy(desc(roomMessages.id))
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
          author: { username: r.authorUsername || "Anonymous" },
        })),
        nextCursor,
      };
    }),

  sendMessage: authedQuery
    .input(
      z.object({
        roomId: z.number(),
        content: z.string().min(1).max(2000),
        isAnonymous: z.boolean().default(true),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(roomMessages).values({
        roomId: input.roomId,
        userId: ctx.user.id,
        content: input.content,
        isAnonymous: input.isAnonymous,
      });
      return { id: Number(result[0].insertId) };
    }),
});
