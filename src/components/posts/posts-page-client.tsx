"use client";

import PostCategories from "@/components/posts/post-categories";
import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import { useBfCacheOptimization, usePageCache } from "@/hooks/use-page-cache";
import {
  ApiResponse,
  CATEGORY_IDS,
  CATEGORY_LABELS,
  CategoryData,
  CategoryType,
  Post,
  PostsResponse,
} from "@/types/posts";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./posts-page-client.module.css";

export interface PostsPageClientProps {
  initialPostsResponse: ApiResponse<PostsResponse>;
  categories: CategoryType[];
  selectedCategoryId?: string;
  keyword?: string;
  currentPage: number;
}

export default function PostsPageClient({
  initialPostsResponse,
  categories,
  selectedCategoryId,
  keyword,
  currentPage,
}: PostsPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>(initialPostsResponse.data.content);
  const [loading, setLoading] = useState(false);

  // Transform categories to CategoryData format
  const categoryData: CategoryData[] = categories.map((category) => ({
    id: CATEGORY_IDS[category],
    type: category,
    name: CATEGORY_LABELS[category],
  }));

  // 페이지 캐시 및 뒤로가기 최적화 적용
  usePageCache();
  useBfCacheOptimization();

  // 카테고리 변경 시 초기 데이터 업데이트
  useEffect(() => {
    if (initialPostsResponse?.data?.content) {
      setPosts(initialPostsResponse.data.content);
    }
  }, [initialPostsResponse, selectedCategoryId]);

  useEffect(() => {
    // URL 변경 시 애니메이션 효과를 위해 로딩 상태 잠시 유지
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [selectedCategoryId]); // selectedCategoryId가 변경될 때마다 실행

  // 카테고리 변경 핸들러
  const handleCategoryChange = (category?: CategoryType) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category) {
      const categoryId = CATEGORY_IDS[category];
      params.set("category_id", categoryId.toString());
    } else {
      params.delete("category_id");
    }

    // 페이지 초기화
    params.set("page", "1");

    // 라우터 옵션을 통해 스크롤 위치 유지
    router.push(`/posts?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {/* 헤더 영역 - 고정 없음 */}
      <header className={styles.header}>
        <PostsHeader />
      </header>
      <PostCategories categories={categoryData} id={selectedCategoryId} />

      {/* 메인 콘텐츠 영역 - Gen-Z 감성의 다이나믹 레이아웃 */}
      <main className={styles.mainContainer}>
        {/* Animated Background */}
        <div className={styles.animatedBackground}>
          {/* Base gradient */}
          <div className={styles.baseGradient} />

          {/* Floating orbs with CSS animations */}
          <div className={styles.floatingOrb1} />
          <div className={styles.floatingOrb2} />
          <div className={styles.floatingOrb3} />
          <div className={styles.floatingOrb4} />
        </div>

        {/* Clean & Modern Content Area */}
        <div className={styles.contentArea}>
          <div className={styles.contentContainer}>
            {/* Minimal Glass Container */}
            <div className={styles.glassContainer}>
              {/* Simple Top Accent */}
              <div className={styles.topAccent} />

              {/* Clean Content Area */}
              <div className={styles.contentWrapper}>
                <PostsGrid
                  posts={posts}
                  loading={loading}
                  className="min-h-[50vh]"
                  category={selectedCategoryId}
                  key={selectedCategoryId} // 카테고리 변경 시 컴포넌트 리마운트
                />
              </div>
            </div>
          </div>
        </div>

        {/* Additional floating particles */}
        <div className={styles.floatingParticle1} />
        <div className={styles.floatingParticle2} />
        <div className={styles.floatingParticle3} />
      </main>

      {/* 플로팅 액션 버튼 - Footer 위에 위치하도록 조정 */}
      <div className={styles.floatingButton}>
        <button className={styles.floatingButtonInner}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </>
  );
}
