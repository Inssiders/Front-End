import { factory, manyOf, primaryKey } from "@mswjs/data";

// 데이터베이스 스키마 정의
export const db = factory({
  post: {
    id: primaryKey(Number),
    title: String,
    content: String,
    imageUrl: String,
    category: String,
    likes: Number,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
    comments: manyOf("comment"),
  },
  comment: {
    id: primaryKey(Number),
    content: String,
    postId: Number,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
    replies: manyOf("reply"),
  },
  reply: {
    id: primaryKey(Number),
    content: String,
    commentId: Number,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
});

export type Database = typeof db;
