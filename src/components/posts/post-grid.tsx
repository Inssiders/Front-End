"use client";

import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import { PAGE_SIZE } from "@/utils/constant";
import { PostsGridProps } from "@/utils/types/posts";
import { motion } from "framer-motion";
import { useMemo } from "react";
import EmptyState from "./components/EmptyState";
import InfiniteScrollTrigger from "./components/InfiniteScrollTrigger";
import PostCard from "./components/PostCard";
import { ANIMATION_VARIANTS, DEFAULT_GRID_COLS, GRID_COLUMNS } from "./constants";

export default function PostsGrid({
  posts: controlledPosts,
  loading: controlledLoading = false,
  hasNextPage: controlledHasNextPage,
  category,
  userId,
  profileFilter,
  layout = "grid",
  columns = 4,
  showAuthor = true,
  showActions = true,
  enableHoverPlay = true,
  feedMode = false,
  className = "",
  disableAnimation = false,
  onLike,
  onComment,
  onView,
}: PostsGridProps) {
  const isControlled = controlledPosts !== undefined;

  // 제어 모드에서는 초기 데이터가 있는지 확인
  const hasInitialData = isControlled && controlledPosts && controlledPosts.length > 0;

  // 무한스크롤 활성화 조건: 비제어 모드이거나, 초기 데이터가 있거나, 제어 모드에서 hasNextPage가 true인 경우
  const shouldEnableInfiniteScroll =
    !isControlled || hasInitialData || (isControlled && controlledHasNextPage);

  const infiniteQuery = useInfiniteMemes({
    category,
    userId,
    profileFilter,
    size: PAGE_SIZE.POSTS,
    enabled: shouldEnableInfiniteScroll,
    initialData: hasInitialData ? controlledPosts : undefined, // 초기 데이터 전달
  });

  const {
    data: infiniteData,
    isLoading: infiniteLoading,
    isFetchingNextPage,
    hasNextPage: infiniteHasNextPage,
    target,
    isLoadingNext, // 추가된 로딩 상태
  } = infiniteQuery;

  // 최종 hasNextPage 결정 (제어 모드에서는 controlledHasNextPage 사용)
  const hasNextPage =
    isControlled && !hasInitialData
      ? (controlledHasNextPage ?? false)
      : (infiniteHasNextPage ?? false);

  // 최종 게시물 데이터 결정 - 스크롤 자연스럽게 밀리도록 최적화
  const posts = useMemo(() => {
    if (isControlled && !hasInitialData) {
      // 제어 모드이지만 초기 데이터가 없는 경우
      return controlledPosts || [];
    }

    // 무한스크롤 데이터 사용 (초기 데이터 포함)
    const allPosts = infiniteData?.pages.flatMap((page) => page.items) ?? [];
    console.log(
      `📄 게시물 데이터 업데이트: ${allPosts.length}개 (페이지 수: ${infiniteData?.pages.length || 0})`
    );

    return allPosts;
  }, [isControlled, hasInitialData, controlledPosts, infiniteData]);

  // 캐시된 데이터가 있으면 로딩으로 간주하지 않음
  const isLoading =
    isControlled && !hasInitialData ? controlledLoading : infiniteLoading && !posts.length;

  // 이벤트 핸들러
  const handleLike = (id: number | string) => {
    if (onLike) {
      onLike(id);
    }
  };

  const handleComment = (id: number | string) => {
    if (onComment) {
      onComment(id);
    }
  };

  const handleView = (id: number | string) => {
    if (onView) {
      onView(id);
    }
  };

  // 그리드 열 계산
  const getGridCols = () => {
    if (feedMode) return "grid-cols-1";
    return GRID_COLUMNS[columns] || DEFAULT_GRID_COLS;
  };

  if (isLoading && posts.length === 0) {
    return <EmptyState isLoading={true} />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyState isLoading={false} />;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* 자연스러운 무한스크롤을 위한 단순화된 그리드 */}
      {disableAnimation ? (
        // 애니메이션 비활성화 시 일반 div 사용 (캐시된 컨텐츠)
        <div className={`grid ${getGridCols()} gap-6`}>
          {posts.map((post, index) => (
            <div key={`${post.id}-${index}`} className="">
              {/* 자연스러운 스크롤을 위한 안정적인 키 */}
              <PostCard
                post={post}
                enableHoverPlay={enableHoverPlay}
                feedMode={feedMode}
                showAuthor={showAuthor}
                showActions={showActions}
                disableAnimation={disableAnimation}
                onLike={handleLike}
                onComment={handleComment}
                onView={handleView}
              />
            </div>
          ))}
        </div>
      ) : (
        // 애니메이션 활성화 시에도 자연스러운 스크롤 우선
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="show"
          className={`grid ${getGridCols()} gap-6`}
        >
          {posts.map((post, index) => (
            <motion.div
              key={`${post.id}-${index}`} // 자연스러운 스크롤을 위한 안정적인 키
              variants={ANIMATION_VARIANTS.item}
              className="" // will-change 제거로 스크롤 최적화
              // layout 속성 제거 - 스크롤 방해 요소
            >
              <PostCard
                post={post}
                enableHoverPlay={enableHoverPlay}
                feedMode={feedMode}
                showAuthor={showAuthor}
                showActions={showActions}
                disableAnimation={disableAnimation}
                onLike={handleLike}
                onComment={handleComment}
                onView={handleView}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 무한스크롤 표시 */}
      {shouldEnableInfiniteScroll && (
        <>
          {hasNextPage || isFetchingNextPage || isLoadingNext ? (
            <InfiniteScrollTrigger
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage || isLoadingNext} // 통합된 로딩 상태
              target={target}
            />
          ) : (
            /* 인스타그램 스타일: 간단한 완료 표시 */
            posts.length > 0 && (
              <div className="py-8 text-center">
                <div className="text-xs text-gray-400 dark:text-gray-500">•••</div>
              </div>
            )
          )}
        </>
      )}
    </div>
  );
}
