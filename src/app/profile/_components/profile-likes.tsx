"use client";

import {
  fetchProfilePosts,
  transformMemeToPost,
  triggerRevalidation,
} from "@/utils/fetch";
import { ProfilePostsResponse } from "@/utils/types/profile";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";
import PostsGrid from "./post-grid";

interface ProfileLikesProps {
  id: string;
  initialData?: ProfilePostsResponse;
  enableHoverPlay?: boolean;
  feedMode?: boolean; // 피드 모드 활성화
}

export default function ProfileLikes({
  id,
  initialData,
  enableHoverPlay = true,
  feedMode = true, // 좋아요 페이지에서도 기본적으로 피드 모드 활성화
}: ProfileLikesProps) {
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["profileLikes", id],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      // 첫 번째 페이지이고 초기 데이터가 있으면 사용
      if (!pageParam && initialData) {
        console.log("[ProfileLikes] Using initial server data");
        return initialData;
      }

      console.log(
        `[ProfileLikes] Fetching likes for user ${id}, cursor: ${pageParam}...`
      );

      const result = await fetchProfilePosts(id, {
        profileFilter: "likes", // 좋아요한 게시물 조회
        size: 20,
        cursor: pageParam,
      });

      console.log("[ProfileLikes] API Response:", result);
      return result;
    },
    initialPageParam: initialData
      ? initialData.data.pageInfo.nextCursor
      : undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.data.pageInfo.next
        ? lastPage.data.pageInfo.nextCursor
        : undefined;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분
  });

  // 무한스크롤 Intersection Observer 설정
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("[ProfileLikes] Loading more likes...");
          fetchNextPage();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 데이터를 하나의 배열로 합치고 변환
  const likedPosts = useMemo(() => {
    // 초기 데이터가 있고 React Query 데이터가 없으면 초기 데이터 사용
    if (initialData && !data?.pages?.length) {
      return initialData.data.memes.map((meme) =>
        transformMemeToPost(meme, "likes-")
      );
    }

    // React Query 데이터 사용
    if (!data?.pages) return [];

    const allMemes = data.pages.flatMap((page) => page.data.memes);
    return allMemes.map((meme) => transformMemeToPost(meme, "likes-"));
  }, [data, initialData, id]);

  // ISR 캐시 무효화 및 React Query 캐시 재검증
  const handleRefresh = useCallback(async () => {
    try {
      await triggerRevalidation({ userId: id });
      await queryClient.invalidateQueries({
        queryKey: ["profileLikes", id],
      });
      console.log(`[ProfileLikes] Cache invalidated for user ${id}`);
    } catch (error) {
      console.error("[ProfileLikes] Failed to refresh cache:", error);
    }
  }, [id, queryClient]);

  const isActuallyLoading = isLoading && !initialData;

  if (isActuallyLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          좋아요한 게시물을 불러오는데 실패했습니다. {(error as Error)?.message}
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            다시 시도
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            캐시 새로고침
          </button>
        </div>
      </div>
    );
  }

  if (!likedPosts || likedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          아직 좋아요한 게시물이 없습니다
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          마음에 드는 게시물에 좋아요를 눌러보세요!
        </p>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 피드 스타일 좋아요 게시물 그리드 */}
      <PostsGrid
        posts={likedPosts}
        loading={isActuallyLoading}
        layout={feedMode ? "feed" : "grid"}
        columns={4}
        showAuthor={true}
        showActions={true}
        enableHoverPlay={enableHoverPlay}
        feedMode={feedMode}
        className="profile-likes-grid"
      />

      {/* 로딩 더보기 트리거 */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                더 많은 게시물을 불러오는 중...
              </p>
            </div>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              더 보기
            </button>
          )}
        </div>
      )}

      {/* 모든 게시물을 로드했을 때 */}
      {!hasNextPage && likedPosts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            모든 좋아요 게시물을 확인했습니다 💖
          </p>
        </div>
      )}
    </div>
  );
}
