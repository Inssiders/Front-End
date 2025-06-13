import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { getSession } from "next-auth/react";

// React Query를 위한 커스텀 fetcher
export const createQueryFetcher = (): QueryFunction => {
  return async ({ queryKey, signal }) => {
    const [endpoint, options = {}] = queryKey;

    if (typeof endpoint !== "string") {
      throw new Error("Query key must start with a string endpoint");
    }

    // 세션에서 토큰 가져오기
    const session = await getSession();
    const accessToken = session?.user?.accessToken;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // 인증이 필요하지 않은 엔드포인트 체크
    const authSkipEndpoints = ["/auth/", "/public/"];
    const skipAuth = authSkipEndpoints.some((skip) => endpoint.includes(skip));

    if (!skipAuth && accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await fetch(`/server${endpoint}`, {
      method: "GET",
      headers,
      credentials: "include",
      signal, // AbortSignal 전달
      ...(typeof options === "object" ? options : {}),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.json();
  };
};

// React Query 클라이언트 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: createQueryFetcher(),
      staleTime: 5 * 60 * 1000, // 5분
      retry: (failureCount, error: any) => {
        // 401 에러는 재시도하지 않음 (인증 실패)
        if (error?.status === 401) return false;
        return failureCount < 3;
      },
    },
  },
});

// Mutation을 위한 헬퍼
export const createMutation = (method: "POST" | "PUT" | "PATCH" | "DELETE") => {
  return async ({ endpoint, data, accessToken }: { endpoint: string; data?: any; accessToken?: string }) => {
    let token = accessToken;

    if (!token) {
      const session = await getSession();
      token = session?.user?.accessToken;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`/server${endpoint}`, {
      method,
      headers,
      credentials: "include",
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Unknown error" }));
      throw new Error(error.message || `API Error: ${response.status}`);
    }

    return response.json();
  };
};

// 편의 함수들
export const apiMutations = {
  post: createMutation("POST"),
  put: createMutation("PUT"),
  patch: createMutation("PATCH"),
  delete: createMutation("DELETE"),
};
