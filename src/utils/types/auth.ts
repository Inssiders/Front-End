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
