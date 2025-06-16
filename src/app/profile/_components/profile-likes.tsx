"use client";

import PostsGrid from "@/components/posts/post-grid";
import { fetchProfilePosts, transformMemeToPost, triggerRevalidation } from "@/utils/fetch/profile";
import { ProfilePostsResponse } from "@/utils/types/posts";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface ProfileLikesProps {
  id: string;
  initialData?: ProfilePostsResponse;
  enableHoverPlay?: boolean;
  feedMode?: boolean;
}

export default function ProfileLikes({ id, initialData, enableHoverPlay = true, feedMode = true }: ProfileLikesProps) {
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ["profileLikes", id],
    queryFn: async (context) => {
      const { pageParam } = context;
      // 첫 번째 페이지이고 초기 데이터가 있으면 사용
      if (!pageParam && initialData) {
        return initialData;
      }

      const result = await fetchProfilePosts(id, {
        profileFilter: "likes",
        size: 20,
        cursor: pageParam || undefined,
      });

      return result;
    },
    initialPageParam: initialData ? initialData.data.next_cursor : null,
    getNextPageParam: (lastPage) => {
      return lastPage.data.has_next ? lastPage.data.next_cursor : null;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
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
  const posts = useMemo(() => {
    // 초기 데이터가 있고 React Query 데이터가 없으면 초기 데이터 사용
    if (initialData && !data?.pages?.length) {
      return initialData.data.content.map((meme) => transformMemeToPost(meme));
    }

    // React Query 데이터 사용
    if (!data?.pages) return [];

    const allMemes = data.pages.flatMap((page) => page.data.content);
    return allMemes.map((meme) => transformMemeToPost(meme));
  }, [data, initialData, id]);

  // ISR 캐시 무효화 및 React Query 캐시 재검증
  const handleRefresh = useCallback(async () => {
    try {
      await triggerRevalidation({ userId: id });
      await queryClient.invalidateQueries({
        queryKey: ["profileLikes", id],
      });
    } catch (error) {
      console.error("[ProfileLikes] Failed to refresh cache:", error);
    }
  }, [id, queryClient]);

  // 초기 데이터가 있고 React Query가 아직 로딩 중이지 않으면 로딩 표시 안 함
  const isActuallyLoading = isLoading && !initialData;

  if (isActuallyLoading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center">
        <p className="mb-4 text-red-500">좋아요한 게시물을 불러오는데 실패했습니다. {(error as Error)?.message}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
          >
            다시 시도
          </button>
          <button
            onClick={handleRefresh}
            className="rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
          >
            캐시 새로고침
          </button>
        </div>
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mb-4 text-gray-400">
          <svg className="mx-auto size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">아직 좋아요한 게시물이 없습니다</h3>
        <p className="text-gray-500 dark:text-gray-400">마음에 드는 게시물에 좋아요를 눌러보세요!</p>
        <button
          onClick={handleRefresh}
          className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
        >
          새로고침
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PostsGrid
        posts={posts}
        loading={isActuallyLoading}
        layout="grid"
        columns={4}
        showAuthor={true}
        showActions={true}
        enableHoverPlay={enableHoverPlay}
        feedMode={false}
        className="profile-likes-grid"
      />

      {hasNextPage && (
        <div ref={loadMoreRef} className="py-8 text-center">
          {isFetchingNextPage ? (
            <div className="flex flex-col items-center">
              <div className="size-6 animate-spin rounded-full border-b-2 border-purple-600"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">더 많은 게시물을 불러오는 중...</p>
            </div>
          ) : (
            <button
              onClick={() => fetchNextPage()}
              className="rounded-lg bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700"
            >
              더 보기
            </button>
          )}
        </div>
      )}

      {!hasNextPage && posts.length > 0 && (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">모든 게시물을 확인했습니다 🎉</p>
        </div>
      )}
    </div>
  );
}
