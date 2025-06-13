"use server";

import { cookies } from "next/headers";

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

// 쿠키 설정
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const ACCESS_TOKEN_COOKIE = "access_token";
const REFRESH_TOKEN_COOKIE = "refresh_token";

/**
 * 토큰을 httpOnly 쿠키에 저장
 */
export async function setAuthCookies(tokenData: TokenData): Promise<void> {
  const cookieStore = await cookies();

  // Access Token 저장
  cookieStore.set(ACCESS_TOKEN_COOKIE, tokenData.access_token, {
    ...COOKIE_OPTIONS,
    maxAge: tokenData.expires_in,
  });

  // Refresh Token 저장 (있는 경우)
  if (tokenData.refresh_token) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, tokenData.refresh_token, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30, // 30일
    });
  }
}

/**
 * 쿠키에서 Access Token 조회
 */
export async function getAccessTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || null;
}

/**
 * 쿠키에서 Refresh Token 조회
 */
export async function getRefreshTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || null;
}

/**
 * 모든 인증 쿠키 삭제
 */
export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

/**
 * 토큰 갱신
 */
export async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = await getRefreshTokenFromCookie();

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grantType: "refresh_token",
        refresh_token: refreshToken,
        client_id: "inssider-app",
      }),
    });

    if (!response.ok) {
      await clearAuthCookies();
      return false;
    }

    const data = await response.json();
    await setAuthCookies(data.data.token);
    return true;
  } catch (error) {
    console.error("Token refresh failed:", error);
    await clearAuthCookies();
    return false;
  }
}
