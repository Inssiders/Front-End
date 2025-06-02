"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useInfiniteMemes } from "@/hooks/use-infinite-user-posts";
import PostsLoading from "./post-loading";

interface Post {
  id: number | string;
  title: string;
  description?: string;
  category: string; //  카테고리 이름 (예: "K-POP", "드라마")
  category_id: Number;
  youtubeUrl?: string;
  image?: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  shares?: number;
  views?: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  likedAt?: string;
}

export default function PostsGrid() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category"); // category

  const { data, isLoading, isFetchingNextPage, hasNextPage, target } =
    useInfiniteMemes({
      category: selectedCategory || undefined,
      size: 8,
    });

  const allPosts = useMemo(() => {
    console.log("data 확인:", data);

    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const toggleLike = (id: number | string) => {
    console.log("좋아요 클릭:", id);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading && !data) return <PostsLoading />;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
      >
        {allPosts.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
            결과가 없습니다
          </p>
        ) : (
          allPosts.map((post: Post) => (
            <motion.div key={post.id} variants={item}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900 h-full">
                <div className="relative">
                  {post.youtubeUrl ? (
                    <iframe
                      src={post.youtubeUrl.replace("watch?v=", "embed/")}
                      title={post.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full aspect-square object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-main-700 hover:bg-main-800 text-white font-normal">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <Link href={`/posts/${post.id}`}>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-main-600 dark:hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                        />
                        <AvatarFallback>
                          {post.author.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-700 dark:text-gray-300">
                        {post.author.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-gray-500 dark:text-gray-400 text-xs">
                    <button
                      className={`flex items-center hover:text-red-600 dark:hover:text-red-400 transition-colors ${
                        post.isLiked ? "text-red-600 dark:text-red-400" : ""
                      }`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart
                        className={`h-3 w-3 mr-1 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      {post.likes.toLocaleString()}
                    </button>
                    <div className="flex items-center hover:text-main-600 dark:hover:text-main-400 transition-colors">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {post.comments.toLocaleString()}
                    </div>
                    {post.views !== undefined && (
                      <div className="flex items-center hover:text-main-600 dark:hover:text-main-400 transition-colors">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views.toLocaleString()}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {hasNextPage && (
        <div
          ref={target}
          className="h-16 flex justify-center items-center text-sm text-gray-500 dark:text-gray-400"
        >
          {isFetchingNextPage ? "로딩 중..." : "스크롤하여 더 보기"}
        </div>
      )}
    </div>
  );
}
