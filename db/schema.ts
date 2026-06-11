import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  boolean,
  json,
  int,
  index,
  uniqueIndex,
} from "drizzle-orm/mysql-core";

// ============================================
// Users Table - Anonymous accounts
// ============================================
export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    unionId: varchar("unionId", { length: 255 }).unique(),
    username: varchar("username", { length: 50 }).notNull().unique(),
    email: varchar("email", { length: 320 }).unique(),
    passwordHash: varchar("passwordHash", { length: 255 }),
    avatar: varchar("avatar", { length: 20 }),
    bio: varchar("bio", { length: 200 }),
    role: mysqlEnum("role", ["user", "moderator", "admin"])
      .default("user")
      .notNull(),
    isAnonymous: boolean("isAnonymous").default(true).notNull(),
    emailVerified: boolean("emailVerified").default(false).notNull(),
    status: mysqlEnum("status", ["active", "muted", "banned"])
      .default("active")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("username_idx").on(table.username),
    index("role_idx").on(table.role),
    index("status_idx").on(table.status),
    index("created_at_idx").on(table.createdAt),
  ]
);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ============================================
// Categories Table - Community topics
// ============================================
export const categories = mysqlTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 50 }).notNull(),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 255 }),
    icon: varchar("icon", { length: 50 }),
    color: varchar("color", { length: 20 }),
    postCount: bigint("postCount", { mode: "number", unsigned: true }).default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [index("slug_idx").on(table.slug)]
);

export type Category = typeof categories.$inferSelect;

// ============================================
// Posts Table - Community feed posts
// ============================================
export const posts = mysqlTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    title: varchar("title", { length: 200 }),
    content: text("content").notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    mood: varchar("mood", { length: 30 }),
    isAnonymous: boolean("isAnonymous").default(true).notNull(),
    status: mysqlEnum("status", ["active", "hidden", "removed"])
      .default("active")
      .notNull(),
    supportCount: bigint("supportCount", {
      mode: "number",
      unsigned: true,
    }).default(0),
    relateCount: bigint("relateCount", {
      mode: "number",
      unsigned: true,
    }).default(0),
    stayStrongCount: bigint("stayStrongCount", {
      mode: "number",
      unsigned: true,
    }).default(0),
    commentCount: bigint("commentCount", {
      mode: "number",
      unsigned: true,
    }).default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("post_user_idx").on(table.userId),
    index("post_category_idx").on(table.category),
    index("post_mood_idx").on(table.mood),
    index("post_status_idx").on(table.status),
    index("post_created_idx").on(table.createdAt),
    index("post_support_idx").on(table.supportCount),
  ]
);

export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// ============================================
// Comments Table - Post comments
// ============================================
export const comments = mysqlTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    postId: bigint("postId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => posts.id),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    isAnonymous: boolean("isAnonymous").default(true).notNull(),
    status: mysqlEnum("status", ["active", "hidden", "removed"])
      .default("active")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("comment_post_idx").on(table.postId),
    index("comment_user_idx").on(table.userId),
    index("comment_status_idx").on(table.status),
    index("comment_created_idx").on(table.createdAt),
  ]
);

export type Comment = typeof comments.$inferSelect;

