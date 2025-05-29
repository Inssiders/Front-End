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
