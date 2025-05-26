import {
  type AuthResponse,
  type DeleteAccountResponse,
  type RegisterResponse,
  type RegisterType,
} from "./type/auth";

// API 호출 함수
async function callAuthAPI(endpoint: string, data: any): Promise<AuthResponse> {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MOCK_SERVER_URL || process.env.MOCK_SERVER_URL
    }/api/auth/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/hal+json; q=0.9, application/json; q=0.8",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Authentication failed");
  }

  return response.json() as Promise<AuthResponse>;
}

// 이메일 인증 요청
export async function requestEmailVerification(email: string) {
  return callAuthAPI("token", {
    grant_type: "authorization_code",
    uuid: email, // TODO: 실제 uuid로 변경 필요
  });
}

// 비밀번호 로그인
export async function loginWithPassword(email: string, password: string) {
  return callAuthAPI("token", {
    grant_type: "password",
    email,
    password,
  });
}

// 일반 로그인 (클라이언트용)
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return loginWithPassword(email, password);
}

// 리프레시 토큰으로 새 토큰 발급
export async function refreshAccessToken(refreshToken: string) {
  return callAuthAPI("token", {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: "inssider-app",
  });
}

interface ProfileResponse {
  message: string;
  data: {
    nickname: string;
    profileUrl: string;
    bio?: string;
    follower_count?: number;
    post_count?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
  };
}

export const fetchProfile = async (accountId: string, accessToken: string) => {
  const headers: HeadersInit = {
    Accept: "application/hal+json; q=0.9, application/json; q=0.8",
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MOCK_SERVER_URL || process.env.MOCK_SERVER_URL
    }/api/profiles/${accountId}`,
    {
      method: "GET",
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json() as Promise<ProfileResponse>;
};

// 회원가입
export async function register({
  email,
  password,
  nickname,
}: {
  email: string;
  password: string;
  nickname: string;
}) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MOCK_SERVER_URL || process.env.MOCK_SERVER_URL
    }/api/accounts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/hal+json; q=0.9, application/json; q=0.8",
      },
      body: JSON.stringify({
        email,
        password,
        register_type: "password" as RegisterType,
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to register");
  }

  return response.json() as Promise<RegisterResponse>;
}

// 비밀번호 재설정
export async function resetPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MOCK_SERVER_URL || process.env.MOCK_SERVER_URL
    }/api/accounts/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  return response.json();
}

// 회원탈퇴
export async function deleteAccount(accessToken: string) {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MOCK_SERVER_URL || process.env.MOCK_SERVER_URL
    }/api/accounts/me`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/hal+json; q=0.9, application/json; q=0.8",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Account deletion failed");
  }

  return response.json() as Promise<DeleteAccountResponse>;
}
