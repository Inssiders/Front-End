import { getPosts } from "@/utils/fetch/posts";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import로 SearchContainer 최적화
const SearchContainer = dynamic(() => import("@/components/search/search-container"), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Search header skeleton */}
        <div className="text-center space-y-4">
          <div className="h-12 bg-gray-200 animate-pulse rounded-lg max-w-md mx-auto" />
          <div className="h-6 bg-gray-200 animate-pulse rounded max-w-xs mx-auto" />
        </div>

        {/* Search stats skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
          <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
        </div>

        {/* Search results skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  ),
});

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

// ISR 설정: 10분마다 재생성 (검색 결과는 자주 변경될 수 있음)
export const revalidate = 600; // 10분 (600초)

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim() || "";
  const page = parseInt(resolvedSearchParams.page || "1");

  let initialData: {
    posts: any[];
    loading: boolean;
    hasNextPage: boolean;
    totalResults: number;
  } = {
    posts: [],
    loading: false,
    hasNextPage: false,
    totalResults: 0,
  };

  // 검색어가 있을 때만 초기 데이터 로드
  if (query) {
    try {
      const response = await getPosts({
        keyword: query,
        page: page,
        size: 20,
      });

      initialData = {
        posts: response.posts || [],
        loading: false,
        hasNextPage: response.hasNextPage || false,
        totalResults: response.total || 0,
      };
    } catch (error) {
      console.error("Search 페이지 초기 로딩 에러:", error);
      // 에러 시 빈 결과로 폴백
    }
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 p-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <div className="h-12 bg-gray-200 animate-pulse rounded-lg max-w-md mx-auto" />
              <div className="h-6 bg-gray-200 animate-pulse rounded max-w-xs mx-auto" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
              <div className="h-6 w-24 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchContainer
        query={query}
        initialPosts={initialData.posts}
        initialLoading={initialData.loading}
        initialHasNextPage={initialData.hasNextPage}
        initialTotalResults={initialData.totalResults}
      />
    </Suspense>
  );
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.trim() || "";

  if (query) {
    return {
      title: `"${query}" 검색 결과 | 인싸이더`,
      description: `인싸이더에서 "${query}"에 대한 검색 결과를 확인해보세요. 최신 밈과 트렌드를 찾아보세요.`,
    };
  }

  return {
    title: "검색 | 인싸이더",
    description: "인싸이더에서 원하는 밈과 트렌드를 검색해보세요. 실시간 인기 콘텐츠를 확인하세요.",
  };
}
