import {
  type Post,
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
export function transformMemeToPost(meme: any, prefix: string = ""): Post {
  // 🚨 디버깅: 원본 데이터 확인

  // media_url이 YouTube URL인지 확인
  const isYouTubeUrl =
    meme.media_url &&
    (meme.media_url.includes("youtube.com") ||
      meme.media_url.includes("youtu.be"));

  return {
    id: `${prefix}${meme.id}`,
    title: meme.title,
    category: `카테고리 ${meme.category_id}`,
    // YouTube URL이면 image는 undefined, 아니면 media_url 사용
    image: !isYouTubeUrl ? meme.media_url : undefined,
    // YouTube URL이면 youtubeUrl로 설정
    youtubeUrl: isYouTubeUrl ? meme.media_url : undefined,
    post_media_url: meme.media_url,
    media_url: meme.media_url,
    type: "video",
    author: {
      name: meme.user?.nickname || "익명",
      avatar:
        meme.user?.profileUrl ||
        "/placeholder.svg?height=40&width=40&text=" +
          (meme.user?.nickname?.[0] || "U"),
    },
    likes: meme.like_count || 0,
    comments: meme.comment_count || 0,
    shares: 0,
    views: 0,
    isLiked: meme.is_liked || false,
    isBookmarked: false,
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
export async function fetchProfile(
  accountId: string
): Promise<ProfileDataResponse>;
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
