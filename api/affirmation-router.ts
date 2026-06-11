import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { affirmations } from "@db/schema";
import { eq, sql } from "drizzle-orm";

export const affirmationRouter = createRouter({
  daily: publicQuery.query(async () => {
    const db = getDb();
    const results = await db
      .select()
      .from(affirmations)
      .where(eq(affirmations.active, true))
      .orderBy(sql`RAND()`)
      .limit(1);

    return results[0] || null;
  }),

  list: publicQuery.query(async () => {
    const db = getDb();
    return db
      .select()
      .from(affirmations)
      .orderBy(affirmations.createdAt);
  }),
});
