import { GRANT_TYPE, type AuthResponse, type DeleteAccountResponse, type TokenRequest } from "@/types/auth";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { authOptions } from "../next-auth";

// API fetch wrapper with cookie-based authentication
export interface ApiFetchOptions extends RequestInit {
  skipAuth?: boolean;
  accessToken?: string; // 직접 토큰을 전달할 수 있는 옵션
}

/**
 * 서버 사이드용 apiFetch - getServerSession 사용
 */
export async function apiServerFetch(endpoint: string, options: ApiFetchOptions = {}): Promise<Response> {
  const { skipAuth = false, accessToken, ...fetchOptions } = options;

  // URL 구성
  let url: string;
  if (endpoint.startsWith("http")) {
    url = endpoint;
  } else {
    const baseUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    url = `${baseUrl}/api${endpoint}`;
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/hal+json; q=0.9, application/json; q=0.8",
  };

  // Authorization 헤더 추가
  if (!skipAuth) {
    if (accessToken) {
      // 직접 전달된 토큰 사용 (성능상 우선)
      defaultHeaders.Authorization = `Bearer ${accessToken}`;
      console.log("🔑 [Server] Using provided accessToken");
    } else {
      // 토큰이 없을 때만 세션에서 가져오기
      try {
        const session = await getServerSession(authOptions);
        if (session?.user?.accessToken) {
          defaultHeaders.Authorization = `Bearer ${session.user.accessToken}`;
          console.log(
            "🔑 [Server] Authorization header from session:",
            `Bearer ${session.user.accessToken.substring(0, 20)}...`
          );
        } else {
          console.log("⚠️ [Server] No accessToken found in session");
        }
      } catch (error) {
        console.warn("Failed to get server session for auth header:", error);
      }
    }
  } else {
    console.log("🚫 [Server] Auth skipped for this request");
  }

  // 기존 헤더와 병합
  const headers = {
    ...defaultHeaders,
    ...((fetchOptions.headers as Record<string, string>) || {}),
  };

  // 요청 실행
  const response = await fetch(url, {
    ...fetchOptions,
    headers,
    credentials: "include",
  });

  return response;
}

/**
 * 쿠키 기반 인증 fetch wrapper
 * NextAuth 세션에서 accessToken을 자동으로 가져와서 Authorization 헤더에 추가
 * 성능을 위해 accessToken을 직접 전달하는 것을 권장
 */
export async function apiFetch(endpoint: string, options: ApiFetchOptions = {}): Promise<Response> {
  // 서버 사이드에서는 apiServerFetch 사용
  if (typeof window === "undefined") {
    return apiServerFetch(endpoint, options);
  }

  const { skipAuth = false, accessToken, ...fetchOptions } = options;

  // URL 구성 - 클라이언트 사이드에서는 상대 URL 사용
  let url: string;
  if (endpoint.startsWith("http")) {
    url = endpoint;
  } else {
    url = `/server${endpoint}`;
  }

  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/hal+json; q=0.9, application/json; q=0.8",
  };

  // Authorization 헤더 추가
  if (!skipAuth) {
    if (accessToken) {
      // 직접 전달된 토큰 사용 (성능상 우선)
      defaultHeaders.Authorization = `Bearer ${accessToken}`;
      console.log("🔑 Using provided accessToken");
    } else {
      // 토큰이 없을 때만 세션에서 가져오기
      try {
        const session = await getSession();
        if (session?.user?.accessToken) {
          defaultHeaders.Authorization = `Bearer ${session.user.accessToken}`;
          console.log(
            "🔑 Authorization header from session:",
            `Bearer ${session.user.accessToken.substring(0, 20)}...`
          );
        } else {
          console.log("⚠️ No accessToken found in session");
        }
      } catch (error) {
        console.warn("Failed to get session for auth header:", error);
      }
    }
  } else {
    console.log("🚫 Auth skipped for this request");
  }

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
export async function apiGet<T = any>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * POST 요청
 */
export async function apiPost<T = any>(endpoint: string, data?: any, options: ApiFetchOptions = {}): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * PUT 요청
 */
export async function apiPut<T = any>(endpoint: string, data?: any, options: ApiFetchOptions = {}): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * PATCH 요청
 */
export async function apiPatch<T = any>(endpoint: string, data?: any, options: ApiFetchOptions = {}): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

/**
 * DELETE 요청
 */
export async function apiDelete<T = any>(endpoint: string, options: ApiFetchOptions = {}): Promise<T> {
  const response = await apiFetch(endpoint, {
    ...options,
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || error.detail || "Request failed");
  }

  return response.json();
}

