"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

const PAGE_SIZE_DEFAULT = 12;

export function useInfiniteMemes({
  category,
  pageSize = PAGE_SIZE_DEFAULT,
}: {
  category?: string;
  pageSize?: number;
}) {
  const queryResult = useInfiniteQuery({
    queryKey: ["memes", category],
    queryFn: async ({ pageParam = 0 }) => {
      const url = new URL("/mock-api/posts", window.location.origin);
      url.searchParams.set("page", String(pageParam));
      url.searchParams.set("pageSize", String(pageSize));
      if (category) {
        url.searchParams.set("category", category);
      }

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();

      const items = data.items.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.content,
        youtubeUrl: row.media_url,
        author: {
          name: `User${row.account_id}`,
          avatar: "/placeholder.svg",
        },
        category: row.category,
        likes: 0,
        comments: 0,
        views: 0,
      }));

      return {
        items,
        nextPage: data.hasNextPage ? pageParam + 1 : undefined,
        total: data.total,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  // 무한스크롤 target
  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target.current) return;
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
  }, [queryResult.hasNextPage, queryResult.isFetchingNextPage]);

  return { ...queryResult, target };
}
