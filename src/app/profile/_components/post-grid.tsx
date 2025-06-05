"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import VideoPlayer from "@/components/ui/video-player";
import YouTubeFeedPlayer from "@/components/ui/youtube-feed-player";
import { motion } from "framer-motion";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostsLoading from "./post-loading";

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
  likedAt?: string;
}

interface PostsGridProps {
  posts?: Post[];
  loading?: boolean;
  layout?: "grid" | "list" | "masonry" | "feed";
  columns?: number;
  showAuthor?: boolean;
  showActions?: boolean;
  onPostClick?: (post: Post) => void;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
  enableHoverPlay?: boolean;
  feedMode?: boolean;
}

export default function PostsGrid({
  posts,
  loading,
  layout = "grid",
  columns = 4,
  showAuthor = true,
  showActions = true,
  onPostClick,
  className = "",
  ref,
  enableHoverPlay = false,
  feedMode = false,
}: PostsGridProps) {
  const [internalPosts, setInternalPosts] = useState(posts ?? []);
  const [internalLoading, setInternalLoading] = useState(loading ?? true);
  const [hoveredPostId, setHoveredPostId] = useState<string | number | null>(
    null
  );

  const shouldEnableHoverPlay = feedMode || enableHoverPlay;
  const isFeedLayout = layout === "feed" || feedMode;

  useEffect(() => {
    if (typeof loading === "boolean") {
      setInternalLoading(loading);
    } else {
      // 데이터 로딩 시뮬레이션
      setInternalLoading(true);
      const timer = setTimeout(() => {
        setInternalLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    if (posts) setInternalPosts(posts);
  }, [posts]);

  const toggleLike = (id: number) => {
    setInternalPosts((prevPosts: Post[]) =>
      prevPosts.map((post: Post) => {
        if (post.id === id) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (internalLoading) {
    return <PostsLoading />;
  }

  // 피드 레이아웃용 그리드 클래스
  const getGridClass = () => {
    if (isFeedLayout) {
      // columns prop에 따라 동적으로 그리드 클래스 생성
      const maxCols = Math.min(columns, 5); // 최대 5개까지만 허용
      return `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${maxCols}`;
    }

    if (layout === "grid") {
      return `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns}`;
    }

    if (layout === "list") {
      return "grid-cols-1";
    }

    return "sm:grid-cols-2 md:grid-cols-3"; // masonry
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`} ref={ref}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid grid-cols-1 ${getGridClass()} gap-6`}
      >
        {internalPosts.map((post: Post) => (
          <motion.div key={post.id} variants={item}>
            <Link href={`/posts/${post.id}`}>
              <Card
                className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900 h-full cursor-pointer ${
                  isFeedLayout ? "rounded-lg" : ""
                }`}
                onMouseEnter={() => setHoveredPostId(post.id)}
                onMouseLeave={() => setHoveredPostId(null)}
              >
                <div className="relative">
                  {post.post_media_url ? (
                    isFeedLayout ? (
                      <YouTubeFeedPlayer
                        url={post.post_media_url}
                        title={post.title}
                        fallbackImage={post.image}
                        className="w-full aspect-square"
                        isHovered={hoveredPostId === post.id}
                      />
                    ) : (
                      <VideoPlayer
                        url={post.post_media_url}
                        title={post.title}
                        fallbackImage={post.image}
                        className="w-full aspect-square"
                        showPlayButton={!shouldEnableHoverPlay}
                        autoPlay={false}
                        hoverToPlay={shouldEnableHoverPlay}
                        muted={true}
                      />
                    )
                  ) : (
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full aspect-square object-cover"
                    />
                  )}

                  {/* 카테고리 배지 */}
                  <div
                    className={`absolute ${
                      isFeedLayout ? "top-2 left-2" : "top-3 left-3"
                    }`}
                  >
                    <Badge
                      className={`bg-purple-600 hover:bg-purple-700 ${
                        isFeedLayout ? "text-xs px-2 py-1" : ""
                      }`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                </div>

                {/* 카드 콘텐츠 */}
                <CardContent className={`${isFeedLayout ? "p-3" : "p-4"}`}>
                  <h3
                    className={`font-bold mb-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                      isFeedLayout ? "text-sm" : "text-lg"
                    }`}
                  >
                    {post.title}
                  </h3>

                  {showAuthor && (
                    <div
                      className={`flex items-center ${
                        isFeedLayout ? "mb-2" : "mb-4"
                      }`}
                    >
                      <Avatar
                        className={
                          isFeedLayout ? "h-6 w-6 mr-2" : "h-8 w-8 mr-3"
                        }
                      >
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`text-gray-600 dark:text-gray-300 ${
                          isFeedLayout ? "text-xs" : "text-sm"
                        }`}
                      >
                        {post.author.name}
                      </span>
                    </div>
                  )}

                  {showActions && (
                    <div
                      className={`flex items-center justify-between text-gray-500 dark:text-gray-400 ${
                        isFeedLayout ? "text-xs" : "text-sm"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <button
                          className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleLike(
                              typeof post.id === "string"
                                ? parseInt(post.id)
                                : post.id
                            );
                          }}
                        >
                          <Heart
                            className={`${
                              isFeedLayout ? "h-3 w-3" : "h-4 w-4"
                            } ${
                              post.isLiked
                                ? "fill-current text-red-500"
                                : "hover:fill-current"
                            }`}
                          />
                          <span>{post.likes}</span>
                        </button>

                        <div className="flex items-center space-x-1">
                          <MessageCircle
                            className={isFeedLayout ? "h-3 w-3" : "h-4 w-4"}
                          />
                          <span>{post.comments}</span>
                        </div>

                        <div className="flex items-center space-x-1">
                          <Share2
                            className={isFeedLayout ? "h-3 w-3" : "h-4 w-4"}
                          />
                          <span>{post.shares}</span>
                        </div>

                        {post.views && (
                          <div className="flex items-center space-x-1">
                            <Eye
                              className={isFeedLayout ? "h-3 w-3" : "h-4 w-4"}
                            />
                            <span>{post.views}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
