"use client";

import PostsGrid from "@/components/posts/post-grid";
import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import { ProfilePostsResponse } from "@/utils/types/profile";
import { useEffect, useRef } from "react";

interface ProfilePostsProps {
  userId: string;
  initialData?: ProfilePostsResponse;
}

export function ProfilePosts({ userId, initialData }: ProfilePostsProps) {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isError } = useInfiniteMemes({
    userId,
    profileFilter: "posts",
    size: 20,
    enabled: true,
    initialData: initialData?.data?.content,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isError) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">게시물을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!isLoading && !data?.pages[0]?.items?.length) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-gray-500">아직 게시한 게시물이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <PostsGrid posts={data?.pages.flatMap((page) => page.items) || []} loading={isLoading} />
      {(hasNextPage || isFetchingNextPage) && <div ref={observerRef} className="h-20" />}
    </div>
  );
}
