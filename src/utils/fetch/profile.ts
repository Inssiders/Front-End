import { type ApiMeme, type Post } from "../types/posts";
import {
  type ProfilePostsResponse as ProfilePostsDataResponse,
  type ProfileResponse,
  type ProfileUpdateRequest,
} from "../types/profile";
import { apiFetch, ApiFetchOptions } from "./auth";

// Helper function to construct URL based on environment
function constructUrl(path: string): string {
  const baseUrl = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
  if (!baseUrl) {
    throw new Error("SERVER_URL is not configured");
  }
  return `${baseUrl}${path}`;
}

// Utility function to transform meme data to post format
export function transformMemeToPost(meme: ApiMeme, id?: number | string): Post {
  const memeId =
    id?.toString() || meme.id?.toString() || Date.now().toString() + Math.random().toString(36).substr(2, 9);
  const writerId = meme.writer?.id?.toString() || "0";
  const categoryId = (
    typeof meme.category_type === "string" ? parseInt(meme.category_type, 10) || 0 : meme.category_type || 0
  ).toString();

  return {
    id: memeId,
    title: meme.title,
    content: meme.content || "",
    category_id: categoryId,
    media_url: meme.media_url,
    media_upload_time: meme.media_upload_time,
    account_id: writerId,
    created_at: meme.created_at,
    updated_at: meme.updated_at || meme.created_at,
    is_deleted: false,
    author: {
      account_id: writerId,
      account_name: meme.writer?.nickname || `User ${writerId}`,
      profile_image: meme.writer?.profile_url || "/placeholder.svg",
    },
    likes: meme.like_count || 0,
    comment_count: meme.comment_count || 0,
    is_liked: meme.is_liked || false,
  };
}

interface FetchProfilePostsParams {
  profileFilter?: "post" | "like";
  size?: number;
  cursor?: string;
  keyword?: string;
  categoryId?: number;
  initialData?: ProfilePostsDataResponse;
}

// 프로필 포스트 조회
export async function fetchProfilePosts(
  userId: string,
  { profileFilter = "post", size = 20, cursor, keyword, categoryId, initialData }: FetchProfilePostsParams = {}
): Promise<ProfilePostsDataResponse> {
  if (!cursor && initialData) {
    return initialData;
  }

  const params = new URLSearchParams();
  if (size) params.append("size", size.toString());
  if (cursor) params.append("cursor", cursor);
  if (keyword) params.append("keyword", keyword);
  if (categoryId) params.append("categoryId", categoryId.toString());

  const endpoint = `/profiles/${userId}/${profileFilter === "like" ? "likes" : "posts"}${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const response = await apiFetch(endpoint);
  return response.json();
}

// 프로필 정보 조회 (오버로드)
export async function fetchProfile(accountId: string, options: ApiFetchOptions = {}): Promise<ProfileResponse> {
  const response = await apiFetch(`/profiles/${accountId}`, {
    method: "GET",
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.message || "프로필 조회에 실패했습니다.");
  }

  return response.json();
}

// 프로필 수정
export async function updateProfile(
  updateData: ProfileUpdateRequest,
  options: ApiFetchOptions = {}
): Promise<ProfileResponse> {
  const response = await apiFetch("/profiles/me", {
    method: "PATCH",
    body: JSON.stringify(updateData),
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || error.message || "프로필 수정에 실패했습니다.");
  }

  return response.json();
}

// ISR 재검증 트리거 함수
export async function triggerRevalidation(options: { userId?: string; path?: string; tag?: string }) {
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
