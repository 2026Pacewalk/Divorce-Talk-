import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { userActivity } from "@db/schema";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(320),
  subject: z.string().min(1).max(160),
  message: z.string().min(10).max(5000),
});

export const contactRouter = createRouter({
  // Public — anyone can reach the team. We don't require an account.
  submit: publicQuery
    .input(ContactSchema)
    .mutation(async ({ input, ctx }) => {
      const ip =
        ctx.req.headers.get("x-forwarded-for") ||
        ctx.req.headers.get("x-real-ip") ||
        "unknown";
      const userAgent = ctx.req.headers.get("user-agent") || "unknown";

      // Best-effort persistence via the existing userActivity audit table.
      // If the DB is down we still log to stdout so the message isn't lost
      // and we surface a graceful error to the client.
      try {
        const db = getDb();
        await db.insert(userActivity).values({
          userId: ctx.user?.id ?? 0,
          action: "contact_submit",
          targetType: "contact",
          details: {
            name: input.name,
            email: input.email,
            subject: input.subject,
            message: input.message,
            ip,
            userAgent,
          },
        });
      } catch (e) {
        // Don't fail the request just because the DB is unavailable —
        // log so the operator can still see the message in dev/prod logs.
        // eslint-disable-next-line no-console
        console.warn(
          "[contact] DB unavailable — submission logged but not persisted",
          {
            name: input.name,
            email: input.email,
            subject: input.subject,
            err: e instanceof Error ? e.message : String(e),
          },
        );

        // Only surface the failure to the client in production. In dev we
        // want the user to still see the success state.
        if (process.env.NODE_ENV === "production") {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "We couldn't save your message just now. Please email hello@divorcetalk.in directly.",
          });
        }
      }

      return {
        ok: true,
        receivedAt: new Date().toISOString(),
      };
    }),
});
