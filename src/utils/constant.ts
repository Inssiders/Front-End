/**
 * 페이지네이션 관련 상수
 */
export const PAGE_SIZE = {
  POSTS: 20, // 게시물 페이지 크기
  COMMENTS: 10, // 댓글 페이지 크기
  USERS: 20, // 사용자 리스트 페이지 크기
} as const;

export type PageSizeKey = keyof typeof PAGE_SIZE;
export type PageSizeValue = (typeof PAGE_SIZE)[PageSizeKey];

// 기본 페이지 크기 (이전 버전 호환성)
export const DEFAULT_PAGE_SIZE = PAGE_SIZE.POSTS;

/**
 * API 관련 상수
 */
export const API_ENDPOINTS = {
  POSTS: "/api/posts",
  CATEGORIES: "/api/categories",
  USERS: "/api/users",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];

/**
 * 무한스크롤 설정
 */
export const INFINITE_SCROLL = {
  // 옵저버 설정
  ROOT_MARGIN: "200px 0px", // 미리 로드할 거리
  THRESHOLD: 0.1, // 트리거 감도 (10% 보일 때)

  // 재시도 설정
  RETRY_COUNT: 2,
  RETRY_DELAY: 1000, // ms

  // 성능 최적화 설정
  DEBOUNCE_DELAY: 100, // ms
  THROTTLE_DELAY: 300, // ms
  COOLDOWN_TIME: 500, // ms
} as const;

export type InfiniteScrollConfig = typeof INFINITE_SCROLL;
