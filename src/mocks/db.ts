import { factory, primaryKey } from "@mswjs/data";

// ID 자동 생성을 위한 카운터
let userIdCounter = 1;

// 데이터베이스 스키마 정의
export const db = factory({
  account: {
    id: primaryKey(Number),
    email: String,
    password: String,
    password_salt: String,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
    deleted_at: String,
    is_deleted: Boolean,
  },
  profile: {
    account_id: primaryKey(Number),
    introduction: String,
    profile_url: String,
    nickname: String,
    account_visibility: Boolean,
    follower_visibility: Boolean,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
    deleted_at: String,
    is_deleted: Boolean,
  },
  follow: {
    id: primaryKey(Number),
    from_account_id: Number,
    to_account_id: Number,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
    deleted_at: String,
    is_deleted: Boolean,
  },
  post: {
    id: primaryKey(Number),
    title: String,
    content: String,
    media_url: String,
    media_upload_time: () => new Date().toISOString(),
    account_id: Number,
    category_id: Number,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
    deleted_at: String,
    is_deleted: Boolean,
  },
  comment: {
    id: primaryKey(Number),
    content: String,
    post_id: Number,
    account_id: Number,
    parent_comment_id: Number,
    created_at: () => new Date().toISOString(),
    updated_at: () => new Date().toISOString(),
    deleted_at: String,
    is_deleted: Boolean,
  },
  category: {
    id: primaryKey(Number),
    name: String,
    upper_category_id: Number,
  },
  tag: {
    id: primaryKey(Number),
    name: String,
    created_at: () => new Date().toISOString(),
  },
  post_tag: {
    id: primaryKey(Number),
    post_id: Number,
    tag_id: Number,
  },
  email_verification_code: {
    id: primaryKey(Number),
    email: String,
    code: String,
    created_at: () => new Date().toISOString(),
    expired_at: String,
  },
  authorization_code: {
    id: primaryKey(Number),
    code: String,
    created_at: () => new Date().toISOString(),
    expired_at: String,
  },
  user: {
    id: primaryKey(() => userIdCounter++),
    email: String,
    password: String,
    registerType: String,
    createdAt: () => new Date().toISOString(),
    updatedAt: () => new Date().toISOString(),
  },
});

export type Database = typeof db;
