import {
  type AuthResponse,
  type DeleteAccountResponse,
  type RegisterResponse,
  type RegisterType,
} from "../types/auth";

// API fetch wrapper with cookie-based authentication
export interface ApiFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * 쿠키 기반 인증 fetch wrapper
 * 쿠키에 저장된 JWT 토큰이 자동으로 포함됩니다
 * 401 에러는 NextAuth의 JWT callback에서 자동으로 처리됩니다
 */
export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const { skipAuth = false, ...fetchOptions } = options;

  // URL 구성 - 서버사이드에서는 절대 URL 필요
  let url: string;

  if (endpoint.startsWith("http")) {
    url = endpoint;
  } else {
    const baseUrl =
      typeof window === "undefined"
        ? process.env.NEXTAUTH_URL || "http://localhost:3000"
        : "";

    url = `${baseUrl}/server/${endpoint}`;
    console.log(url);
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/hal+json; q=0.9, application/json; q=0.8",
  };

  // 기존 헤더와 병합
  const headers = {
    ...defaultHeaders,
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  // 요청 실행
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: "include", // 쿠키 자동 포함
  });

  return response;
}

/**
 * GET 요청
 */
export async function apiGet<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "GET",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * POST 요청
 */
export async function apiPost<T = any>(
  endpoint: string,
  data?: any,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * PUT 요청
 */
export async function apiPut<T = any>(
  endpoint: string,
  data?: any,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * PATCH 요청
 */
export async function apiPatch<T = any>(
  endpoint: string,
  data?: any,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * DELETE 요청
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

// Auth API 호출 함수 (기존 fetch.ts에서 가져옴)
async function callAuthAPI(endpoint: string, data: any): Promise<AuthResponse> {
  const response = await apiFetch(`auth/${endpoint}`, {
    ...{ skipAuth: true },
    method: "POST",
    body: JSON.stringify(data),
  });

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
  const response = await apiFetch("accounts", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      register_type: "password" as RegisterType,
    }),
  });

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
  const response = await apiFetch("accounts/reset-password", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  return response.json();
}

// 회원탈퇴
export async function deleteAccount() {
  const response = await apiFetch("accounts/me", {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Account deletion failed");
  }

  return response.json() as Promise<DeleteAccountResponse>;
}

/**
 * 인증 관련 API 헬퍼들
 */
export const authApi = {
  // 로그인
  async login(email: string, password: string) {
    return apiPost(
      "auth/token",
      {
        grant_type: "password",
        email,
        password,
      },
      { skipAuth: true }
    );
  },

  // 이메일 인증 코드 발송
  async sendEmailChallenge(email: string) {
    return apiPost("auth/email/challenge", { email }, { skipAuth: true });
  },

  // 이메일 인증 코드 확인
  async verifyEmail(email: string, otp: string) {
    return apiPost("auth/email/verify", { email, otp }, { skipAuth: true });
  },

  // 회원가입
  async register(data: {
    register_type: "password";
    email: string;
    password: string;
  }) {
    return apiPost("accounts", data);
  },

  // 프로필 조회
  async getProfile(id: string) {
    return apiGet(`profiles/${id}`);
  },

  // 프로필 업데이트
  async updateProfile(data: {
    nickname: string;
    introduction: string;
    account_visibility: boolean;
    follower_visibility: boolean;
  }) {
    return apiPatch("profiles/me", data);
  },

  // 비밀번호 변경
  async changePassword(password: string) {
    return apiPatch("accounts/me/password", { password });
  },

  // 회원탈퇴
  async deleteAccount() {
    return apiDelete("accounts/me");
  },

  // 로그아웃 (쿠키는 NextAuth에서 자동 처리)
  async logout() {
    return apiPost("auth/logout");
  },
};
