export interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  postId: number;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  content: string;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

export interface CreatePostBody {
  title: string;
  content: string;
  imageUrl: string;
  category: string;
}

export interface CreateCommentBody {
  content: string;
}

export interface CreateReplyBody {
  content: string;
}

export type ErrorResponse = {
  message: string;
};
