import PostsPageClient from "@/components/posts/posts-page-client";
import { Category, CATEGORY_LABELS, CategoryType } from "@/types/posts";
import { PAGE_SIZE } from "@/utils/constant";
import { getCategories, getPosts } from "@/utils/fetch/posts";
import { Suspense } from "react";

interface PostsPageProps {
  searchParams: { category_id?: string; keyword?: string; page?: string };
}

// ISR 설정: 5분마다 재생성
export const revalidate = 300; // 5분 (300초)

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const { category_id, page = "1" } = await searchParams;

  try {
    const [categoriesResponse, initialPostsResponse] = await Promise.all([
      getCategories(),
      getPosts({
        category_id,
        size: PAGE_SIZE.POSTS,
        page: parseInt(page),
      }),
    ]);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PostsPageClient
          initialPostsResponse={initialPostsResponse}
          categories={categoriesResponse.data as CategoryType[]}
          selectedCategoryId={category_id}
          currentPage={parseInt(page)}
        />
      </Suspense>
    );
  } catch (error) {
    console.error("Posts 페이지 로딩 에러:", error);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">페이지를 불러오는데 실패했습니다</h1>
          <p className="text-gray-600">잠시 후 다시 시도해주세요.</p>
        </div>
      </div>
    );
  }
}

export async function generateMetadata({ searchParams }: { searchParams: { category_id?: string } }) {
  const { category_id } = await searchParams;

  const categoryKey = category_id
    ? (Object.keys(CATEGORY_LABELS) as CategoryType[]).find((key) => (Category as any)[key].toString() === category_id)
    : undefined;

  const categoryLabel = categoryKey ? CATEGORY_LABELS[categoryKey] : undefined;

  return {
    title: categoryLabel ? `${categoryLabel} 카테고리 | 인싸이더` : "트렌드 포스트 | 인싸이더",
    description: categoryLabel
      ? `${categoryLabel} 카테고리의 최신 밈과 트렌드를 확인해보세요.`
      : "인싸이더에서 가장 핫한 밈과 트렌드를 실시간으로 확인해보세요.",
  };
}
