"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import Link from "next/link"

// 트렌딩 데이터 (실제로는 API에서 가져올 것)
const trendingItems = [
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
    createdAt: "2시간 전",
    isLiked: false,
    isBookmarked: false,
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
    createdAt: "3시간 전",
    isLiked: true,
    isBookmarked: true,
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
    createdAt: "5시간 전",
    isLiked: false,
    isBookmarked: false,
  },
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
    createdAt: "6시간 전",
    isLiked: false,
    isBookmarked: false,
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
    createdAt: "8시간 전",
    isLiked: true,
    isBookmarked: false,
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
    createdAt: "10시간 전",
    isLiked: false,
    isBookmarked: true,
  },
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
    createdAt: "12시간 전",
    isLiked: false,
    isBookmarked: false,
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
    createdAt: "1일 전",
    isLiked: true,
    isBookmarked: false,
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
    createdAt: "1일 전",
    isLiked: false,
    isBookmarked: false,
  },
]

const TrendingLoading = () => (
  <div className="container mx-auto px-4 py-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900">
            <div className="relative">
              <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700"></div>
              <div className="absolute top-3 left-3">
                <div className="bg-gray-400 dark:bg-gray-600 h-6 w-20 rounded-full"></div>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-gray-400 dark:bg-gray-600 h-6 w-6 rounded-full"></div>
              </div>
            </div>

            <CardContent className="p-5">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 mr-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                  <div>
                    <div className="text-sm font-medium bg-gray-400 dark:bg-gray-600 h-4 w-24 rounded-full"></div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-400 dark:bg-gray-600 h-3 w-16 rounded-full mt-1"></p>
                  </div>
                </div>
                <div className="bg-gray-400 dark:bg-gray-600 h-5 w-5 rounded-full"></div>
              </div>

              <h3 className="text-xl font-bold mb-3 bg-gray-400 dark:bg-gray-600 h-6 w-48 rounded-full"></h3>

              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center">
                  <div className="h-4 w-8 mr-1 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-8 mr-1 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-8 mr-1 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
)

export default function TrendingGrid() {
  const [items, setItems] = useState(trendingItems)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleLike = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          }
        }
        return item
      }),
    )
  }

  const toggleBookmark = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isBookmarked: !item.isBookmarked,
          }
        }
        return item
      }),
    )
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (loading) {
    return <TrendingLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {items.map((trendingItem) => (
          <motion.div key={trendingItem.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900">
              <div className="relative">
                <img
                  src={trendingItem.image || "/placeholder.svg"}
                  alt={trendingItem.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 hover:bg-purple-700">{trendingItem.category}</Badge>
                </div>
                <button
                  className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-colors"
                  onClick={() => toggleBookmark(trendingItem.id)}
                  aria-label="북마크"
                >
                  <Bookmark className={`h-4 w-4 ${trendingItem.isBookmarked ? "fill-current text-yellow-400" : ""}`} />
                </button>
              </div>

              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={trendingItem.author.avatar || "/placeholder.svg"}
                        alt={trendingItem.author.name}
                      />
                      <AvatarFallback>{trendingItem.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {trendingItem.author.name}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{trendingItem.createdAt}</p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <Link href={`/trending/${trendingItem.id}`}>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {trendingItem.title}
                  </h3>
                </Link>

                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                  <button
                    className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                      trendingItem.isLiked ? "text-purple-600 dark:text-purple-400" : ""
                    }`}
                    onClick={() => toggleLike(trendingItem.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${trendingItem.isLiked ? "fill-current" : ""}`} />
                    {trendingItem.likes.toLocaleString()}
                  </button>
                  <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {trendingItem.comments.toLocaleString()}
                  </button>
                  <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <Share2 className="h-4 w-4 mr-1" />
                    {trendingItem.shares.toLocaleString()}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
