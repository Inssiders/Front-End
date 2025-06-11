import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../next-auth";

interface InterceptedFetchOptions extends RequestInit {
  skipAuth?: boolean;
  accessToken?: string;
}

// 글로벌 fetch 인터셉터
class FetchInterceptor {
  private static instance: FetchInterceptor;
  private originalFetch: typeof fetch;

  private constructor() {
    this.originalFetch = global.fetch;
    this.setupInterceptor();
  }

  public static getInstance(): FetchInterceptor {
    if (!FetchInterceptor.instance) {
      FetchInterceptor.instance = new FetchInterceptor();
    }
    return FetchInterceptor.instance;
  }

  private setupInterceptor() {
    global.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const options = (init as InterceptedFetchOptions) || {};
      const { skipAuth = false, accessToken, ...fetchOptions } = options;

      // API 요청이 아닌 경우 원본 fetch 사용
      const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
      if (!url.includes("/server/") && !url.includes("/api/")) {
        return this.originalFetch(input, init);
      }

      // 인증이 필요하지 않은 엔드포인트들
      const authSkipEndpoints = [
        "/api/auth/callback",
        "/api/auth/session",
        "/api/auth/signin",
        "/api/auth/signout",
        "/api/auth/csrf",
        "/server/auth/token",
        "/server/auth/email",
        "/server/accounts",
      ];

      const shouldSkipAuth = skipAuth || authSkipEndpoints.some((endpoint) => url.includes(endpoint));

      if (!shouldSkipAuth) {
        let authToken = accessToken;

        // 토큰이 직접 제공되지 않은 경우 세션에서 가져오기
        if (!authToken) {
          try {
            if (typeof window === "undefined") {
              // 서버 사이드
              const session = await getServerSession(authOptions);
              authToken = session?.user?.accessToken;
            } else {
              // 클라이언트 사이드
              const session = await getSession();
              authToken = session?.user?.accessToken;
            }
          } catch (error) {
            console.warn("Failed to get session for auth header:", error);
          }
        }

        if (authToken) {
          const headers = new Headers(fetchOptions.headers);
          headers.set("Authorization", `Bearer ${authToken}`);
          fetchOptions.headers = headers;
          console.log("🔑 [Interceptor] Auth header added automatically");
        }
      }

      return this.originalFetch(input, fetchOptions);
    };
  }

  public restore() {
    global.fetch = this.originalFetch;
  }
}

// 인터셉터 초기화
export function initializeFetchInterceptor() {
  return FetchInterceptor.getInstance();
}

// 인터셉터 제거
export function removeFetchInterceptor() {
  FetchInterceptor.getInstance().restore();
}

// 단순한 API 호출 헬퍼들 (인터셉터가 자동으로 처리)
export const api = {
  get: <T = any>(endpoint: string, options: InterceptedFetchOptions = {}) =>
    fetch(`/server/${endpoint}`, { ...options, method: "GET" }).then((res) => res.json() as Promise<T>),

  post: <T = any>(endpoint: string, data?: any, options: InterceptedFetchOptions = {}) =>
    fetch(`/server/${endpoint}`, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }).then((res) => res.json() as Promise<T>),

  put: <T = any>(endpoint: string, data?: any, options: InterceptedFetchOptions = {}) =>
    fetch(`/server/${endpoint}`, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }).then((res) => res.json() as Promise<T>),

  patch: <T = any>(endpoint: string, data?: any, options: InterceptedFetchOptions = {}) =>
    fetch(`/server/${endpoint}`, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    }).then((res) => res.json() as Promise<T>),

  delete: <T = any>(endpoint: string, options: InterceptedFetchOptions = {}) =>
    fetch(`/server/${endpoint}`, { ...options, method: "DELETE" }).then((res) => res.json() as Promise<T>),
};
