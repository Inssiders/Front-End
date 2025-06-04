"use server";

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
export async function createAccount(data: {
  email: string;
  password: string;
  authorizationCode: string;
}) {
  try {
    // 비밀번호 해싱
    const hashedPassword = await hashPassword(data.password);

    // 서버 API 호출
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/server/accounts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.authorizationCode}`,
        },
        body: JSON.stringify({
          register_type: "password",
          email: data.email,
          password: hashedPassword,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "회원가입에 실패했습니다.");
    }

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
