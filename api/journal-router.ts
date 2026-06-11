import { z } from "zod";
import { createRouter, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { journalEntries } from "@db/schema";
import { eq, and, desc, lt } from "drizzle-orm";

export const journalRouter = createRouter({
  list: authedQuery
    .input(
      z
        .object({
          cursor: z.number().optional(),
          limit: z.number().min(1).max(50).default(20),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const params = input || { limit: 20 };
      const conditions = [eq(journalEntries.userId, ctx.user.id)];
      if (params.cursor) {
        conditions.push(lt(journalEntries.id, params.cursor));
      }
      const results = await db
        .select()
        .from(journalEntries)
        .where(and(...conditions))
        .orderBy(desc(journalEntries.id))
        .limit(params.limit + 1);

      let nextCursor: number | null = null;
      if (results.length > params.limit) {
        nextCursor = results[params.limit - 1].id;
        results.pop();
      }

      return { items: results, nextCursor };
    }),

  create: authedQuery
    .input(
      z.object({
        title: z.string().max(200).optional(),
        content: z.string().min(1).max(5000),
        mood: z.string().optional(),
        prompt: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      const result = await db.insert(journalEntries).values({
        userId: ctx.user.id,
        title: input.title || null,
        content: input.content,
        mood: input.mood || null,
        prompt: input.prompt || null,
      });
      return { id: Number(result[0].insertId) };
    }),

  delete: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = getDb();
      await db
        .delete(journalEntries)
        .where(
          and(
            eq(journalEntries.id, input.id),
            eq(journalEntries.userId, ctx.user.id)
          )
        );
      return { success: true };
    }),
});
