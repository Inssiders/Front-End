"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const PAGE_SIZE_DEFAULT = 12;

export function useInfiniteMemes({
  category,
  userId,
  profileFilter,
  size = PAGE_SIZE_DEFAULT,
  enabled = true,
}: {
  category?: string;
  userId?: string;
  profileFilter?: "posts" | "likes";
  size?: number;
  enabled?: boolean;
}) {
  const queryResult = useInfiniteQuery({
    queryKey: ["memes", category, userId, profileFilter],
    enabled,
    queryFn: async ({ pageParam = 1 }) => {
      // 프로필 모드일 때는 다른 엔드포인트 사용
      const isProfileMode = userId && profileFilter;
      const url = new URL(
        isProfileMode ? `/server/users/${userId}/posts` : "/server/posts",
        window.location.origin
      );

      url.searchParams.set("page", String(pageParam));
      url.searchParams.set("size", String(size));

      if (category) {
        url.searchParams.set("category", category);
      }

      if (isProfileMode) {
        url.searchParams.set("filter", profileFilter);
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch posts");
      const json = await res.json();

      const items = json.data.memes.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.content,
        youtubeUrl: row.media_url,
        author: {
          name: `User #${row.user_id}`,
          avatar: "/placeholder.svg",
        },
        category_id: row.category_id,
        category: `#${row.category}`,
        likes: 0,
        comments: 0,
        views: 0,
        isLiked: false,
        isBookmarked: false,
        likedAt: null,
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
    initialPageParam: 1,
  });

  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !target.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          queryResult.hasNextPage &&
          !queryResult.isFetchingNextPage
        ) {
          queryResult.fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target.current);

    return () => {
      if (target.current) observer.unobserve(target.current);
      observer.disconnect();
    };
  }, [enabled, queryResult.hasNextPage, queryResult.isFetchingNextPage]);

  return { ...queryResult, target };
}
