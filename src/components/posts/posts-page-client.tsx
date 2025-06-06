"use client";

import PostCategories from "@/components/posts/post-categories";
import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import { useBfCacheOptimization, usePageCache } from "@/hooks/use-page-cache";
import { useEffect, useState } from "react";
import styles from "./posts-page-client.module.css";

interface PostsPageClientProps {
  categories: any;
  category?: string;
  initialPosts?: any[];
  hasNextPage?: boolean;
}

export default function PostsPageClient({ categories, category, initialPosts, hasNextPage }: PostsPageClientProps) {
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
      {/* 헤더 영역 - 고정 없음 */}
      <header className={styles.header}>
        <PostsHeader />
      </header>
      <PostCategories categories={categories} />

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
                  category={category}
                  columns={4}
                  layout="grid"
                  showAuthor={true}
                  showActions={true}
                  enableHoverPlay={true}
                  className=""
                  disableAnimation={isFromCache}
                  posts={initialPosts}
                  loading={false}
                  hasNextPage={hasNextPage}
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
