"use client";

import PostsGrid from "@/components/posts/post-grid";
import { useInfiniteUserData } from "@/hooks/use-infinite-user-posts";

interface ProfileLikesProps {
  id: string;
}

export default function ProfileLikes({ id }: ProfileLikesProps) {
  const { data, hasNextPage, isFetchingNextPage, isLoading, isError, target } =
    useInfiniteUserData({ userId: id, type: "likes" });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const liked = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          좋아요 누른 게시물
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {liked.length}개 항목
        </span>
      </div>
      <PostsGrid
        posts={liked}
        loading={isLoading}
        layout="grid"
        columns={3}
        showActions={false}
        showAuthor={false}
        ref={target as React.RefObject<HTMLDivElement>}
        className="px-0"
      />
      {isFetchingNextPage && (
        <div className="text-center py-4">불러오는 중...</div>
      )}
    </div>
  );
}
