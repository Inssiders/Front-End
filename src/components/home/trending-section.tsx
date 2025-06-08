"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share2, TrendingUp, Flame, Clock } from "lucide-react";
import Link from "next/link";

// 트렌딩 콘텐츠 데이터
const trendingData = {
  hot: [
    {
      id: 1,
      title: "요즘 대세 '아무말 대잔치' 밈 모음",
      category: "밈",
      image: "/placeholder.svg?height=400&width=600&text=아무말 대잔치 밈",
      author: {
        name: "밈지니어스",
        avatar: "/placeholder.svg?height=40&width=40&text=MG",
      },
      likes: 2453,
      comments: 342,
      shares: 128,
    },
    {
      id: 2,
      title: "BTS 정국 '3D' 챌린지 열풍",
      category: "K-POP",
      image: "/placeholder.svg?height=400&width=600&text=정국 3D 챌린지",
      author: {
        name: "K-팝인사이더",
        avatar: "/placeholder.svg?height=40&width=40&text=KP",
      },
      likes: 5621,
      comments: 873,
      shares: 1204,
    },
    {
      id: 3,
      title: "이 드라마 장면이 새로운 밈으로 등극",
      category: "드라마",
      image: "/placeholder.svg?height=400&width=600&text=드라마 밈",
      author: {
        name: "드라마퀸",
        avatar: "/placeholder.svg?height=40&width=40&text=DQ",
      },
      likes: 1832,
      comments: 421,
      shares: 367,
    },
  ],
  new: [
    {
      id: 4,
      title: "신상 '아이스크림 먹방' 챌린지",
      category: "챌린지",
      image: "/placeholder.svg?height=400&width=600&text=아이스크림 챌린지",
      author: {
        name: "푸드스타",
        avatar: "/placeholder.svg?height=40&width=40&text=FS",
      },
      likes: 1245,
      comments: 231,
      shares: 98,
    },
    {
      id: 5,
      title: "에스파 새 앨범 '슈퍼시크' 리액션",
      category: "K-POP",
      image: "/placeholder.svg?height=400&width=600&text=에스파 슈퍼시크",
      author: {
        name: "뮤직러버",
        avatar: "/placeholder.svg?height=40&width=40&text=ML",
      },
      likes: 3421,
      comments: 562,
      shares: 721,
    },
    {
      id: 6,
      title: "이 틱톡 댄스가 초등학교 사로잡은 이유",
      category: "틱톡",
      image: "/placeholder.svg?height=400&width=600&text=틱톡 댄스",
      author: {
        name: "댄스마스터",
        avatar: "/placeholder.svg?height=40&width=40&text=DM",
      },
      likes: 2187,
      comments: 318,
      shares: 452,
    },
  ],
  rising: [
    {
      id: 7,
      title: "이 유튜버의 '하루 루틴' 영상이 화제",
      category: "유튜브",
      image: "/placeholder.svg?height=400&width=600&text=하루 루틴",
      author: {
        name: "일상공유",
        avatar: "/placeholder.svg?height=40&width=40&text=DL",
      },
      likes: 987,
      comments: 156,
      shares: 78,
    },
    {
      id: 8,
      title: "새로운 '오징어 게임' 패러디 모음",
      category: "넷플릭스",
      image: "/placeholder.svg?height=400&width=600&text=오징어 게임 패러디",
      author: {
        name: "넷플릭서",
        avatar: "/placeholder.svg?height=40&width=40&text=NF",
      },
      likes: 1654,
      comments: 287,
      shares: 321,
    },
    {
      id: 9,
      title: "이 인스타 필터가 MZ세대 사로잡은 이유",
      category: "인스타그램",
      image: "/placeholder.svg?height=400&width=600&text=인스타 필터",
      author: {
        name: "필터마니아",
        avatar: "/placeholder.svg?height=40&width=40&text=FM",
      },
      likes: 1123,
      comments: 198,
      shares: 245,
    },
  ],
};

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState("hot");

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

  return (
    <section className="bg-white py-20 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              지금 뜨는 트렌드
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              인싸이더가 엄선한 최신 트렌드를 확인하세요
            </p>
          </div>

          <Link href="/trending">
            <Button variant="outline" className="mt-4 rounded-full md:mt-0">
              모든 트렌드 보기
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="hot" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mx-auto mb-8 w-full max-w-md rounded-full bg-gray-100 p-1 dark:bg-gray-800">
            <TabsTrigger
              value="hot"
              className="flex-1 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <Flame className="mr-2 size-4" />
              인기
            </TabsTrigger>
            <TabsTrigger
              value="new"
              className="flex-1 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <Clock className="mr-2 size-4" />
              최신
            </TabsTrigger>
            <TabsTrigger
              value="rising"
              className="flex-1 rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700"
            >
              <TrendingUp className="mr-2 size-4" />
              급상승
            </TabsTrigger>
          </TabsList>

          {Object.keys(trendingData).map((tab) => (
            <TabsContent key={tab} value={tab} className="w-full">
              <motion.div
                variants={container}
                initial="hidden"
                animate={activeTab === tab ? "show" : "hidden"}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              >
                {trendingData[tab as keyof typeof trendingData].map((item) => (
                  <TrendingCard key={item.id} item={item} />
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

function TrendingCard({ item }: { item: any }) {
  return (
    <motion.div variants={item}>
      <Card className="overflow-hidden border-0 bg-gray-50 transition-shadow duration-300 hover:shadow-lg dark:bg-gray-900">
        <div className="relative">
          <img
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            className="aspect-video w-full object-cover"
          />
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
              {item.category}
            </span>
          </div>
        </div>

        <CardContent className="p-5">
          <Link href={`/trending/${item.id}`}>
            <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors hover:text-purple-600 dark:text-white dark:hover:text-purple-400">
              {item.title}
            </h3>
          </Link>

          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="mr-2 size-8">
                <AvatarImage
                  src={item.author.avatar || "/placeholder.svg"}
                  alt={item.author.name}
                />
                <AvatarFallback>{item.author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-700 dark:text-gray-300">{item.author.name}</span>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <button className="flex items-center transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              <Heart className="mr-1 size-4" />
              {item.likes.toLocaleString()}
            </button>
            <button className="flex items-center transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              <MessageCircle className="mr-1 size-4" />
              {item.comments.toLocaleString()}
            </button>
            <button className="flex items-center transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              <Share2 className="mr-1 size-4" />
              {item.shares.toLocaleString()}
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
