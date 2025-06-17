import { CategoriesResponse, Post, PostData } from "@/utils/types/posts";

// posts 데이터를 UI Post 타입으로 변환하는 함수
function convertApiMemeToPost(row: any): Post {
  return {
    id: row.id?.toString() || Date.now().toString(),
    title: row.title,
    content: row.content,
    category_id: row.category_id,
    media_url: row.media_url,
    media_upload_time: row.media_upload_time,
    account_id: row.user_id,
    created_at: row.created_at,
    updated_at: row.updated_at,
    is_deleted: false,

    // UI를 위한 추가 정보
    author: {
      account_id: row.user_id,
      account_name: `User ${row.user_id}`,
      profile_image: "/placeholder.svg",
    },
    likes: row.like_count || 0,
    comment_count: row.comment_count || 0,
    is_liked: row.is_liked || false,
  };
}

// SSR용 posts 데이터 가져오기 함수
export async function getPosts(params: {
  category?: string;
  keyword?: string;
  page?: number;
  profileFilter?: "post" | "like";
  size?: number;
}): Promise<{ posts: Post[]; hasNextPage: boolean; total: number }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const url = new URL(`${baseUrl}/server/posts`);

    url.searchParams.set("page", String(params.page || 1));
    url.searchParams.set("size", String(params.size || 12));

    if (params.category) {
      url.searchParams.set("category_id", params.category);
    }

    if (params.keyword) {
      url.searchParams.set("keyword", params.keyword);
    }

    const response = await fetch(url.toString(), {
      cache: "no-store", // 항상 최신 데이터
    });

    if (!response.ok) {
      console.error("Posts 조회 실패:", response.status);
      return {
        posts: [],
        hasNextPage: false,
        total: 0,
      };
    }

    const json = await response.json();

    const posts: Post[] = json.data.memes.map(convertApiMemeToPost);

    return {
      posts,
      hasNextPage: json.data.pageInfo.page < json.data.pageInfo.totalPages,
      total: json.data.pageInfo.totalElements,
    };
  } catch (error) {
    console.error("Posts 조회 중 오류:", error);
    return {
      posts: [],
      hasNextPage: false,
      total: 0,
    };
  }
}

// 카테고리 데이터 가져오기 함수
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    // Check if running on client or server
    const isClient = typeof window !== "undefined";
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

    // Use different endpoints for client and server
    const apiUrl = isClient
      ? `/server/categories` // Client-side endpoint
      : `${baseUrl}/api/categories`; // Server-side endpoint
    console.log(apiUrl);
    const response = await fetch(apiUrl, {
      method: "GET",
      cache: "force-cache", // SSR 캐싱
    });
    console.log(response);

    if (response.status !== 200) {
      console.error("카테고리 조회 실패:", response.status);
      return {
        message: "카테고리 조회 실패",
        data: [],
      };
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("카테고리 조회 중 오류:", error);
    return {
      message: "카테고리 조회 중 오류",
      data: [],
    };
  }
}

export interface CreatePostResponse {
  message: string;
  data: {
    title: string;
    content: string;
    media_url: string;
    media_upload_time: string;
    category_type: string;
    tags: string[];
    created_at: string;
  };
}

export async function createPost(postData: PostData): Promise<CreatePostResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("로그인이 필요합니다.");
    }

    const response = await fetch(`${baseUrl}/server/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: postData.title,
        content: postData.content,
        media_url: postData.media_url,
        media_upload_time: postData.media_upload_time,
        category_name: postData.category_name,
        tags: postData.tags,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "밈 생성에 실패했습니다.");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}
