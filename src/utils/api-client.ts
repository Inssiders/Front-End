import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./next-auth";

interface ApiOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * 클라이언트 사이드 API 호출
 */
async function clientFetch(endpoint: string, options: ApiOptions = {}) {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const session = await getSession();
    if (session?.user?.accessToken) {
      headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
  }

  // 개발 환경에서는 /server 프록시를 사용, 프로덕션에서는 직접 API URL 사용
  let url: string;
  if (endpoint.startsWith("http")) {
    url = endpoint;
  } else {
    if (process.env.NODE_ENV === "development") {
      url = `/server${endpoint}`;
    } else {
      // 프로덕션 환경에서는 환경변수에서 API URL을 가져옴
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8080";
      url = `${baseUrl}/api${endpoint}`;
    }
  }

  return fetch(url, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });
}

/**
 * 서버 사이드 API 호출
 */
async function serverFetch(endpoint: string, options: ApiOptions = {}) {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const session = await getServerSession(authOptions);
    if (session?.user?.accessToken) {
      headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
  }

  const baseUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
  const url = endpoint.startsWith("http") ? endpoint : `${baseUrl}${endpoint}`;

  return fetch(url, {
    ...fetchOptions,
    headers,
  });
}

/**
 * 환경에 맞는 fetch 함수 선택
 */
export async function apiFetch(endpoint: string, options: ApiOptions = {}) {
  if (typeof window === "undefined") {
    return serverFetch(endpoint, options);
  } else {
    return clientFetch(endpoint, options);
  }
}

/**
 * HTTP 메서드별 헬퍼 함수들
 */
export const api = {
  get: async <T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, { ...options, method: "GET" });
    if (!response.ok) throw new Error(`GET ${endpoint} failed`);
    return response.json();
  },

  post: async <T = any>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed`);
    return response.json();
  },

  put: async <T = any>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`PUT ${endpoint} failed`);
    return response.json();
  },

  patch: async <T = any>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!response.ok) throw new Error(`PATCH ${endpoint} failed`);
    return response.json();
  },

  delete: async <T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, { ...options, method: "DELETE" });
    if (!response.ok) throw new Error(`DELETE ${endpoint} failed`);
    return response.json();
  },
};

// 편의 함수들
export const authApi = {
  // 기본 인증
  login: (email: string, password: string) =>
    api.post("/auth/token", { email, password, grantType: "PASSWORD" }, { skipAuth: true }),

  // 이메일 인증 요청
  requestEmailVerification: (email: string) => api.post("/auth/email/challenge", { email }, { skipAuth: true }),

  // 이메일 인증 코드 확인
  verifyEmailCode: (email: string, otp: string) => api.post("/auth/email/verify", { email, otp }, { skipAuth: true }),

  // 인증 코드로 토큰 발급
  getTokenWithAuthCode: (uuid: string) =>
    api.post("/auth/token", { grantType: "AUTHORIZATION_CODE", uuid }, { skipAuth: true }),

  // 계정 관리
  register: (data: { email: string; password: string; nickname: string }) =>
    api.post("/accounts", data, { skipAuth: true }),

  getProfile: (id: string) => api.get(`/profiles/${id}`),

  updateProfile: (data: any) => api.patch("/profiles/me", data),

  changePassword: (password: string) => api.patch("/accounts/me/password", { password }),

  deleteAccount: () => api.delete("/accounts/me"),
};
