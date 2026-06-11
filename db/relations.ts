import { relations } from "drizzle-orm";
import {
  users,
  posts,
  comments,
  reactions,
  reports,
  rooms,
  roomMessages,
  journalEntries,
  listenerRequests,
} from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
  reactions: many(reactions),
  reports: many(reports),
  roomMessages: many(roomMessages),
  journalEntries: many(journalEntries),
  listenerRequests: many(listenerRequests),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.userId], references: [users.id] }),
  comments: many(comments),
  reactions: many(reactions),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  author: one(users, { fields: [comments.userId], references: [users.id] }),
}));

export const reactionsRelations = relations(reactions, ({ one }) => ({
  post: one(posts, { fields: [reactions.postId], references: [posts.id] }),
  user: one(users, { fields: [reactions.userId], references: [users.id] }),
}));

export const reportsRelations = relations(reports, ({ one }) => ({
  reporter: one(users, { fields: [reports.reporterId], references: [users.id] }),
}));

export const roomsRelations = relations(rooms, ({ many }) => ({
  messages: many(roomMessages),
}));

export const roomMessagesRelations = relations(roomMessages, ({ one }) => ({
  room: one(rooms, { fields: [roomMessages.roomId], references: [rooms.id] }),
  author: one(users, { fields: [roomMessages.userId], references: [users.id] }),
}));

export const journalEntriesRelations = relations(journalEntries, ({ one }) => ({
  user: one(users, { fields: [journalEntries.userId], references: [users.id] }),
}));

export const listenerRequestsRelations = relations(listenerRequests, ({ one }) => ({
  user: one(users, { fields: [listenerRequests.userId], references: [users.id] }),
}));
