"use client";

import { useAuthToken } from "@/contexts/AuthTokenContext";
import { isApiReachable } from "@/utils/api-client";
import { useQuery } from "@tanstack/react-query";

interface FetchOptions {
  cache?: RequestCache;
  credentials?: RequestCredentials;
  headers?: Record<string, string>;
}

interface UseDataOptions {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  fetchOptions?: FetchOptions;
  fallbackData?: any;
}

export function useData<T = any>(
  key: string | string[],
  apiUrl?: string,
  mockDataUrl?: string,
  options: UseDataOptions = {}
) {
  const { accessToken } = useAuthToken();
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5분
    cacheTime = 10 * 60 * 1000, // 10분
    refetchOnWindowFocus = false,
    retry = 1,
    fetchOptions = {},
    fallbackData,
  } = options;

  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    enabled,
    staleTime,
    gcTime: cacheTime,
    refetchOnWindowFocus,
    retry,
    queryFn: async () => {
      // 서버 연결 가능 여부 확인
      const isConnected = await isApiReachable();

      if (isConnected && apiUrl) {
        // API 서버 사용
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...fetchOptions.headers,
        };

        if (accessToken) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        const response = await fetch(apiUrl, {
          cache: fetchOptions.cache || "default",
          credentials: fetchOptions.credentials || "include",
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      } else if (mockDataUrl) {
        // Mock 데이터 사용
        const mockResponse = await fetch(mockDataUrl);
        if (!mockResponse.ok) {
          throw new Error(`Mock data fetch failed! status: ${mockResponse.status}`);
        }
        return mockResponse.json();
      } else if (fallbackData) {
        // Fallback 데이터 사용
        return fallbackData;
      } else {
        throw new Error("No data source available");
      }
    },
  });
}
