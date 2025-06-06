"use client";

import { DEFAULT_PAGE_SIZE, INFINITE_SCROLL } from "@/utils/constant";
import { debounceThrottle } from "@/utils/debounce-throttle";
import { Post } from "@/utils/types/posts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteMemes({
  category,
  userId,
  profileFilter,
  size = DEFAULT_PAGE_SIZE,
  enabled = true,
  initialData,
}: {
  category?: string;
  userId?: string;
  profileFilter?: "posts" | "likes";
  size?: number;
  enabled?: boolean;
  initialData?: any[]; // 초기 데이터
}) {
  const hasInitialData = initialData && initialData.length > 0;

  // 중복 호출 방지를 위한 상태 관리
  const [isLoadingNext, setIsLoadingNext] = useState(false);
  const lastFetchTime = useRef<number>(0);

  const queryResult = useInfiniteQuery({
    queryKey: ["memes", category, userId, profileFilter],
    enabled: enabled, // 항상 활성화 (무한스크롤 가능하도록)
    staleTime: 10 * 60 * 1000, // 10분 동안 데이터를 fresh로 간주 (인스타그램 스타일)
    gcTime: 30 * 60 * 1000, // 30분 동안 캐시 유지
    refetchOnWindowFocus: false, // 창 포커스 시 자동 리페치 비활성화
    refetchOnMount: !hasInitialData, // 초기 데이터가 있으면 마운트 시 리페치 하지 않음
    retry: INFINITE_SCROLL.RETRY_COUNT, // 실패 시 재시도
    retryDelay: INFINITE_SCROLL.RETRY_DELAY, // 재시도 지연시간
    ...(hasInitialData && {
      initialData: {
        pages: [
          {
            items: initialData,
            nextPage: 2,
            total: initialData.length,
          },
        ],
        pageParams: [1],
      },
    }),
    queryFn: async ({ pageParam = hasInitialData ? 2 : 1 }) => {
      // 프로필 모드일 때는 다른 엔드포인트 사용
      const isProfileMode = userId && profileFilter;
      const url = new URL(
        isProfileMode ? `/server/users/${userId}/posts` : "/server/posts",
        window.location.origin
      );

      url.searchParams.set("page", String(pageParam));
      url.searchParams.set("size", String(size));

      if (category) {
        url.searchParams.set("category_id", category);
      }

      if (isProfileMode) {
        url.searchParams.set("filter", profileFilter);
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();

      const items: Post[] = json.data.memes.map((row: any) => ({
        id: row.id?.toString() || Date.now().toString(),
        title: row.title,
        content: row.content,
        category_id: row.category_id,
        media_url: row.media_url,
        media_upload_time: row.media_upload_time,
        account_id: row.user_id,
        created_at: row.created_at,
        updated_at: row.updated_at,
        is_deleted: false,

        // UI를 위한 추가 정보
        author: {
          account_id: row.user_id,
          account_name: `User ${row.user_id}`,
          profile_image: "/placeholder.svg",
        },
        likes: row.like_count || 0,
        comment_count: row.comment_count || 0,
        is_liked: row.is_liked || false,
      }));

      return {
        items,
        nextPage:
          json.data.pageInfo.page < json.data.pageInfo.totalPages
            ? json.data.pageInfo.page + 1
            : undefined,
        total: json.data.pageInfo.totalElements,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: hasInitialData ? 2 : 1, // 초기 데이터가 있으면 2부터 시작
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
      console.log("⏸️ 무한스크롤 중복 방지: 이미 로딩 중");
      return;
    }

    if (!queryResult.hasNextPage) {
      console.log("⏸️ 무한스크롤 중복 방지: 더 이상 페이지 없음");
      return;
    }

    if (queryResult.isFetchingNextPage) {
      console.log("⏸️ 무한스크롤 중복 방지: React Query에서 이미 가져오는 중");
      return;
    }

    if (!canFetchNext()) {
      console.log("⏸️ 무한스크롤 중복 방지: 쿨다운 시간 미달");
      return;
    }

    try {
      console.log("🔄 무한스크롤 실행: 새 페이지 로딩 시작");
      setIsLoadingNext(true);
      lastFetchTime.current = Date.now();

      await queryResult.fetchNextPage();

      console.log("✅ 무한스크롤 완료: 새 페이지 로딩 성공");
    } catch (error) {
      console.error("❌ 무한스크롤 실패:", error);
    } finally {
      // 로딩 상태 해제 (약간의 지연으로 중복 방지)
      setTimeout(() => {
        setIsLoadingNext(false);
      }, 200);
    }
  }, [
    isLoadingNext,
    queryResult.hasNextPage,
    queryResult.isFetchingNextPage,
    queryResult.fetchNextPage,
    canFetchNext,
  ]);

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
  }, [
    enabled,
    queryResult.hasNextPage,
    queryResult.isFetchingNextPage,
    debouncedThrottledFetchNextPage,
  ]);

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
  };
}
