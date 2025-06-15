"use client";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface AuthTokenContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  refetch: () => void;
}

const AuthTokenContext = createContext<AuthTokenContextType | undefined>(undefined);

interface AuthTokenProviderProps {
  children: ReactNode;
}

export function AuthTokenProvider({ children }: AuthTokenProviderProps) {
  const { data: session, status } = useSession();
  const [tokens, setTokens] = useState<{
    accessToken: string | null;
    refreshToken: string | null;
  }>({
    accessToken: null,
    refreshToken: null,
  });

  const updateTokens = useCallback(() => {
    if (session?.user) {
      setTokens({
        accessToken: session.user.accessToken || null,
        refreshToken: session.user.refreshToken || null,
      });
    } else {
      setTokens({
        accessToken: null,
        refreshToken: null,
      });
    }
  }, [session]);

  useEffect(() => {
    updateTokens();
  }, [updateTokens]);

  const value: AuthTokenContextType = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    isLoading: status === "loading",
    refetch: updateTokens,
  };

  return <AuthTokenContext.Provider value={value}>{children}</AuthTokenContext.Provider>;
}

export function useAuthToken() {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuthToken must be used within an AuthTokenProvider");
  }
  return context;
}

// 편의 훅 - 토큰이 있을 때만 API 호출
export function useAuthedApi() {
  const { accessToken } = useAuthToken();

  if (!accessToken) {
    throw new Error("No access token available");
  }

  return {
    get: <T = any,>(endpoint: string, options: RequestInit = {}) =>
      fetch(`/server${endpoint}`, {
        ...options,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
        credentials: "include",
      }).then((res) => res.json() as Promise<T>),

    post: <T = any,>(endpoint: string, data?: any, options: RequestInit = {}) =>
      fetch(`/server${endpoint}`, {
        ...options,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
      }).then((res) => res.json() as Promise<T>),

    put: <T = any,>(endpoint: string, data?: any, options: RequestInit = {}) =>
      fetch(`/server${endpoint}`, {
        ...options,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
      }).then((res) => res.json() as Promise<T>),

    patch: <T = any,>(endpoint: string, data?: any, options: RequestInit = {}) =>
      fetch(`/server${endpoint}`, {
        ...options,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
      }).then((res) => res.json() as Promise<T>),

    delete: <T = any,>(endpoint: string, options: RequestInit = {}) =>
      fetch(`/server${endpoint}`, {
        ...options,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
        credentials: "include",
      }).then((res) => res.json() as Promise<T>),
  };
}
