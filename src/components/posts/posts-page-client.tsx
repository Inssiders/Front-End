"use client";

import PostCategories from "@/components/posts/post-categories";
import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import { useBfCacheOptimization, usePageCache } from "@/hooks/use-page-cache";
import { useEffect, useState } from "react";

interface PostsPageClientProps {
  categories: any;
  category?: string;
  initialPosts?: any[];
  hasNextPage?: boolean;
}

export default function PostsPageClient({
  categories,
  category,
  initialPosts,
  hasNextPage,
}: PostsPageClientProps) {
  // 페이지 캐시 및 뒤로가기 최적화 적용
  usePageCache();
  useBfCacheOptimization();

  const [isFromCache, setIsFromCache] = useState(false);

  useEffect(() => {
    // 첫 로드 시에는 애니메이션 비활성화 (캐시된 데이터 즉시 표시)
    setIsFromCache(true);

    // 짧은 시간 후 애니메이션 재활성화
    const timer = setTimeout(() => {
      setIsFromCache(false);
    }, 50); // 50ms로 줄여서 더 빠르게

    return () => clearTimeout(timer);
  }, [category]); // category가 변경될 때마다 실행

  return (
    <>
      {/* 고정 헤더 영역 */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <PostsHeader />
        <PostCategories categories={categories} />
      </header>

      {/* 메인 콘텐츠 영역 - 자연스러운 무한스크롤을 위한 최적화된 레이아웃 */}
      <main className="bg-white" style={{ minHeight: "calc(100vh - 90px)" }}>
        {/* Footer 높이(90px) 고려한 최소 높이 설정 */}
        <div className="container mx-auto px-4 py-8">
          {/* 배경 장식 요소들 */}
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-sm pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-sm pointer-events-none" />
          </div>

          {/* 게시물 그리드 - 스크롤이 자연스럽게 밀리도록 단순화된 구조 */}
          <div className="relative z-10">
            <PostsGrid
              category={category}
              columns={4}
              layout="grid"
              showAuthor={true}
              showActions={true}
              enableHoverPlay={true}
              className=""
              disableAnimation={isFromCache} // 캐시에서 복원시 애니메이션 비활성화
              posts={initialPosts} // SSR 초기 데이터
              loading={false}
              hasNextPage={hasNextPage} // hasNextPage 정보 전달
            />
          </div>
        </div>
      </main>

      {/* 플로팅 액션 버튼 - Footer 위에 위치하도록 조정 */}
      <div className="fixed bottom-24 right-6 z-50 md:hidden">
        <button className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
