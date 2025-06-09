import { PAGE_SIZE } from "@/utils/constant";
import { getCategories, getPosts } from "@/utils/fetch/posts";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import로 PostsPageClient 최적화
const PostsPageClient = dynamic(() => import("@/components/posts/posts-page-client"), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="h-12 bg-gray-200 animate-pulse rounded-lg" />

        {/* Category filter skeleton */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 w-20 bg-gray-200 animate-pulse rounded-full flex-shrink-0" />
          ))}
        </div>

        {/* Posts grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  ),
});

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

// ISR 설정: 5분마다 재생성
export const revalidate = 300; // 5분 (300초)

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  try {
    // ISR로 카테고리와 첫 페이지 posts 데이터 가져오기
    const [categories, initialPosts] = await Promise.all([
      getCategories(),
      getPosts({ category, page: 1, size: PAGE_SIZE.POSTS }),
    ]);

    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 p-4">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="h-12 bg-gray-200 animate-pulse rounded-lg" />
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-gray-200 animate-pulse rounded-full flex-shrink-0" />
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
                ))}
              </div>
            </div>
          </div>
        }
      >
        <PostsPageClient
          categories={categories.data.categories}
          category={category}
          initialPosts={initialPosts.posts}
          hasNextPage={initialPosts.hasNextPage}
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

export async function generateMetadata({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  return {
    title: category ? `${category} 카테고리 | 인싸이더` : "트렌드 포스트 | 인싸이더",
    description: category
      ? `${category} 카테고리의 최신 밈과 트렌드를 확인해보세요.`
      : "인싸이더에서 가장 핫한 밈과 트렌드를 실시간으로 확인해보세요.",
  };
}
