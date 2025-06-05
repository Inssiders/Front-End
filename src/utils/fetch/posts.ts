import { CategoriesResponse } from "@/utils/types/posts";

// 카테고리 데이터 가져오기 함수
export async function getCategories(): Promise<CategoriesResponse> {
  try {
    // SSR 환경에서는 절대 URL이 필요
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/server/categories`;

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
