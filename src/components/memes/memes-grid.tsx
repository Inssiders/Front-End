"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import MemesLoading from "./memes-loading";

// 밈 데이터 (실제로는 API에서 가져올 것)
export const memesData = [
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

interface Meme {
  id: number;
  title: string;
  category: string;
  image: string;
  author: { name: string; avatar: string };
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

interface MemesGridProps {
  memes?: Meme[];
  loading?: boolean;
}

export default function MemesGrid({ memes, loading }: MemesGridProps) {
  const [internalMemes, setInternalMemes] = useState(memes ?? memesData);
  const [internalLoading, setInternalLoading] = useState(loading ?? true);

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
    if (memes) setInternalMemes(memes);
  }, [memes]);

  const toggleLike = (id: number) => {
    setInternalMemes((prevMemes) =>
      prevMemes.map((meme) => {
        if (meme.id === id) {
          return {
            ...meme,
            isLiked: !meme.isLiked,
            likes: meme.isLiked ? meme.likes - 1 : meme.likes + 1,
          };
        }
        return meme;
      })
    );
  };

  const toggleBookmark = (id: number) => {
    setInternalMemes((prevMemes) =>
      prevMemes.map((meme) => {
        if (meme.id === id) {
          return {
            ...meme,
            isBookmarked: !meme.isBookmarked,
          };
        }
        return meme;
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
    return <MemesLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {internalMemes.map((meme) => (
          <motion.div key={meme.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900 h-full">
              <div className="relative">
                <img
                  src={meme.image || "/placeholder.svg"}
                  alt={meme.title}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 hover:bg-purple-700">
                    {meme.category}
                  </Badge>
                </div>
                <button
                  className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-colors"
                  onClick={() => toggleBookmark(meme.id)}
                  aria-label="북마크"
                >
                  <Bookmark
                    className={`h-4 w-4 ${
                      meme.isBookmarked ? "fill-current text-yellow-400" : ""
                    }`}
                  />
                </button>
              </div>

              <CardContent className="p-4">
                <Link href={`/memes/${meme.id}`}>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {meme.title}
                  </h3>
                </Link>

                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage
                        src={meme.author.avatar || "/placeholder.svg"}
                        alt={meme.author.name}
                      />
                      <AvatarFallback>
                        {meme.author.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {meme.author.name}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-xs">
                  <button
                    className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                      meme.isLiked ? "text-purple-600 dark:text-purple-400" : ""
                    }`}
                    onClick={() => toggleLike(meme.id)}
                  >
                    <Heart
                      className={`h-3 w-3 mr-1 ${
                        meme.isLiked ? "fill-current" : ""
                      }`}
                    />
                    {meme.likes.toLocaleString()}
                  </button>
                  <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    {meme.comments.toLocaleString()}
                  </button>
                  <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <Share2 className="h-3 w-3 mr-1" />
                    {meme.shares.toLocaleString()}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
