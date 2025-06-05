"use client";

import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
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
  onLike,
  onComment,
  onView,
}: PostsGridProps) {
  const isControlled = controlledPosts !== undefined;

  // 비제어 모드에서만 무한스크롤 사용
  const infiniteQuery = useInfiniteMemes({
    category,
    userId,
    profileFilter,
    size: 12,
    enabled: !isControlled,
  });

  const {
    data: infiniteData,
    isLoading: infiniteLoading,
    isFetchingNextPage,
    hasNextPage,
    target,
  } = infiniteQuery;

  // 최종 게시물 데이터 결정
  const posts = useMemo(() => {
    if (isControlled) {
      return controlledPosts || [];
    }
    return infiniteData?.pages.flatMap((page) => page.items) ?? [];
  }, [isControlled, controlledPosts, infiniteData]);

  const isLoading = isControlled ? controlledLoading : infiniteLoading && !infiniteData;

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
      {/* 게시물 그리드 */}
      <motion.div
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="show"
        className={`grid ${getGridCols()} gap-6`}
      >
        {posts.map((post) => (
          <motion.div key={post.id} variants={ANIMATION_VARIANTS.item}>
            <PostCard
              post={post}
              enableHoverPlay={enableHoverPlay}
              feedMode={feedMode}
              showAuthor={showAuthor}
              showActions={showActions}
              onLike={handleLike}
              onComment={handleComment}
              onView={handleView}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* 비제어 모드에서만 무한스크롤 표시 */}
      {!isControlled && (
        <>
          <InfiniteScrollTrigger
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            target={target}
          />

          {/* 모든 게시물 로드 완료 메시지 */}
          {!hasNextPage && posts.length > 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">모든 게시물을 확인했습니다 🎉</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
