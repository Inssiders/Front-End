"use client";

import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import { Post, PostsGridProps } from "@/types/posts";
import { PAGE_SIZE } from "@/utils/constant";
import { motion } from "framer-motion";
import { RefObject, useMemo } from "react";
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
  searchQuery,
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
  const hasInitialData = isControlled && controlledPosts && controlledPosts.length > 0;

  // 무한스크롤 쿼리 설정
  const infiniteQuery = useInfiniteMemes({
    category_id: category,
    userId,
    profileFilter,
    searchQuery,
    size: PAGE_SIZE.POSTS,
    enabled: !isControlled || hasInitialData,
    initialData: hasInitialData ? controlledPosts : undefined,
  });

  const {
    data: infiniteData,
    isLoading: infiniteLoading,
    isFetchingNextPage,
    hasNextPage: infiniteHasNextPage,
    target,
  } = infiniteQuery;

  // 최종 hasNextPage 결정
  const hasNextPage = isControlled ? controlledHasNextPage : infiniteHasNextPage;

  // 최종 게시물 데이터 결정
  const posts = useMemo(() => {
    if (isControlled && !hasInitialData) {
      return controlledPosts || [];
    }

    // 무한스크롤 데이터와 초기 데이터 병합
    return infiniteData?.pages.flatMap((page) => page.data.content) ?? [];
  }, [isControlled, hasInitialData, controlledPosts, infiniteData]);

  // 로딩 상태 결정
  const isLoading = isControlled ? controlledLoading : infiniteLoading && !posts.length;

  // 이벤트 핸들러
  const handleLike = (id: number | string) => onLike?.(id);
  const handleComment = (id: number | string) => onComment?.(id);
  const handleView = (id: number | string) => onView?.(id);

  // 그리드 열 계산
  const getGridCols = () => (feedMode ? "grid-cols-1" : GRID_COLUMNS[columns] || DEFAULT_GRID_COLS);

  if (isLoading && posts.length === 0) {
    return <EmptyState isLoading={true} />;
  }

  if (!posts || posts.length === 0) {
    return <EmptyState isLoading={false} />;
  }

  return (
    <div className={`w-full ${className}`}>
      {disableAnimation ? (
        <div className={`grid ${getGridCols()} gap-6`}>
          {posts.map((post: Post, index: number) => (
            <div key={`post-${index}`}>
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
        <motion.div
          variants={ANIMATION_VARIANTS.container}
          initial="hidden"
          animate="show"
          className={`grid ${getGridCols()} gap-6`}
        >
          {posts.map((post: Post, index: number) => (
            <motion.div
              key={`post-${index}`}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.98 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.3 },
                },
              }}
              className=""
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

      {/* 무한스크롤 트리거 */}
      {(!isControlled || hasInitialData) && (
        <>
          {hasNextPage || isFetchingNextPage ? (
            <InfiniteScrollTrigger
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              target={target as RefObject<HTMLDivElement>}
            />
          ) : (
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
