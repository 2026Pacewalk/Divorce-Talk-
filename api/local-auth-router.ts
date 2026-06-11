import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "divorcetalk-local-auth-secret-key-2025"
);

async function createToken(userId: number): Promise<string> {
  return new SignJWT({ sub: String(userId), type: "local" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyLocalToken(
  token: string
): Promise<{ userId: number } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      clockTolerance: 60,
    });
    if (payload.sub && payload.type === "local") {
      return { userId: Number(payload.sub) };
    }
    return null;
  } catch {
    return null;
  }
}

export const localAuthRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        username: z
          .string()
          .min(3)
          .max(50)
          .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores"),
        email: z.string().email().optional(),
        password: z.string().min(8).max(100),
        bio: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if username exists
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.username, input.username))
        .limit(1);

      if (existing.length > 0) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Username already taken",
        });
      }

      // Check email if provided
      if (input.email) {
        const existingEmail = await db
          .select()
          .from(users)
          .where(eq(users.email, input.email))
          .limit(1);
        if (existingEmail.length > 0) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email already registered",
          });
        }
      }

      const passwordHash = await bcrypt.hash(input.password, 12);

      const result = await db.insert(users).values({
        username: input.username,
        email: input.email || null,
        passwordHash,
        bio: input.bio || null,
        isAnonymous: true,
        status: "active",
        role: "user",
      });

      const userId = Number(result[0].insertId);
      const token = await createToken(userId);

      return {
        token,
        user: {
          id: userId,
          username: input.username,
          email: input.email || null,
          bio: input.bio || null,
          role: "user" as const,
        },
      };
    }),

  login: publicQuery
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      const found = await db
        .select()
        .from(users)
        .where(eq(users.username, input.username))
        .limit(1);

      const user = found[0];
      if (!user || !user.passwordHash) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      if (user.status === "banned") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Account has been suspended",
        });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid username or password",
        });
      }

      // Update last sign in
      await db
        .update(users)
        .set({ lastSignInAt: new Date() })
        .where(eq(users.id, user.id));

      const token = await createToken(user.id);

      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          role: user.role,
        },
      };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    const authHeader =
      ctx.req.headers.get("x-local-auth-token") ||
      ctx.req.headers.get("X-Local-Auth-Token");

    if (!authHeader) return null;

    const payload = await verifyLocalToken(authHeader);
    if (!payload) return null;

    const db = getDb();
    const found = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (found.length === 0) return null;

    const user = found[0];
    return {
      id: user.id,
      username: user.username,
      name: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      isAnonymous: user.isAnonymous,
      createdAt: user.createdAt,
    };
  }),
});
