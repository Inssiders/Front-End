import type { RegisterError } from "@/utils/type/auth";

interface User {
  id: string;
  email: string;
  password: string;
  nickname: string;
  profileUrl: string;
  bio?: string;
  follower_count: number;
  post_count: number;
  accountVisible: boolean;
  followerVisible: boolean;
  deleted_at: string | null;
}

interface Tokens {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    nickname: "TestUser",
    profileUrl: "https://picsum.photos/200",
    bio: "Hello, I'm a test user!",
    follower_count: 10,
    post_count: 5,
    accountVisible: true,
    followerVisible: true,
    deleted_at: null,
  },
  {
    id: "2",
    email: "deleted@example.com",
    password: "password123",
    nickname: "DeletedUser",
    profileUrl: "https://picsum.photos/200",
    bio: "I'm a deleted user",
    follower_count: 0,
    post_count: 0,
    accountVisible: false,
    followerVisible: false,
    deleted_at: "2024-03-21T10:00:00Z",
  },
];

export const mockTokens: Tokens = {
  access_token: "mock_access_token",
  refresh_token: "mock_refresh_token",
  expires_in: 3600,
};

// Error responses
export const mockErrors: Record<string, RegisterError> = {
  unauthorized: {
    type: "https://api.inssider.com/problems/unauthorized",
    title: "인증 실패",
    status: 401,
    detail: "유효하지 않은 인증 정보입니다.",
    instance: "/api/auth/token",
  },
  forbidden: {
    type: "https://api.inssider.com/problems/forbidden",
    title: "권한 없음",
    status: 403,
    detail: "해당 리소스에 접근할 권한이 없습니다.",
    instance: "/api/auth/token",
  },
  emailConflict: {
    type: "https://api.inssider.com/problems/conflict",
    title: "이메일 중복",
    status: 409,
    detail: "이미 사용 중인 이메일입니다.",
    instance: "/api/accounts",
  },
  invalidRequest: {
    type: "https://api.inssider.com/problems/invalid-request",
    title: "유효하지 않은 요청",
    status: 422,
    detail: "요청 데이터가 유효하지 않습니다.",
    instance: "/api/accounts",
  },
  tooManyRequests: {
    type: "https://api.inssider.com/problems/too-many-requests",
    title: "요청 횟수 초과",
    status: 429,
    detail: "요청 횟수가 너무 많습니다. 잠시 후 다시 시도해주세요.",
    instance: "/api/auth/token",
  },
};
