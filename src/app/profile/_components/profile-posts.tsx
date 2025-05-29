"use client";

import PostsGrid from "@/components/posts/post-grid";
import { useInfiniteUserData } from "@/hooks/use-infinite-user-posts";

interface ProfilePostsProps {
  id: string;
}

export default function ProfilePosts({ id }: ProfilePostsProps) {
  const { data, hasNextPage, isFetchingNextPage, isLoading, isError, target } =
    useInfiniteUserData({ userId: id, type: "posts" });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const posts = data?.pages.flatMap((page) => page.items) || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          내 게시물
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {posts.length}개 항목
        </span>
      </div>
      <PostsGrid
        posts={posts}
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
