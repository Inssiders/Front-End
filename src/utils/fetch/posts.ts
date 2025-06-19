import { ApiResponse, CategoriesResponse, PostData, PostsQueryParams, PostsResponse } from "@/types/posts";

// 게시물 목록 가져오기
export async function getPosts({
  last_id,
  size = 12,
  page = 1,
  keyword,
  category_id,
  profile_filter,
}: PostsQueryParams = {}): Promise<ApiResponse<PostsResponse>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "http://localhost:3000";
    var url;
    if (typeof window === "undefined") {
      url = `${baseUrl}/api/posts`;
    } else {
      url = "/server/posts";
    }

    // 쿼리 파라미터 추가
    const params = new URLSearchParams();
    if (last_id) params.append("last_id", last_id.toString());
    if (size) params.append("size", size.toString());
    if (page) params.append("page", page.toString());
    if (keyword) params.append("keyword", keyword);
    if (category_id) params.append("category_id", category_id);
    if (profile_filter) params.append("profile_filter", profile_filter);

    url += `?${params.toString()}`;

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store", // 실시간 데이터를 위해 캐시 비활성화
    });

    if (!response.ok) {
      throw new Error(`게시물 조회 실패: ${response.status}`);
    }

    const data: ApiResponse<PostsResponse> = await response.json();
    return data;
  } catch (error) {
    console.error("게시물 조회 중 오류 발생:", error);
    throw error;
  }
}

// 카테고리 목록 가져오기
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "http://localhost:3000";
    var url;

    if (typeof window === "undefined") {
      url = `${baseUrl}/api/categories`;
    } else {
      // Client: 프록시를 통한 호출
      url = "/server/categories";
    }

    const response = await fetch(url, {
      method: "GET",
      cache: "force-cache", // SSR 캐싱
    });

    if (!response.ok) {
      throw new Error(`카테고리 조회 실패: ${response.status}`);
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("카테고리 조회 중 오류 발생:", error);
    throw error;
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
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "http://localhost:3000";
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
