"use client";

import PostsGrid from "@/components/posts/post-grid";
import { fetchProfilePosts, triggerRevalidation } from "@/utils/fetch";
import { ProfilePostsResponse } from "@/utils/type/profile";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

interface ProfilePostsProps {
  id: string;
  initialData?: ProfilePostsResponse;
}

interface Post {
  id: number | string;
  title: string;
  category: string;
  image?: string;
  post_media_url?: string;
  type?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  likedAt?: string;
}

export default function ProfilePosts({ id, initialData }: ProfilePostsProps) {
  const queryClient = useQueryClient();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["profilePosts", id],
    queryFn: async ({ pageParam }: { pageParam: string | undefined }) => {
      // 첫 번째 페이지이고 초기 데이터가 있으면 사용
      if (!pageParam && initialData) {
        console.log("[ProfilePosts] Using initial server data");
        return initialData;
      }

      console.log(
        `[ProfilePosts] Fetching posts for user ${id}, cursor: ${pageParam}...`
      );

      const result = await fetchProfilePosts(id, {
        profileFilter: "posts",
        size: 20,
        cursor: pageParam,
      });

      console.log("[ProfilePosts] API Response:", result);
      return result;
    },
    initialPageParam: initialData
      ? initialData.data.pageInfo.nextCursor
      : undefined,
    getNextPageParam: (lastPage) => {
      // API 응답에서 다음 페이지 정보 확인
      return lastPage.data.pageInfo.next
        ? lastPage.data.pageInfo.nextCursor
        : undefined;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 30, // 30분 (구 cacheTime)
  });

  // 무한스크롤 Intersection Observer 설정
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("[ProfilePosts] Loading more posts...");
          fetchNextPage();
        }
      },
      {
        threshold: 0.1, // 10%가 보이면 트리거
        rootMargin: "100px", // 100px 전에 미리 로드
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 모든 페이지의 데이터를 하나의 배열로 합치고 변환
  const posts = useMemo(() => {
    // 초기 데이터가 있고 React Query 데이터가 없으면 초기 데이터 사용
    if (initialData && !data?.pages?.length) {
      const transformedPosts = initialData.data.memes.map((meme) => ({
        id: `posts-${meme.id}`,
        title: meme.title,
        category: `카테고리 ${meme.category_id}`,
        image:
          meme.media_url ||
          "/placeholder.svg?height=400&width=400&text=" +
            encodeURIComponent(meme.title),
        post_media_url: meme.media_url,
        type: "video",
        author: {
          name: meme.user?.nickname || "익명",
          avatar:
            meme.user?.profileUrl ||
            "/placeholder.svg?height=40&width=40&text=" +
              (meme.user?.nickname?.[0] || "U"),
        },
        likes: meme.like_count || 0,
        comments: meme.comment_count || 0,
        shares: 0,
        views: 0,
        isLiked: meme.is_liked || false,
        isBookmarked: false,
      }));
      return transformedPosts;
    }

    // React Query 데이터 사용
    if (!data?.pages) return [];

    const allMemes = data.pages.flatMap((page) => page.data.memes);

    const transformedPosts: Post[] = allMemes.map((meme) => ({
      id: `posts-${meme.id}`,
      title: meme.title,
      category: `카테고리 ${meme.category_id}`,
      image:
        meme.media_url ||
        "/placeholder.svg?height=400&width=400&text=" +
          encodeURIComponent(meme.title),
      post_media_url: meme.media_url,
      type: "video",
      author: {
        name: meme.user?.nickname || "익명",
        avatar:
          meme.user?.profileUrl ||
          "/placeholder.svg?height=40&width=40&text=" +
            (meme.user?.nickname?.[0] || "U"),
      },
      likes: meme.like_count || 0,
      comments: meme.comment_count || 0,
      shares: 0,
      views: 0,
      isLiked: meme.is_liked || false,
      isBookmarked: false,
    }));

    return transformedPosts;
  }, [data, initialData, id]);

  // ISR 캐시 무효화 및 React Query 캐시 재검증
  const handleRefresh = useCallback(async () => {
    try {
      // ISR 캐시 무효화
      await triggerRevalidation({ userId: id });

      // React Query 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: ["profilePosts", id],
      });

      console.log(`[ProfilePosts] Cache invalidated for user ${id}`);
    } catch (error) {
      console.error("[ProfilePosts] Failed to refresh cache:", error);
    }
  }, [id, queryClient]);

  // 초기 데이터가 있고 React Query가 아직 로딩 중이지 않으면 로딩 표시 안 함
  const isActuallyLoading = isLoading && !initialData;

  if (isActuallyLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">
          게시물을 불러오는데 실패했습니다. {(error as Error)?.message}
        </p>
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            다시 시도
          </button>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            캐시 새로고침
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          내 게시물
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {posts.length}개 항목
          </span>
          <button
            onClick={handleRefresh}
            className="text-xs px-2 py-1 text-gray-500 hover:text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            title="캐시 새로고침"
          >
            새로고침
          </button>
        </div>
      </div>

      <PostsGrid
        posts={posts}
        loading={isActuallyLoading}
        layout="grid"
        columns={3}
        showActions={false}
        showAuthor={false}
        className="px-0"
      />

      {/* 무한스크롤 감지 영역 */}
      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="flex justify-center items-center py-8 min-h-[100px]"
        >
          {isFetchingNextPage ? (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span>더 많은 게시물을 불러오는 중...</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">
              스크롤하여 더 많은 게시물 보기
            </div>
          )}
        </div>
      )}

      {/* 모든 데이터를 불러왔을 때 */}
      {!hasNextPage && posts.length > 0 && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm">
            모든 게시물을 불러왔습니다.
          </div>
        </div>
      )}
    </div>
  );
}