// Auth API 호출 함수 (기존 fetch.ts에서 가져옴)
async function callAuthAPI(endpoint: string, data: any): Promise<AuthResponse> {
  const response = await apiServerFetch(`/auth/${endpoint}`, {
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
export async function requestEmailVerification(email: string): Promise<AuthResponse> {
  const challengeResponse = await apiFetch("/auth/email/challenge", {
    method: "POST",
    skipAuth: true, // 이메일 인증 요청은 인증 불필요
    body: JSON.stringify({ email }),
  });

  if (!challengeResponse.ok) {
    const error = await challengeResponse.json();
    throw new Error(error.detail || error.message || "이메일 인증 요청에 실패했습니다.");
  }

  return challengeResponse.json();
}

// 비밀번호 로그인
export async function loginWithPassword(email: string, password: string): Promise<AuthResponse> {
  const response = await apiServerFetch("/auth/token", {
    method: "POST",
    skipAuth: true, // 로그인 요청은 인증 불필요
    body: JSON.stringify({
      grant_type: "PASSWORD",
      email,
      password,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.message || "로그인에 실패했습니다.");
  }

  return response.json();
}

// 리프레시 토큰으로 새 토큰 발급
export async function refreshAccessToken(refreshToken: string): Promise<AuthResponse> {
  const response = await apiServerFetch("/auth/token", {
    method: "POST",
    skipAuth: true, // 리프레시 토큰 요청은 인증 불필요
    body: JSON.stringify({
      grant_type: "REFRESH_TOKEN",
      refresh_token: refreshToken,
      client_id: "inssider-app",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.message || "토큰 갱신에 실패했습니다.");
  }

  return response.json();
}

export async function register(data: { email: string; password: string; nickname: string }): Promise<any> {
  // 이메일 인증 토큰이 필요하므로 Authorization 헤더가 있어야 함
  const response = await apiServerFetch("/accounts", {
    method: "POST",
    skipAuth: true, // 회원가입도 별도 인증 불필요 (이메일 인증 토큰 사용)
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      register_type: "password",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.message || "회원가입에 실패했습니다.");
  }

  return response.json();
}

// 회원탈퇴
export async function deleteAccount() {
  const response = await apiFetch("/accounts/me", {
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
  // 비밀번호 로그인
  async loginWithPassword(email: string, password: string) {
    const request: TokenRequest = {
      grant_type: GRANT_TYPE.PASSWORD,
      email,
      password,
    };
    return apiPost("/auth/token", request, { skipAuth: true });
  },

  // 이메일 인증으로 토큰 발급
  async loginWithEmail(uuid: string) {
    const request: TokenRequest = {
      grant_type: GRANT_TYPE.AUTHORIZATION_CODE,
      uuid,
    };
    return apiPost("/auth/token", request, { skipAuth: true });
  },

  // 리프레시 토큰으로 토큰 갱신
  async refreshToken(refreshToken: string) {
    const request: TokenRequest = {
      grant_type: GRANT_TYPE.REFRESH_TOKEN,
      refreshToken,
      clientId: "inssider-app",
    };
    return apiPost("/auth/token", request, { skipAuth: true });
  },

  // 이메일 인증 코드 발송
  async sendEmailChallenge(email: string) {
    return apiPost("/auth/email/challenge", { email }, { skipAuth: true });
  },

  // 이메일 인증 코드 확인
  async verifyEmail(email: string, otp: string) {
    return apiPost("/auth/email/verify", { email, otp }, { skipAuth: true });
  },

  // 회원가입
  async register(data: { register_type: "password"; email: string; password: string }) {
    return apiPost("/accounts", data);
  },

  // 프로필 조회
  async getProfile(id: string) {
    return apiGet(`/profiles/${id}`);
  },

  // 프로필 업데이트
  async updateProfile(data: {
    nickname: string;
    introduction: string;
    profile_url: string;
    account_visibility: boolean;
    follower_visibility: boolean;
  }) {
    return apiPatch("/profiles/me", data);
  },

  // 비밀번호 변경
  async changePassword(password: string) {
    return apiPatch("/accounts/me/password", { password });
  },

  // 회원탈퇴
  async deleteAccount() {
    return apiDelete("/accounts/me");
  },

  // 로그아웃 (쿠키는 NextAuth에서 자동 처리)
  async logout() {
    return apiPost("/auth/logout");
  },
};

// 성능 최적화를 위한 토큰 기반 API 헬퍼들
export const createAuthedApi = (accessToken: string) => ({
  get: <T = any>(endpoint: string, options: Omit<ApiFetchOptions, "accessToken"> = {}) =>
    apiGet<T>(endpoint, { ...options, accessToken }),

  post: <T = any>(endpoint: string, data?: any, options: Omit<ApiFetchOptions, "accessToken"> = {}) =>
    apiPost<T>(endpoint, data, { ...options, accessToken }),

  put: <T = any>(endpoint: string, data?: any, options: Omit<ApiFetchOptions, "accessToken"> = {}) =>
    apiPut<T>(endpoint, data, { ...options, accessToken }),

  patch: <T = any>(endpoint: string, data?: any, options: Omit<ApiFetchOptions, "accessToken"> = {}) =>
    apiPatch<T>(endpoint, data, { ...options, accessToken }),

  delete: <T = any>(endpoint: string, options: Omit<ApiFetchOptions, "accessToken"> = {}) =>
    apiDelete<T>(endpoint, { ...options, accessToken }),
});

/* 
사용법 예시:

1. 기본 방법 (세션에서 자동으로 토큰 가져오기):
```typescript
const data = await apiGet("/api/profiles/me");
```

2. 성능 최적화 방법 (토큰 직접 전달):
```typescript
// 한 번만 세션에서 토큰을 가져와서
const session = await getSession();
const token = session?.user?.accessToken;

// 여러 요청에서 재사용
const data1 = await apiGet("/api/profiles/me", { accessToken: token });
const data2 = await apiPost("/api/posts", postData, { accessToken: token });

// 또는 API 객체 생성하여 사용
const api = createAuthedApi(token);
const profile = await api.get("/api/profiles/me");
const posts = await api.post("/api/posts", postData);
```

3. 서버 사이드에서 사용:
```typescript
// pages/api 또는 app router의 route.ts에서
const session = await getServerSession(authOptions);
const api = createAuthedApi(session.user.accessToken);
const data = await api.get("api/some-endpoint");
```
*/
