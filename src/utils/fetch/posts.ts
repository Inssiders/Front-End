import { CategoriesResponse, Post } from "@/utils/types/posts";

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
  cursor?: number;
  size?: number;
}): Promise<{ posts: Post[]; hasNextPage: boolean; total: number; nextCursor: number | null }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://52.78.186.60";
    const url = new URL(`${baseUrl}/api/posts`);

    url.searchParams.set("size", String(params.size || 12));
    if (params.cursor) {
      url.searchParams.set("cursor", String(params.cursor));
    }
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
        nextCursor: null,
      };
    }

    const json = await response.json();

    const posts: Post[] = json.data.content.map(convertApiMemeToPost);
    console.log("Posts:", posts);
    return {
      posts,
      hasNextPage: Boolean(json.data.next_cursor), // next_cursor가 있으면 true
      total: json.data.totalElements,
      nextCursor: json.data.next_cursor ?? null,
    };
  } catch (error) {
    console.error("Posts 조회 중 오류:", error);
    return {
      posts: [],
      hasNextPage: false,
      total: 0,
      nextCursor: null,
    };
  }
}

// 카테고리 데이터 가져오기 함수
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    // SSR 환경에서는 절대 URL이 필요
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://52.78.186.60";
    const apiUrl = `${baseUrl}/api/categories`;

    const response = await fetch(apiUrl, {
      cache: "force-cache", // SSR 캐싱
    });

    if (!response.ok) {
      console.error("카테고리 조회 실패:", response.status);
      return {
        message: "카테고리 조회 실패",
        data: {
          categories: [],
        },
      };
    }

    const data: CategoriesResponse = await response.json();
    return data;
  } catch (error) {
    console.error("카테고리 조회 중 오류:", error);
    return {
      message: "카테고리 조회 중 오류",
      data: {
        categories: [],
      },
    };
  }
}
