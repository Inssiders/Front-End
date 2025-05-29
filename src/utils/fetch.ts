import {
  type AuthResponse,
  type DeleteAccountResponse,
  type RegisterResponse,
  type RegisterType,
} from "./type/auth";
import {
  type ProfileResponse as ProfileDataResponse,
  type ProfilePostsResponse as ProfilePostsDataResponse,
} from "./type/profile";

// Helper function to construct URL based on environment
function constructUrl(path: string): string {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.SERVER_URL || "http://localhost:3000" // 서버사이드에서는 절대 URL 필요
      : ""; // 클라이언트사이드에서는 상대 URL 사용

  return `${baseUrl}${path}`;
}

// Type definitions

// Auth API 호출 함수
async function callAuthAPI(endpoint: string, data: any): Promise<AuthResponse> {
  const url = constructUrl(`/server/auth/${endpoint}`);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/hal+json; q=0.9, application/json; q=0.8",
    },
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

// 프로필 포스트 조회
export async function fetchProfilePosts(
  userId: string,
  options: {
    profileFilter?: "posts" | "likes";
    size?: number;
    cursor?: string;
    page?: number;
  } = {}
): Promise<ProfilePostsDataResponse> {
  const { profileFilter = "posts", size = 10, cursor, page } = options;

  const params = new URLSearchParams({
    profile_filter: profileFilter,
    size: size.toString(),
    user_id: userId,
  });

  if (cursor) params.set("cursor", cursor);
  if (page) params.set("page", page.toString());

  const url = constructUrl(`/server/posts?${params.toString()}`);
  console.log("URL:", url);

  // ISR 캐시 설정
  const isServerSide = typeof window === "undefined";
  const fetchOptions: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  // 서버사이드에서만 캐시 설정 적용
  if (isServerSide) {
    fetchOptions.next = {
      revalidate: 3600, // 1시간
      tags: [`profile-${userId}`, `${profileFilter}-${userId}`, "posts"],
    };
  } else {
    // 클라이언트사이드에서는 캐시 비활성화
    fetchOptions.cache = "no-store";
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error("프로필 데이터를 가져오는데 실패했습니다");
  }

  return response.json() as Promise<ProfilePostsDataResponse>;
}

// 프로필 정보 조회
export const fetchProfile = async (accountId: string, accessToken: string) => {
  const url = constructUrl(`/server/profiles/${accountId}`);
  console.log(url);

  const headers: HeadersInit = {
    Accept: "application/hal+json; q=0.9, application/json; q=0.8",
    Authorization: `Bearer ${accessToken}`,
  };

  // ISR 캐시 설정
  const isServerSide = typeof window === "undefined";
  const fetchOptions: RequestInit = {
    method: "GET",
    headers,
  };

  if (isServerSide) {
    fetchOptions.next = {
      revalidate: 3600, // 1시간
      tags: [`profile-${accountId}`, "profiles"],
    };
  }

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json() as Promise<ProfileDataResponse>;
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
  const url = constructUrl("/server/accounts");

  const response = await fetch(url, {
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
  const url = constructUrl("/server/accounts/reset-password");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
export async function deleteAccount(accessToken: string) {
  const url = constructUrl("/server/accounts/me");

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "application/hal+json; q=0.9, application/json; q=0.8",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Account deletion failed");
  }

  return response.json() as Promise<DeleteAccountResponse>;
}

// ISR 재검증 트리거 함수
export async function triggerRevalidation(options: {
  userId?: string;
  path?: string;
  tag?: string;
}) {
  const { userId, path, tag } = options;

  try {
    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify({ userId, path, tag }),
    });

    if (!response.ok) {
      throw new Error("Failed to trigger revalidation");
    }

    const result = await response.json();
    console.log("[ISR] Revalidation triggered:", result);
    return result;
  } catch (error) {
    console.error("[ISR] Failed to trigger revalidation:", error);
    throw error;
  }
}
