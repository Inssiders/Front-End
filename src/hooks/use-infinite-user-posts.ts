"use client";

import { Post } from "@/utils/types/posts";
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
