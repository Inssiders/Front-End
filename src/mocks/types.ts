export interface Account {
  id: number;
  email: string;
  password: string;
  password_salt: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}

export interface Profile {
  account_id: number;
  introduction: string;
  profile_url: string;
  nickname: string;
  account_visibility: boolean;
  follower_visibility: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}

export interface Follow {
  from_account_id: number;
  to_account_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  media_url: string;
  media_upload_time: string;
  account_id: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}

export interface Comment {
  id: number;
  content: string;
  post_id: number;
  account_id: number;
  parent_comment_id: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  is_deleted: boolean;
}

export interface Category {
  id: number;
  name: string;
  upper_category_id: number | null;
}

export interface Tag {
  id: number;
  name: string;
  created_at: string;
}

export interface PostTag {
  post_id: number;
  tag_id: number;
}

export interface EmailVerificationCode {
  email: string;
  code: string;
  created_at: string;
  expired_at: string;
}

export interface AuthorizationCode {
  code: string;
  created_at: string;
  expired_at: string;
}

export interface CreateAccountBody {
  email: string;
  password: string;
}

export interface CreateProfileBody {
  introduction?: string;
  profile_url?: string;
  nickname: string;
  account_visibility?: boolean;
  follower_visibility?: boolean;
}

export interface CreatePostBody {
  title: string;
  content: string;
  media_url?: string;
  category_id: number;
}

export interface CreateCommentBody {
  content: string;
  parent_comment_id?: number;
}

export interface EmailChallengeRequest {
  email: string;
}

export interface EmailChallengeResponse {
  message: string;
  data: {
    email: string;
    expires_in: number;
  };
}

export interface EmailVerifyRequest {
  email: string;
  otp: string;
}

export interface EmailVerifyResponse {
  message: string;
  data: {
    authorization_code: string;
    expires_in: number;
  };
}

export interface AccountCreateRequest {
  register_type: string;
  email: string;
  password: string;
}

export interface AccountCreateResponse {
  message: string;
  data: {
    email: string;
  };
}
