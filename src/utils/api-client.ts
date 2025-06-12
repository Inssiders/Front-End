import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "./next-auth";

interface ApiOptions extends RequestInit {
  skipAuth?: boolean;
  timeout?: number;
}

interface ApiError extends Error {
  status?: number;
  data?: any;
}

/**
 * 네트워크 상태 확인
 */
export function isOnline(): boolean {
  if (typeof navigator !== "undefined") {
    return navigator.onLine;
  }
  return true; // Default to true in SSR context
}

/**
 * API 서버 연결 상태 확인
 */
export async function isApiReachable(timeout = 5000): Promise<boolean> {
  const baseUrl = typeof window === "undefined" ? process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL : "";

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${baseUrl}/server/health`, {
      method: "HEAD",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * 클라이언트 사이드 API 호출
 */
async function clientFetch(endpoint: string, options: ApiOptions = {}) {
  const { skipAuth = false, timeout = 10000, ...fetchOptions } = options;

  if (!isOnline()) {
    throw new Error("Network is offline");
  }

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

  const url = endpoint.startsWith("http") ? endpoint : `/server${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      credentials: "include",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`) as ApiError;
      error.status = response.status;
      try {
        error.data = await response.json();
      } catch {}
      throw error;
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * 서버 사이드 API 호출
 */
async function serverFetch(endpoint: string, options: ApiOptions = {}) {
  const { skipAuth = false, timeout = 10000, ...fetchOptions } = options;

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

  const url = endpoint.startsWith("http") ? endpoint : `${process.env.SERVER_URL}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`) as ApiError;
      error.status = response.status;
      try {
        error.data = await response.json();
      } catch {}
      throw error;
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
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
    return response.json();
  },

  post: async <T = any>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  put: async <T = any>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  patch: async <T = any>(endpoint: string, data?: any, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },

  delete: async <T = any>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
    const response = await apiFetch(endpoint, { ...options, method: "DELETE" });
    return response.json();
  },
};

// 인증 관련 API 인터페이스
interface AuthApi {
  login(email: string, password: string): Promise<any>;
  requestEmailVerification(email: string): Promise<any>;
  verifyEmailCode(email: string, otp: string): Promise<any>;
  getTokenWithAuthCode(uuid: string): Promise<any>;
  register(data: { email: string; password: string; nickname: string }): Promise<any>;
  getProfile(id: string): Promise<any>;
  updateProfile(data: any): Promise<any>;
  changePassword(password: string): Promise<any>;
  deleteAccount(): Promise<any>;
}

// 인증 관련 API 구현
export const authApi: AuthApi = {
  login: (email: string, password: string) =>
    api.post("/auth/token", { email, password, grantType: "PASSWORD" }, { skipAuth: true }),

  requestEmailVerification: (email: string) => api.post("/auth/email/challenge", { email }, { skipAuth: true }),

  verifyEmailCode: (email: string, otp: string) => api.post("/auth/email/verify", { email, otp }, { skipAuth: true }),

  getTokenWithAuthCode: (uuid: string) =>
    api.post("/auth/token", { grantType: "AUTHORIZATION_CODE", uuid }, { skipAuth: true }),

  register: (data) => api.post("/accounts", data, { skipAuth: true }),

  getProfile: (id: string) => api.get(`/profiles/${id}`),

  updateProfile: (data: any) => api.patch("/profiles/me", data),

  changePassword: (password: string) => api.patch("/accounts/me/password", { password }),

  deleteAccount: () => api.delete("/accounts/me"),
};
