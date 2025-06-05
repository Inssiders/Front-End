export interface ProfileResponse {
  message: string;
  data: {
    nickname: string;
    profileUrl: string;
    bio?: string;
    follower_count?: number;
    post_count?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
  };
}

interface User {
  id: number;
  nickname: string;
  profileUrl: string;
}

interface Meme {
  id: number;
  title: string;
  content: string;
  media_url?: string;
  media_upload_time?: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  category_id: number;
  like_count?: number;
  comment_count?: number;
  is_liked?: boolean;
  user?: User;
}

interface PageInfo {
  next: boolean;
  nextCursor?: string;
}

interface ProfilePostsData {
  memes: Meme[];
  pageInfo: PageInfo;
}

export interface ProfilePostsResponse {
  code: number;
  data: ProfilePostsData;
  message: string;
}

// Profile UI용 Post 인터페이스
export interface Post {
  id: number | string;
  title: string;
  category: string;
  image?: string;
  post_media_url?: string;
  media_url?: string;
  type?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  likedAt?: string;
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

// Meme에서 Post로 변환하는 유틸리티 타입
export type MemeToPost = (meme: Meme, prefix?: string) => Post;
