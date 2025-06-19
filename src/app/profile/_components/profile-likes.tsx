"use client";

import PostGrid from "@/components/posts/post-grid";
import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import { Post } from "@/types/posts";
import { useMemo } from "react";
import { QueryParams } from "./profile-detail";

interface ProfileLikesProps {
  userId: string;
  initialData?: Post[];
  queryParams?: QueryParams;
}

export default function ProfileLikes({ userId, initialData, queryParams }: ProfileLikesProps) {
  const { data, isLoading, hasNextPage } = useInfiniteMemes({
    userId,
    size: queryParams?.size || 20,
    profileFilter: "like",
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
      profileFilter="like"
      showAuthor={true}
    />
  );
}
