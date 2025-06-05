import { type ApiMeme, type Post } from "../types/posts";
import {
  type ProfileResponse as ProfileDataResponse,
  type ProfilePostsResponse as ProfilePostsDataResponse,
} from "../types/profile";
import { apiFetch } from "./auth";

// Helper function to construct URL based on environment
function constructUrl(path: string): string {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.SERVER_URL || "http://localhost:3000" // 서버사이드에서는 절대 URL 필요
      : ""; // 클라이언트사이드에서는 상대 URL 사용

  return `${baseUrl}${path}`;
}

// Utility function to transform meme data to post format
export function transformMemeToPost(meme: ApiMeme, id?: number | string): Post {
  return {
    id: id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
    title: meme.title,
    content: meme.content,
    category_id: meme.category_id,
    media_url: meme.media_url,
    media_upload_time: meme.media_upload_time,
    account_id: meme.user_id,
    created_at: meme.created_at,
    updated_at: meme.updated_at,
    is_deleted: false,

    // UI를 위한 추가 정보 - 실제 API에서 제공되면 매핑, 아니면 기본값
    author: {
      account_id: meme.user_id,
      account_name: `User ${meme.user_id}`, // API에 실제 이름 필드가 있으면 해당 필드 사용
      profile_image: "/placeholder.svg", // API에 실제 프로필 이미지 필드가 있으면 해당 필드 사용
    },
    likes: 0, // API에서 제공되는 좋아요 수가 있으면 해당 필드 사용
    comment_count: 0, // API에서 제공되는 댓글 수가 있으면 해당 필드 사용
    is_liked: false, // API에서 제공되는 좋아요 상태가 있으면 해당 필드 사용
  };
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
      tags: [`profile-${userId}`, `${profileFilter}-${userId}`, "posts"],
    };
  } else {
    // 클라이언트사이드에서는 캐시 비활성화
    fetchOptions.cache = "no-store";
  }

  const response = await apiFetch(`posts?${params.toString()}`, fetchOptions);

  if (!response.ok) {
    throw new Error("프로필 데이터를 가져오는데 실패했습니다");
  }

  return response.json() as Promise<ProfilePostsDataResponse>;
}

// 프로필 정보 조회 (오버로드)
export async function fetchProfile(accountId: string): Promise<ProfileDataResponse>;
export async function fetchProfile(
  accountId: string,
  accessToken: string
): Promise<ProfileDataResponse>;
export async function fetchProfile(
  accountId: string,
  accessToken?: string
): Promise<ProfileDataResponse> {
  // 기존 방식 지원 (accessToken 파라미터가 있는 경우)
  if (accessToken) {
    const url = constructUrl(`/server/profiles/${accountId}`);

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
  }

  // 새로운 쿠키 기반 방식
  const isServerSide = typeof window === "undefined";
  const fetchOptions: RequestInit = {
    method: "GET",
    headers: {
      Accept: "application/hal+json; q=0.9, application/json; q=0.8",
    },
  };

  if (isServerSide) {
    fetchOptions.next = {
      revalidate: 3600, // 1시간
      tags: [`profile-${accountId}`, "profiles"],
    };
  }

  const response = await apiFetch(`/profiles/${accountId}`, fetchOptions);

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json() as Promise<ProfileDataResponse>;
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
    return result;
  } catch (error) {
    console.error("[ISR] Failed to trigger revalidation:", error);
    throw error;
  }
}
