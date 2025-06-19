"use client";

import { ApiResponse, Post, PostsResponse } from "@/types/posts";
import { getPosts } from "@/utils/fetch/posts";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

interface UseInfiniteMemeProps {
  category_id?: string;
  userId?: string;
  profileFilter?: "post" | "like";
  searchQuery?: string;
  size?: number;
  enabled?: boolean;
  initialData?: Post[];
}

export function useInfiniteMemes({
  category_id,
  userId,
  profileFilter,
  searchQuery,
  size,
  enabled,
  initialData,
}: UseInfiniteMemeProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  // 카테고리나 검색어가 변경될 때마다 쿼리 초기화
  useEffect(() => {
    queryClient.resetQueries({
      queryKey: ["userPosts", userId, profileFilter, category_id, searchQuery],
    });
  }, [category_id, queryClient, userId, profileFilter, searchQuery]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, ...rest } = useInfiniteQuery<
    ApiResponse<PostsResponse>
  >({
    queryKey: ["userPosts", userId, profileFilter, category_id, searchQuery],
    queryFn: ({ pageParam }) =>
      getPosts({
        page: pageParam as number,
        size,
        category_id: category_id,
        profile_filter: profileFilter,
        keyword: searchQuery,
      }),
    getNextPageParam: (lastPage) => (lastPage.data.has_next ? lastPage.data.next_cursor : undefined),
    enabled: enabled !== false, // undefined도 true로 처리
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (previously cacheTime)
    networkMode: "offlineFirst",
    initialData: initialData
      ? {
          pageParams: [1],
          pages: [
            {
              message: "Success",
              data: {
                content: initialData,
                has_next: true,
                next_cursor: 2,
              },
            },
          ],
        }
      : undefined,
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 새로운 데이터 가져오기
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new observer with better thresholds
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "100px", // 더 일찍 로드 시작
      threshold: 0.1,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    target: targetRef,
    ...rest,
  };
}
