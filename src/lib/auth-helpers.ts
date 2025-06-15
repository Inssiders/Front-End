"use client";

import { signIn, signOut, useSession } from "next-auth/react";

/**
 * NextAuth와 통합된 인증 헬퍼
 */
export function useAuth() {
  const { data: session, status } = useSession({
    required: false,
  });

  const login = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      grantType: "password",
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const logout = async () => {
    await signOut({ redirect: false });
  };

  const register = async (email: string, password: string) => {
    const result = await signIn("credentials", {
      email,
      password,
      is_register: "true",
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  const requestEmailVerification = async (email: string) => {
    const result = await signIn("credentials", {
      email,
      password: "", // 이메일 인증에서는 비밀번호 불필요
      grantType: "AUTHORIZATION_CODE",
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    return result;
  };

  return {
    session,
    status,
    login,
    logout,
    register,
    requestEmailVerification,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    // 토큰 만료 정보 (NextAuth에서 자동 관리)
    hasTokenError: session?.user?.error === "RefreshAccessTokenError",
    tokenExpiresAt: session?.user?.exp,
  };
}

/**
 * 서버 컴포넌트에서 사용할 수 있는 세션 정보 가져오기
 */
export { authOptions } from "@/utils/next-auth";
export { getServerSession } from "next-auth/next";
