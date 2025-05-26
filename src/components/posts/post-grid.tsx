"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bookmark, Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import PostsLoading from "./post-loading";
import { useSearchParams } from "next/navigation";
import { useInfiniteEmpathyMemes } from "@/hooks/use-infinite-user-posts";
// import { useInView } from "react-intersection-observer";
// 밈 데이터 (실제로는 API에서 가져올 것)
export const postsData = [
  {
    id: 1,
    title: "아무말 대잔치 밈 시리즈",
    category: "유머",
    image: "/placeholder.svg?height=400&width=400&text=아무말 대잔치",
    author: {
      name: "밈지니어스",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    likes: 2453,
    comments: 342,
    shares: 128,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "BTS 정국 리액션 모음",
    category: "K-POP",
    image: "/placeholder.svg?height=400&width=400&text=정국 리액션",
    author: {
      name: "K-팝인사이더",
      avatar: "/placeholder.svg?height=40&width=40&text=KP",
    },
    likes: 5621,
    comments: 873,
    shares: 1204,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 3,
    title: "드라마 '더 글로리' 명장면 밈",
    category: "드라마",
    image: "/placeholder.svg?height=400&width=400&text=더 글로리 밈",
    author: {
      name: "드라마퀸",
      avatar: "/placeholder.svg?height=40&width=40&text=DQ",
    },
    likes: 1832,
    comments: 421,
    shares: 367,
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: 4,
    title: "귀여운 고양이 리액션 모음",
    category: "동물",
    image: "/placeholder.svg?height=400&width=400&text=고양이 리액션",
    author: {
      name: "애니멀러버",
      avatar: "/placeholder.svg?height=40&width=40&text=AL",
    },
    likes: 3245,
    comments: 231,
    shares: 542,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 5,
    title: "에스파 카리나 표정 모음",
    category: "K-POP",
    image: "/placeholder.svg?height=400&width=400&text=카리나 표정",
    author: {
      name: "뮤직러버",
      avatar: "/placeholder.svg?height=40&width=40&text=ML",
    },
    likes: 4521,
    comments: 562,
    shares: 721,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: 6,
    title: "직장인 공감 밈 시리즈",
    category: "텍스트",
    image: "/placeholder.svg?height=400&width=400&text=직장인 밈",
    author: {
      name: "오피스워커",
      avatar: "/placeholder.svg?height=40&width=40&text=OW",
    },
    likes: 2187,
    comments: 318,
    shares: 452,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 7,
    title: "유재석 표정 모음집",
    category: "연예인",
    image: "/placeholder.svg?height=400&width=400&text=유재석 표정",
    author: {
      name: "예능매니아",
      avatar: "/placeholder.svg?height=40&width=40&text=EM",
    },
    likes: 3876,
    comments: 456,
    shares: 678,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 8,
    title: "영화 '범죄도시' 명대사 밈",
    category: "유머",
    image: "/placeholder.svg?height=400&width=400&text=범죄도시 밈",
    author: {
      name: "무비버프",
      avatar: "/placeholder.svg?height=40&width=40&text=MB",
    },
    likes: 2654,
    comments: 387,
    shares: 521,
    isLiked: false,
    isBookmarked: true,
  },
];

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

interface PostsGridProps {
  posts?: Post[];
  loading?: boolean;
  layout?: "grid" | "list" | "masonry";
  columns?: number;
  showAuthor?: boolean;
  showActions?: boolean;
  onPostClick?: (post: Post) => void;
  className?: string;
  ref?: React.RefObject<HTMLDivElement>;
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
}: PostsGridProps) {
  const [internalPosts, setInternalPosts] = useState(posts ?? postsData);
  const [internalLoading, setInternalLoading] = useState(loading ?? true);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filteredContents = useMemo(() => {
    if (!category || category === "all") return internalPosts;
    return internalPosts.filter(
      (content) => content.category.toLowerCase() === category.toLowerCase()
    );
  }, [category, internalPosts]);

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

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`} ref={ref}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={`grid grid-cols-1 ${
          layout === "grid"
            ? `sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns}`
            : layout === "list"
            ? "grid-cols-1"
            : "sm:grid-cols-2 md:grid-cols-3"
        } gap-6`}
      >
        {filteredContents.map((post: Post) => (
          <motion.div
            key={post.id}
            variants={item}
            onClick={() => onPostClick?.(post)}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900 h-full">
              <div className="relative">
                {post.post_media_url ? (
                  <iframe
                    src={post.post_media_url}
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
                      {post.likedAt && (
                        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
                          {post.likedAt}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {showActions && (
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 text-xs">
                    <button
                      className={`flex items-center hover:text-red-600 dark:hover:text-red-400 transition-colors ${
                        post.isLiked ? "text-red-600 dark:text-red-400" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(
                          typeof post.id === "string"
                            ? parseInt(post.id)
                            : post.id
                        );
                      }}
                    >
                      <Heart
                        className={`h-3 w-3 mr-1 ${
                          post.isLiked ? "fill-current" : ""
                        }`}
                      />
                      {post.likes.toLocaleString()}
                    </button>
                    <button className="flex items-center hover:text-main-600 dark:hover:text-main-400 transition-colors">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {post.comments.toLocaleString()}
                    </button>

                    {post.views !== undefined && (
                      <button className="flex items-center hover:text-main-600 dark:hover:text-main-400 transition-colors">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.views.toLocaleString()}
                      </button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
