// 카테고리 enum
export enum Category {
  KPOP = 1,
  ENTERTAINMENT = 2,
  DRAMA = 3,
  INFLUENCER = 4,
  NEWS = 5,
  MOVIE = 6,
  ANIMATION = 7,
  CHALLENGE = 8,
  NEW_SLANG = 9,
  TRENDING = 10,
  ETC = 99,
  USER_CONTENTS = 999,
}

// 카테고리 레이블 매핑
export const CATEGORY_LABELS: Record<Category, string> = {
  [Category.KPOP]: "K-POP",
  [Category.ENTERTAINMENT]: "연예인",
  [Category.DRAMA]: "드라마",
  [Category.INFLUENCER]: "인플루언서",
  [Category.NEWS]: "뉴스",
  [Category.MOVIE]: "영화",
  [Category.ANIMATION]: "애니메이션",
  [Category.CHALLENGE]: "챌린지",
  [Category.NEW_SLANG]: "신조어",
  [Category.TRENDING]: "트렌딩",
  [Category.ETC]: "기타",
  [Category.USER_CONTENTS]: "사용자 콘텐츠",
};

// API에서 받아오는 카테고리 데이터 타입
export interface CategoryData {
  id: number;
  name: string;
  label: string;
  count: number;
}

// 카테고리 API 응답 타입
export interface CategoriesResponse {
  message: string;
  data: {
    categories: CategoryData[];
  };
}

// 게시물 데이터 타입
export interface Post {
  id: number | string;
  title: string;
  description?: string;
  category: string;
  category_id?: number;
  youtubeUrl?: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares?: number;
  views?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  likedAt?: string;
}

// PostsGrid 메인 컴포넌트 Props
export interface PostsGridProps {
  // 제어 모드 - 외부에서 posts를 직접 제공
  posts?: Post[];
  loading?: boolean;

  // 비제어 모드 - 내부에서 데이터 fetch
  category?: string;
  userId?: string;
  profileFilter?: "posts" | "likes";

  // 공통 설정
  layout?: "grid" | "feed";
  columns?: 2 | 3 | 4 | 5;
  showAuthor?: boolean;
  showActions?: boolean;
  enableHoverPlay?: boolean;
  feedMode?: boolean;
  className?: string;
  onLike?: (postId: number | string) => void;
  onComment?: (postId: number | string) => void;
  onView?: (postId: number | string) => void;
}

// HoverVideo 컴포넌트 Props
export interface HoverVideoProps {
  youtubeUrl: string;
  enableHover?: boolean;
  isHovered?: boolean;
}

// PostCard 컴포넌트 Props
export interface PostCardProps {
  post: Post;
  enableHoverPlay: boolean;
  feedMode: boolean;
  showAuthor: boolean;
  showActions: boolean;
  onLike: (id: number | string) => void;
  onComment: (id: number | string) => void;
  onView: (id: number | string) => void;
}

// EmptyState 컴포넌트 Props
export interface EmptyStateProps {
  isLoading: boolean;
}

// InfiniteScrollTrigger 컴포넌트 Props
export interface InfiniteScrollTriggerProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  target: React.RefObject<HTMLDivElement | null>;
}

// PostsHeader 컴포넌트 Props
export interface PostsHeaderProps {
  categories?: CategoryData[];
}

// PostCategories 컴포넌트 Props
export interface PostCategoriesProps {
  categories?: CategoryData[];
}
