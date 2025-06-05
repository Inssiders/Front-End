"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PostCardProps } from "../types";
import HoverVideo from "./HoverVideo";

export default function PostCard({
  post,
  enableHoverPlay,
  feedMode,
  showAuthor,
  showActions,
  onLike,
  onComment,
  onView,
}: PostCardProps) {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const cardClassName = `overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900 h-full ${
    feedMode ? "max-w-md mx-auto" : ""
  }`;

  return (
    <Card
      className={cardClassName}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {/* 미디어 영역 */}
      <div className="relative">
        {post.youtubeUrl ? (
          <HoverVideo
            youtubeUrl={post.youtubeUrl}
            enableHover={enableHoverPlay}
            isHovered={isCardHovered}
          />
        ) : post.image &&
          !post.image.includes("youtube.com") &&
          !post.image.includes("youtu.be") ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 text-4xl mb-2">🖼️</div>
              <span className="text-gray-500 text-sm">이미지 없음</span>
            </div>
          </div>
        )}

        {/* 카테고리 배지 */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-main-700 hover:bg-main-800 text-white font-normal">
            {post.category}
          </Badge>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <CardContent className="p-4">
        {/* 제목 */}
        <Link href={`/posts/${post.id}`}>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-main-600 dark:hover:text-purple-400 transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* 설명 (피드 모드에서만 표시) */}
        {post.description && feedMode && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {post.description}
          </p>
        )}

        {/* 작성자 정보 */}
        {showAuthor && (
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
        )}

        {/* 액션 버튼들 */}
        {showActions && (
          <div className="flex justify-between text-gray-500 dark:text-gray-400 text-xs">
            <button
              className={`flex items-center hover:text-red-600 dark:hover:text-red-400 transition-colors ${
                post.isLiked ? "text-red-600 dark:text-red-400" : ""
              }`}
              onClick={() => onLike(post.id)}
            >
              <Heart
                className={`h-3 w-3 mr-1 ${post.isLiked ? "fill-current" : ""}`}
              />
              {post.likes.toLocaleString()}
            </button>
            <button
              className="flex items-center hover:text-main-600 dark:hover:text-main-400 transition-colors"
              onClick={() => onComment(post.id)}
            >
              <MessageCircle className="h-3 w-3 mr-1" />
              {post.comments.toLocaleString()}
            </button>
            {post.views !== undefined && (
              <button
                className="flex items-center hover:text-main-600 dark:hover:text-main-400 transition-colors"
                onClick={() => onView(post.id)}
              >
                <Eye className="h-3 w-3 mr-1" />
                {post.views.toLocaleString()}
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
