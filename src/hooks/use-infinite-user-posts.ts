"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface Post {
  id: string | number;
  post_user_id: string | number;
  post_title: string;
  post_media_url: string;
  category: string;
  likes: number;
  comments: number;
  views: number;
  [key: string]: any;
}

interface Like {
  id: string | number;
  like_user_id: string | number;
  like_target_id: string | number;
  like_target_type: string;
  title: string;
  image: string;
  category: string;
  author: any;
  likedAt: string;
  likes: number;
  comments: number;
  shares: number;
  [key: string]: any;
}

const PAGE_SIZE_DEFAULT = 12;

export function useInfiniteUserData({
  userId,
  type,
  pageSize = PAGE_SIZE_DEFAULT,
}: {
  userId: string | number;
  type: "posts" | "likes";
  pageSize?: number;
}) {
  const queryResult = useInfiniteQuery({
    queryKey: ["user", userId, type],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch("/mock-data/all-mock-data.json");
      const allData = await res.json();
      let items: any[] = [];
      if (type === "posts") {
        items = allData.filter(
          (row: any) => String(row.post_user_id) === String(userId)
        );
        // Map to post shape
        items = items.map((row: any) => ({
          id: row.post_id,
          post_user_id: row.post_user_id,
          post_title: row.post_title,
          post_media_url: row.post_media_url,
          category: row.category_name,
          likes: row.likes || 0,
          comments: row.comments || 0,
          views: row.video_views || 0,
          type: "video",
        }));
      } else if (type === "likes") {
        items = allData.filter(
          (row: any) =>
            String(row.like_user_id) === String(userId) &&
            row.like_target_type === "post"
        );
        // Map to like shape
        items = items.map((row: any) => ({
          id: row.like_id,
          like_user_id: row.like_user_id,
          like_target_id: row.like_target_id,
          like_target_type: row.like_target_type,
          title: row.post_title,
          image: row.video_thumbnail_url,
          category: row.category_name,
          author: {
            name: row.user_detail_username,
            avatar: row.user_detail_profile_url,
          },
          likedAt: row.like_created_at,
          likes: row.likes || 0,
          comments: row.comments || 0,
          shares: row.shares || 0,
        }));
      }
      const start = pageParam * pageSize;
      const end = start + pageSize;
      const page = items.slice(start, end);
      return {
        items: page,
        nextPage: end < items.length ? pageParam + 1 : undefined,
        total: items.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  // Infinite scroll target ref
  const target = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!target.current) return;
    const el = target.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
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
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target.current, queryResult.hasNextPage, queryResult.isFetchingNextPage]);

  return { ...queryResult, target };
}

export function useInfiniteEmpathyMemes({
  category,
  pageSize = PAGE_SIZE_DEFAULT,
}: {
  category?: string;
  pageSize?: number;
}) {
  const queryResult = useInfiniteQuery({
    queryKey: ["empathy-memes", category],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch("/mock-data/all-mock-data.json");
      const allData = await res.json();

      // Filter and transform data
      let items = allData.filter((row: any) => {
        if (category) {
          return row.category_name === category;
        }
        return true;
      });

      // Map to meme shape
      items = items.map((row: any) => ({
        id: row.post_id,
        title: row.post_title,
        description: row.post_content,
        youtubeUrl: row.post_media_url,
        tags: row.tag_name ? [row.tag_name] : [],
        author: {
          id: row.post_user_id,
          name: row.user_detail_username,
          avatar: row.user_detail_profile_url,
        },
        likes: row.likes || 0,
        comments: row.comments || 0,
        createdAt: row.post_created_at,
      }));

      const start = pageParam * pageSize;
      const end = start + pageSize;
      const page = items.slice(start, end);

      return {
        items: page,
        nextPage: end < items.length ? pageParam + 1 : undefined,
        total: items.length,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const target = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!target.current) return;
    const el = target.current;
    if (!el) return;

    const observer = new window.IntersectionObserver(
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

    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [target.current, queryResult.hasNextPage, queryResult.isFetchingNextPage]);

  return { ...queryResult, target };
}
