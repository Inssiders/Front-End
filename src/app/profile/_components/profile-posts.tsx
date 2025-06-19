"use client";

import PostGrid from "@/components/posts/post-grid";
import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import { Post } from "@/types/posts";
import { useMemo } from "react";
import { QueryParams } from "./profile-detail";

interface ProfilePostsProps {
  userId: string;
  initialData?: Post[];
  queryParams?: QueryParams;
}

export default function ProfilePosts({ userId, initialData, queryParams }: ProfilePostsProps) {
  const { data, isLoading, hasNextPage } = useInfiniteMemes({
    userId,
    size: queryParams?.size || 20,
    profileFilter: "post",
    initialData,
    enabled: true,
  });

  const posts = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.content) || [];
  }, [data]);

  return (
    <PostGrid
      posts={posts}
      loading={isLoading && !posts.length}
      hasNextPage={hasNextPage}
      userId={userId}
      profileFilter="post"
      showAuthor={false}
    />
  );
}
