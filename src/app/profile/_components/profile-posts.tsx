"use client";

import PostsGrid from "@/components/posts/post-grid";
import {
  fetchProfilePosts,
  transformMemeToPost,
  triggerRevalidation,
} from "@/utils/fetch/profile";
import { ProfilePostsResponse } from "@/utils/types/profile";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface ProfilePostsProps {
  id: string;
  initialData?: ProfilePostsResponse;
  enableHoverPlay?: boolean;
  feedMode?: boolean; // 피드 모드 활성화
}

export default function ProfilePosts({
  id,
  initialData,
  enableHoverPlay = true,
  feedMode = true, // 프로필에서는 기본적으로 피드 모드 활성화
}: ProfilePostsProps) {
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
    queryKey: ["profilePosts", id],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      // 첫 번째 페이지이고 초기 데이터가 있으면 사용
      if (!pageParam && initialData) {
        return initialData;
      }

      const result = await fetchProfilePosts(id, {
        profileFilter: "posts",
        size: 20,
        cursor: pageParam,
      });

      return result;
    },
    initialPageParam: initialData
      ? initialData.data.pageInfo.nextCursor
      : undefined,
    getNextPageParam: (lastPage) => {
      // API 응답에서 다음 페이지 정보 확인
      return lastPage.data.pageInfo.next
        ? lastPage.data.pageInfo.nextCursor
        : undefined;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분 (구 cacheTime)
  });

  // 무한스크롤 Intersection Observer 설정
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.1, // 10%가 보이면 트리거
        rootMargin: "100px", // 100px 전에 미리 로드
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 데이터를 하나의 배열로 합치고 변환
  const posts = useMemo(() => {
    // 초기 데이터가 있고 React Query 데이터가 없으면 초기 데이터 사용
    if (initialData && !data?.pages?.length) {
      return initialData.data.memes.map((meme) => transformMemeToPost(meme));
    }

    // React Query 데이터 사용
    if (!data?.pages) return [];

    const allMemes = data.pages.flatMap((page) => page.data.memes);
    return allMemes.map((meme) => transformMemeToPost(meme));
  }, [data, initialData, id]);

  // ISR 캐시 무효화 및 React Query 캐시 재검증
  const handleRefresh = useCallback(async () => {
    try {
      // ISR 캐시 무효화
      await triggerRevalidation({ userId: id });

      // React Query 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: ["profilePosts", id],
      });
    } catch (error) {
      console.error("[ProfilePosts] Failed to refresh cache:", error);
    }
  }, [id, queryClient]);

  // 초기 데이터가 있고 React Query가 아직 로딩 중이지 않으면 로딩 표시 안 함
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
          게시물을 불러오는데 실패했습니다. {(error as Error)?.message}
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

  if (!posts || posts.length === 0) {
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          아직 게시물이 없습니다
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          첫 번째 게시물을 작성해보세요!
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
      {/* 프로필 게시물 그리드 */}
      <PostsGrid
        posts={posts}
        loading={isActuallyLoading}
        layout="grid"
        columns={4}
        showAuthor={true}
        showActions={true}
        enableHoverPlay={enableHoverPlay}
        feedMode={false}
        className="profile-posts-grid"
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
      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            모든 게시물을 확인했습니다 🎉
          </p>
        </div>
      )}
    </div>
  );
}
