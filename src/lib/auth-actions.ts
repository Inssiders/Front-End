"use server";

import { apiFetch } from "@/utils/api-client";
import bcrypt from "bcryptjs";
import { clearAuthCookies, setAuthCookies, TokenData } from "./auth-cookies";

/**
 * 비밀번호를 bcrypt로 해싱하는 Server Action
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "12", 10);
  return await bcrypt.hash(password, saltRounds);
}

/**
 * 회원가입 Server Action
 */
export async function createAccount(data: { email: string; password: string; accessToken: string }) {
  try {
    // 서버 API 호출
    const response = await apiFetch("/accounts", {
      body: JSON.stringify({
        register_type: "PASSWORD",
        email: data.email,
        password: data.password,
      }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.accessToken}`,
      },
    });
    console.log("createAccount", response);

    return { success: true };
  } catch (error) {
    console.error("Account creation error:", error);
    throw error;
  }
}

/**
 * 로그인 성공 후 토큰을 쿠키에 저장하는 Server Action
 */
export async function saveAuthTokens(tokenData: TokenData): Promise<void> {
  await setAuthCookies(tokenData);
}

/**
 * 로그아웃 시 쿠키를 삭제하는 Server Action
 */
export async function removeAuthTokens(): Promise<void> {
  await clearAuthCookies();
}
