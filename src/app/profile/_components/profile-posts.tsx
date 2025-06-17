"use client";

import PostsGrid from "@/components/posts/post-grid";
import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import { transformMemeToPost } from "@/utils/fetch/profile";
import { ApiMeme } from "@/utils/types/posts";
import { ProfilePostsResponse } from "@/utils/types/profile";
import { useEffect, useMemo, useRef } from "react";
import { QueryParams } from "./profile-detail";

interface ProfilePostsProps {
  userId: string;
  initialData?: ProfilePostsResponse;
  queryParams?: QueryParams;
}

export default function ProfilePosts({
  userId,
  initialData,
  queryParams = {
    size: 20,
  },
}: ProfilePostsProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage } = useInfiniteMemes({
    userId,
    profileFilter: "post",
    size: queryParams.size,
    category: queryParams.categoryId?.toString(),
    keyword: queryParams.keyword,
    initialData,
  });

  // 무한스크롤 Intersection Observer 설정
  useEffect(() => {
    if (!observerRef.current || !hasNextPage || isFetchingNextPage) return;

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

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = useMemo(() => {
    // 초기 데이터가 있고 React Query 데이터가 없으면 초기 데이터 사용
    if (initialData?.data?.content && !data?.pages?.length) {
      const content = Array.isArray(initialData.data.content) ? initialData.data.content : [];
      return content.map((meme: ApiMeme) => transformMemeToPost(meme));
    }

    // React Query 데이터 사용
    if (!data?.pages) return [];

    return data.pages.flatMap((page) => {
      const content = Array.isArray(page.data.content) ? page.data.content : [];
      return content.map((meme: ApiMeme) => transformMemeToPost(meme));
    });
  }, [data, initialData]);

  if (isLoading && !initialData) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">아직 작성한 게시물이 없습니다</h3>
        <p className="text-gray-500 dark:text-gray-400">첫 번째 게시물을 작성해보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PostsGrid posts={posts} />
      <div ref={observerRef} className="h-4" />
    </div>
  );
}
