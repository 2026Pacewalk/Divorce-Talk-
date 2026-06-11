import { localAuthRouter } from "./local-auth-router";
import { postRouter } from "./post-router";
import { commentRouter } from "./comment-router";
import { categoryRouter } from "./category-router";
import { reportRouter } from "./report-router";
import { adminRouter } from "./admin-router";
import { affirmationRouter } from "./affirmation-router";
import { roomRouter } from "./room-router";
import { journalRouter } from "./journal-router";
import { listenerRouter } from "./listener-router";
import { contactRouter } from "./contact-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  localAuth: localAuthRouter,
  post: postRouter,
  comment: commentRouter,
  category: categoryRouter,
  report: reportRouter,
  admin: adminRouter,
  affirmation: affirmationRouter,
  room: roomRouter,
  journal: journalRouter,
  listener: listenerRouter,
  contact: contactRouter,
});

export type AppRouter = typeof appRouter;
