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
export const CATEGORY_LABELS: Record<CategoryType, string> = {
  KPOP: "케이팝",
  ENTERTAINMENT: "예능",
  DRAMA: "드라마",
  INFLUENCER: "인플루언서",
  NEWS: "뉴스",
  MOVIE: "영화",
  ANIMATION: "애니메이션",
  CHALLENGE: "챌린지",
  NEW_SLANG: "신조어",
  TRENDING: "트렌딩",
  ETC: "기타",
  USER_CONTENTS: "유저 컨텐츠",
};

export const CATEGORY_IDS: Record<CategoryType, number> = {
  KPOP: 1,
  ENTERTAINMENT: 2,
  DRAMA: 3,
  INFLUENCER: 4,
  NEWS: 5,
  MOVIE: 6,
  ANIMATION: 7,
  CHALLENGE: 8,
  NEW_SLANG: 9,
  TRENDING: 10,
  ETC: 99,
  USER_CONTENTS: 999,
};

// API에서 받아오는 카테고리 데이터 타입
export interface CategoryData {
  id: number;
  type: string;
  name: string;
}

// API 응답의 기본 형식
export interface ApiResponse<T> {
  message: string;
  data: T;
}

// 좋아요 대상 타입
export type TargetType = "POST" | "COMMENT";

// 좋아요 API 응답 데이터 타입
export interface LikeResponseData {
  target_type: TargetType;
  target_id: number;
  liked: boolean;
  total_like_count: number;
}

// 좋아요 API 응답 타입
export type LikeResponse = ApiResponse<LikeResponseData>;

// API에서 받아오는 원본 밈 데이터 타입
export interface ApiMeme {
  id: number;
  account_id: number;
  title: string;
  nickname: string;
  profile_url: string;
  like_count: number;
  comment_count: number;
  content?: string;
  media_url?: string;
  media_upload_time?: string;
  category_type?: string;
  tags?: string[];
  created_at?: string;
  is_liked?: boolean;
}

// 사용자 정보 타입
export interface Author {
  account_id?: number;
  account_name?: string;
  profile_image?: string;
}

// 프론트엔드에서 사용하는 Post 타입
export interface Post {
  id: number;
  account_id: number;
  title: string;
  nickname: string;
  profile_url: string;
  media_url: string;
  like_count: number;
  comment_count: number;
  category_id?: number;
  content?: string;
  author?: Author;
  is_liked?: boolean;
  likes?: number;
}

// 일반 조회용 페이지네이션 정보 (offset 기반)
export interface OffsetPageInfo {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
}

// 프로필 조회용 페이지네이션 정보 (cursor 기반)
export interface CursorPageInfo {
  limit: number;
  next: boolean;
  lastId?: number;
}

// API 링크 정보
export interface ApiLinks {
  self: { href: string };
  prev?: { href: string };
  next?: { href: string };
}

// 페이지네이션 응답 타입
export interface PostsResponse {
  content: Post[];
  has_next: boolean;
  next_cursor: number | null;
}

// 프로필 조회 API 응답
export interface ProfilePostsResponse {
  message: string;
  data: {
    content: ApiMeme[];
    has_next: boolean;
    next_cursor: string | null;
  };
}

// API 요청 파라미터 타입
export interface PostsQueryParams {
  last_id?: number;
  size?: number;
  page?: number;
  keyword?: string;
  category_id?: string;
  profile_filter?: "post" | "like";
}

// 프로필 조회 쿼리 파라미터
export interface ProfileQueryParams {
  profile_filter?: "post" | "like";
  last_id?: number;
  size?: number;
  category_id?: number;
}

// 통합 쿼리 파라미터 타입
export type AllQueryParams = PostsQueryParams | (PostsQueryParams & ProfileQueryParams);

// PostsGrid 메인 컴포넌트 Props
export interface PostsGridProps {
  // 제어 모드 - 외부에서 posts를 직접 제공
  posts?: Post[];
  loading?: boolean;
  hasNextPage?: boolean; // SSR에서 무한스크롤 여부 전달

  // 비제어 모드 - 내부에서 데이터 fetch
  category?: string;
  userId?: string;
  profileFilter?: "post" | "like";
  searchQuery?: string; // 검색 쿼리 추가

  // 공통 설정
  layout?: "grid" | "feed";
  columns?: 2 | 3 | 4 | 5;
  showAuthor?: boolean;
  showActions?: boolean;
  enableHoverPlay?: boolean;
  feedMode?: boolean;
  className?: string;
  disableAnimation?: boolean; // 애니메이션 비활성화 옵션
  onLike?: (postId: number | string) => void;
  onComment?: (postId: number | string) => void;
  onView?: (postId: number | string) => void;
}

// PostCard 컴포넌트 Props
export interface PostCardProps {
  post: Post;
  enableHoverPlay: boolean;
  feedMode: boolean;
  showAuthor: boolean;
  showActions: boolean;
  disableAnimation?: boolean; // 애니메이션 비활성화 옵션
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
  id?: string;
}

// 카테고리 API 응답
export type CategoryType = keyof typeof Category;

export type CategoriesResponse = ApiResponse<CategoryType[]>;

// API 밈 데이터를 UI Post 타입으로 변환하는 유틸 함수용 타입
export interface MemeToPostConverter {
  (apiMeme: ApiMeme, id?: number | string): Post;
}

export interface PostData {
  title: string;
  content: string;
  media_url: string;
  media_upload_time: string;
  category_name: string;
  tags: string[];
}

export interface CategoryOption {
  value: Category;
  label: string;
}

// 커서 기반 페이지네이션 응답 데이터 타입
export interface CursorPaginatedData<T> {
  content: T[];
  has_next: boolean;
  next_cursor: number | null;
}

// 커서 기반 페이지네이션 응답 타입
export type CursorPaginatedResponse<T> = ApiResponse<CursorPaginatedData<T>>;
