import { ApiMeme, CursorPageInfo, Post } from "./posts";

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

export interface ProfileUpdateRequest {
  nickname?: string;
  introduction?: string;
  profile_url?: string;
  account_visibility?: boolean;
  follower_visibility?: boolean;
}

// posts.ts의 ProfilePostsResponse를 재사용
export interface ProfilePostsResponse {
  message: string;
  data: {
    memes: ApiMeme[];
    pageInfo: CursorPageInfo;
  };
}

// Profile 데이터 인터페이스
export interface ProfileData {
  user_id: string;
  user_detail_username?: string;
  user_detail_profile_url?: string;
  user_detail_introduction?: string;
  user_created_at?: string;
  posts?: number;
  followers?: number;
  following?: number;
}

// API Meme을 UI Post로 변환하는 유틸리티 타입
export type MemeToPost = (meme: ApiMeme, id?: number | string) => Post;
