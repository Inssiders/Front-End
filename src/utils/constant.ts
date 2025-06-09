// 페이지네이션 관련 상수
export const PAGE_SIZE = {
  POSTS: 20, // 게시물 페이지 크기
  COMMENTS: 10, // 댓글 페이지 크기
  USERS: 20, // 사용자 리스트 페이지 크기
} as const;

// 기본 페이지 크기 (이전 버전 호환성)
export const DEFAULT_PAGE_SIZE = PAGE_SIZE.POSTS;

// API 관련 상수
export const API_ENDPOINTS = {
  POSTS: "/server/posts",
  CATEGORIES: "/server/categories",
  USERS: "/server/users",
} as const;

// 무한스크롤 설정 - 자연스러운 스크롤 플로우
export const INFINITE_SCROLL = {
  ROOT_MARGIN: "200px 0px", // 미리 로드할 거리 (더 여유롭게)
  THRESHOLD: 0.1, // 트리거 감도 (10% 보일 때 실행 - 더 빠르게)
  RETRY_COUNT: 2, // 재시도 횟수
  RETRY_DELAY: 1000, // 재시도 지연시간 (ms)

  // 성능 최적화: 쓰로틀링/디바운싱 설정
  DEBOUNCE_DELAY: 100, // 디바운싱 지연시간 (ms) - 빠른 스크롤 시 마지막 호출만
  THROTTLE_DELAY: 300, // 쓰로틀링 지연시간 (ms) - 최소 간격
  COOLDOWN_TIME: 500, // 쿨다운 시간 (ms) - 연속 호출 방지
} as const;
