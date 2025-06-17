"use client";

import { DEFAULT_PAGE_SIZE, INFINITE_SCROLL } from "@/utils/constant";
import { debounceThrottle } from "@/utils/debounce-throttle";
import { apiFetch } from "@/utils/fetch/auth";
import { ApiMeme } from "@/utils/types/posts";
import { ProfilePostsResponse } from "@/utils/types/profile";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseInfiniteMemeProps {
  category?: string;
  userId?: string;
  profileFilter?: "post" | "like";
  size?: number;
  keyword?: string;
  enabled?: boolean;
  initialData?: ProfilePostsResponse;
}

interface PageData {
  data: {
    content: ApiMeme[];
    has_next: boolean;
    next_cursor: string | null;
  };
}

export function useInfiniteMemes({
  category,
  userId,
  profileFilter,
  size = DEFAULT_PAGE_SIZE,
  keyword,
  enabled = true,
  initialData,
}: UseInfiniteMemeProps) {
  const hasInitialData = initialData?.data?.content && initialData.data.content.length > 0;

  // 중복 호출 방지를 위한 상태 관리
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const lastFetchTime = useRef<number>(0);

  const queryResult = useInfiniteQuery({
    queryKey: ["memes", category, userId, profileFilter] as const,
    enabled: enabled,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: !hasInitialData,
    retry: INFINITE_SCROLL.RETRY_COUNT,
    retryDelay: INFINITE_SCROLL.RETRY_DELAY,
    ...(hasInitialData && {
      initialData: {
        pages: [
          {
            data: {
              content: initialData.data.content,
              has_next: initialData.data.has_next,
              next_cursor: initialData.data.next_cursor,
            },
          },
        ],
        pageParams: [undefined],
      },
    }),
    queryFn: async ({ pageParam }) => {
      // 프로필 모드일 때는 다른 엔드포인트 사용
      const isProfileMode = userId && profileFilter;
      const endpoint = isProfileMode ? `/users/${userId}/posts` : "/posts";

      const params = new URLSearchParams();
      params.set("size", String(size));

      if (category) {
        params.set("category_id", category);
      }

      if (isProfileMode && profileFilter) {
        params.set("profile_filter", profileFilter);
      }

      if (pageParam) {
        params.set("last_id", pageParam);
      }

      const res = await apiFetch(`${endpoint}?${params.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();

      return {
        data: {
          content: json.data.content || [],
          has_next: json.data.has_next,
          next_cursor: json.data.next_cursor,
        },
      };
    },
    getNextPageParam: (lastPage) => lastPage.data.next_cursor,
    initialPageParam: undefined,
  });

  // 쿨다운 시간 체크 함수
  const canFetchNext = useCallback(() => {
    const now = Date.now();
    const timeSinceLastFetch = now - lastFetchTime.current;
    return timeSinceLastFetch >= INFINITE_SCROLL.COOLDOWN_TIME;
  }, []);

  // 실제 fetchNextPage 실행 함수 (중복 호출 방지 로직 포함)
  const executeFetchNextPage = useCallback(async () => {
    // 중복 호출 방지 조건들
    if (isLoadingNext) {
      return;
    }

    if (!queryResult.hasNextPage) {
      return;
    }

    if (queryResult.isFetchingNextPage) {
      return;
    }

    if (!canFetchNext()) {
      return;
    }

    try {
      setIsLoadingNext(true);
      lastFetchTime.current = Date.now();

      await queryResult.fetchNextPage();
    } catch (error) {
      console.error("❌ 무한스크롤 실패:", error);
    } finally {
      // 로딩 상태 해제 (약간의 지연으로 중복 방지)
      setTimeout(() => {
        setIsLoadingNext(false);
      }, 200);
    }
  }, [isLoadingNext, queryResult.hasNextPage, queryResult.isFetchingNextPage, queryResult.fetchNextPage, canFetchNext]);

  // 디바운싱 + 쓰로틀링이 적용된 fetchNextPage 함수
  const debouncedThrottledFetchNextPage = useCallback(
    debounceThrottle(
      executeFetchNextPage,
      INFINITE_SCROLL.DEBOUNCE_DELAY, // 100ms 디바운싱
      INFINITE_SCROLL.THROTTLE_DELAY // 300ms 쓰로틀링
    ),
    [executeFetchNextPage]
  );

  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target.current || !enabled) return;
    if (!queryResult.hasNextPage || queryResult.isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // 디바운싱 + 쓰로틀링이 적용된 함수 호출
          debouncedThrottledFetchNextPage();
        }
      },
      {
        threshold: INFINITE_SCROLL.THRESHOLD, // 트리거 감도
        rootMargin: INFINITE_SCROLL.ROOT_MARGIN, // 미리 로드할 거리 (인스타그램 스타일)
      }
    );

    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
      observer.disconnect();
    };
  }, [enabled, queryResult.hasNextPage, queryResult.isFetchingNextPage, debouncedThrottledFetchNextPage]);

  // 로딩 상태 업데이트
  useEffect(() => {
    if (!queryResult.isFetchingNextPage && isLoadingNext) {
      const timer = setTimeout(() => {
        setIsLoadingNext(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [queryResult.isFetchingNextPage, isLoadingNext]);

  return {
    ...queryResult,
    target,
    // 추가 상태 노출
    isLoadingNext: isLoadingNext || queryResult.isFetchingNextPage,
    fetchNextPage: debouncedThrottledFetchNextPage,
  };
}
