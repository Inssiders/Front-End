"use client";

import PostsGrid from "@/components/posts/post-grid";
import { useEffect, useState } from "react";

interface ProfilePostsProps {
  id: string;
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

export default function ProfilePosts({ id }: ProfilePostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log(`[ProfilePosts] Fetching posts for user ${id}...`);

        // fetch를 사용해서 프록시를 통해 사용자별 posts 가져오기
        const response = await fetch(
          `/server/posts?profile_filter=posts&size=20&user_id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("[ProfilePosts] API Response:", data);

        if (data && data.memes) {
          // MSW 응답 데이터를 컴포넌트에서 사용하는 형태로 변환
          const transformedPosts: Post[] = data.memes.map((meme: any) => ({
            id: meme.id,
            title: meme.title,
            category: meme.category || "기타",
            image:
              meme.post_media_url ||
              "/placeholder.svg?height=400&width=400&text=" +
                encodeURIComponent(meme.title),
            post_media_url: meme.post_media_url,
            type: meme.type,
            author: {
              name: meme.user_name || "익명",
              avatar:
                meme.user_avatar ||
                "/placeholder.svg?height=40&width=40&text=" +
                  (meme.user_name?.[0] || "U"),
            },
            likes: meme.likes || 0,
            comments: meme.comments || 0,
            shares: meme.shares || 0,
            views: meme.views || 0,
            isLiked: false,
            isBookmarked: false,
          }));

          setPosts(transformedPosts);
          console.log(
            `[ProfilePosts] Successfully loaded ${transformedPosts.length} posts for user ${id}`
          );
        } else {
          console.warn("[ProfilePosts] Unexpected response format:", data);
          setError("데이터 형식이 올바르지 않습니다.");
        }
      } catch (err) {
        console.error(
          `[ProfilePosts] Failed to fetch posts for user ${id}:`,
          err
        );
        setError("게시물을 불러오는데 실패했습니다. " + (err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserPosts();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

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
        loading={loading}
        layout="grid"
        columns={3}
        showActions={false}
        showAuthor={false}
        className="px-0"
      />
    </div>
  );
}
