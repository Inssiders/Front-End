export const GRANT_TYPE = {
  PASSWORD: "PASSWORD",
  EMAIL: "EMAIL",
  REFRESH_TOKEN: "REFRESH_TOKEN",
} as const;

export type grant_type = (typeof GRANT_TYPE)[keyof typeof GRANT_TYPE];

// 각 인증 방식별 요청 타입 정의
export interface PasswordGrantRequest {
  grant_type: typeof GRANT_TYPE.PASSWORD;
  email: string;
  password: string;
}

export interface EmailGrantRequest {
  grant_type: typeof GRANT_TYPE.EMAIL;
  uuid: string;
}

export interface RefreshTokenGrantRequest {
  grant_type: typeof GRANT_TYPE.REFRESH_TOKEN;
  refreshToken: string;
  clientId: string;
}

export type TokenRequest = PasswordGrantRequest | EmailGrantRequest | RefreshTokenGrantRequest;

export interface AuthResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token?: string;
    token_type: string;
    expires_in: number;
  };
}

export interface RegisterResponse {
  message: string;
  data: {
    email: string;
  };
  _links?: {
    self: {
      href: string;
    };
  };
}

export interface DeleteAccountResponse {
  message: string;
  data: {
    deleted_at: string;
  };
}

export type RegisterType = "password";

export interface RegisterError {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
  errors?: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}

export interface ProfileResponse {
  message: string;
  data: {
    nickname: string;
    profile_url: string;
    bio?: string;
    follower_count?: number;
    post_count?: number;
    account_visible?: boolean;
    follower_visible?: boolean;
  };
}

export interface ProfilePostsResponse {
  message: string;
  data: {
    memes: Array<{
      id: number;
      title: string;
      content: string;
      image_url?: string;
      created_at: string;
      updated_at: string;
      user_id: number;
      category_id: number;
      like_count: number;
      comment_count: number;
      is_liked: boolean;
      user: {
        id: number;
        nickname: string;
        profileUrl: string;
      };
    }>;
    pageInfo: {
      page?: number;
      limit: number;
      totalElements?: number;
      totalPages?: number;
      next?: boolean;
      nextCursor?: string;
    };
  };
  _links: {
    self: { href: string };
    prev?: { href: string };
    next?: { href: string };
  };
}