// ============================================
// Reactions Table - Post reactions
// ============================================
export const reactions = mysqlTable(
  "reactions",
  {
    id: serial("id").primaryKey(),
    postId: bigint("postId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => posts.id),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    type: mysqlEnum("type", ["support", "relate", "stayStrong"]).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("reaction_unique_idx").on(table.postId, table.userId, table.type),
    index("reaction_post_idx").on(table.postId),
    index("reaction_user_idx").on(table.userId),
  ]
);

export type Reaction = typeof reactions.$inferSelect;

// ============================================
// Reports Table - Content reporting
// ============================================
export const reports = mysqlTable(
  "reports",
  {
    id: serial("id").primaryKey(),
    postId: bigint("postId", { mode: "number", unsigned: true }).references(
      () => posts.id
    ),
    commentId: bigint("commentId", {
      mode: "number",
      unsigned: true,
    }).references(() => comments.id),
    reporterId: bigint("reporterId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    reason: mysqlEnum("reason", ["harassment", "spam", "harmful", "other"])
      .notNull(),
    details: text("details"),
    status: mysqlEnum("status", ["pending", "reviewed", "resolved", "dismissed"])
      .default("pending")
      .notNull(),
    reviewedBy: bigint("reviewedBy", { mode: "number", unsigned: true }).references(
      () => users.id
    ),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    resolvedAt: timestamp("resolvedAt"),
  },
  (table) => [
    index("report_status_idx").on(table.status),
    index("report_post_idx").on(table.postId),
    index("report_created_idx").on(table.createdAt),
  ]
);

// ============================================
// Affirmations Table - Daily affirmations
// ============================================
export const affirmations = mysqlTable("affirmations", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  category: varchar("category", { length: 50 }),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Affirmation = typeof affirmations.$inferSelect;

// ============================================
// Rooms Table - Listening rooms
// ============================================
export const rooms = mysqlTable(
  "rooms",
  {
    id: serial("id").primaryKey(),
    slug: varchar("slug", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 255 }),
    icon: varchar("icon", { length: 50 }),
    color: varchar("color", { length: 20 }),
    memberCount: bigint("memberCount", { mode: "number", unsigned: true }).default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [index("room_slug_idx").on(table.slug)]
);

export type Room = typeof rooms.$inferSelect;

// ============================================
// Room Messages Table - Messages in listening rooms
// ============================================
export const roomMessages = mysqlTable(
  "roomMessages",
  {
    id: serial("id").primaryKey(),
    roomId: bigint("roomId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => rooms.id),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    content: text("content").notNull(),
    isAnonymous: boolean("isAnonymous").default(true).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("rm_room_idx").on(table.roomId),
    index("rm_user_idx").on(table.userId),
    index("rm_created_idx").on(table.createdAt),
  ]
);

// ============================================
// Journal Entries Table - Private journal
// ============================================
export const journalEntries = mysqlTable(
  "journalEntries",
  {
    id: serial("id").primaryKey(),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    title: varchar("title", { length: 200 }),
    content: text("content").notNull(),
    mood: varchar("mood", { length: 30 }),
    prompt: varchar("prompt", { length: 200 }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("je_user_idx").on(table.userId),
    index("je_created_idx").on(table.createdAt),
  ]
);

// ============================================
// Listener Requests Table - Need someone to hear me
// ============================================
export const listenerRequests = mysqlTable(
  "listenerRequests",
  {
    id: serial("id").primaryKey(),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    urgency: mysqlEnum("urgency", ["low", "medium", "high", "crisis"])
      .default("medium")
      .notNull(),
    feeling: text("feeling").notNull(),
    communication: varchar("communication", { length: 50 }),
    status: mysqlEnum("status", ["pending", "matched", "in_progress", "resolved"])
      .default("pending")
      .notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("lr_user_idx").on(table.userId),
    index("lr_status_idx").on(table.status),
    index("lr_created_idx").on(table.createdAt),
  ]
);

// ============================================
// User Activity Table - Audit log
// ============================================
export const userActivity = mysqlTable(
  "userActivity",
  {
    id: serial("id").primaryKey(),
    userId: bigint("userId", { mode: "number", unsigned: true })
      .notNull()
      .references(() => users.id),
    action: varchar("action", { length: 50 }).notNull(),
    targetType: varchar("targetType", { length: 30 }),
    targetId: bigint("targetId", { mode: "number", unsigned: true }),
    details: json("details"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("activity_user_idx").on(table.userId),
    index("activity_action_idx").on(table.action),
    index("activity_created_idx").on(table.createdAt),
  ]
);
