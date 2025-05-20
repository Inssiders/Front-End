import { type AuthResponse } from "./type/auth";

// API 호출 함수
async function callAuthAPI(endpoint: string, data: any): Promise<AuthResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Authentication failed");
  }

  return response.json();
}

// 이메일 인증 요청
async function requestEmailVerification(email: string) {
  return callAuthAPI("token", {
    grant_type: "email",
    email,
    trigger_path: "/verify",
  });
}

// 비밀번호 로그인
async function loginWithPassword(email: string, password: string) {
  return callAuthAPI("token", {
    grant_type: "password",
    email,
    password,
  });
}

// 리프레시 토큰으로 새 토큰 발급
async function refreshAccessToken(refreshToken: string) {
  return callAuthAPI("token", {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: "inssider",
  });
}

export { loginWithPassword, refreshAccessToken, requestEmailVerification };
