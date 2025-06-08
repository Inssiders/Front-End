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

// API에서 받아오는 원본 밈 데이터 타입
export interface ApiMeme {
  title: string;
  content: string;
  media_url: string;
  media_upload_time: string; // API 응답에서 "mdeia_upload_time"으로 오타가 있지만 일단 정상명으로 정의
  user_id: number;
  category_id: number;
  created_at: string; // API 응답에서 "createdAt"으로 camelCase이지만 snake_case로 통일
  updated_at: string;
}

// 사용자 정보 타입
export interface Author {
  account_id?: number;
  account_name?: string;
  profile_image?: string;
}

// UI에서 사용하는 Post 타입 (기존 호환성 유지)
export interface Post {
  id: number | string;
  title: string;
  content?: string;
  category_id: number;
  media_url: string;
  media_upload_time: string;
  account_id: number; // user_id를 account_id로 매핑
  created_at: string;
  updated_at: string;
  is_deleted?: boolean;

  // UI에서 필요한 추가 정보 (선택적)
  author?: Author;
  likes?: number;
  comment_count?: number;
  is_liked?: boolean;
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
  nextCursor?: string;
}

// API 링크 정보
export interface ApiLinks {
  self: { href: string };
  prev?: { href: string };
  next?: { href: string };
}

// 일반 조회 API 응답
export interface PostsResponse {
  message: string;
  data: {
    memes: ApiMeme[];
    pageInfo: OffsetPageInfo;
  };
  _links: ApiLinks;
}

// 프로필 조회 API 응답
export interface ProfilePostsResponse {
  message: string;
  data: {
    memes: ApiMeme[];
    pageInfo: CursorPageInfo;
  };
}

// 일반 조회 쿼리 파라미터
export interface PostsQueryParams {
  page?: number;
  size?: number;
  keyword?: string;
  category_id?: number;
  sort?: string;
}

// 프로필 조회 쿼리 파라미터
export interface ProfileQueryParams {
  profile_filter: "posts" | "likes";
  size?: number;
  cursor?: string;
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
  profileFilter?: "posts" | "likes";

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
export interface CategoriesResponse {
  message: string;
  data: {
    categories: CategoryData[];
  };
}

// API 밈 데이터를 UI Post 타입으로 변환하는 유틸 함수용 타입
export interface MemeToPostConverter {
  (apiMeme: ApiMeme, id?: number | string): Post;
}
