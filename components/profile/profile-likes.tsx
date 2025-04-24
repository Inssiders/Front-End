"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"

// 좋아요 누른 게시물 데이터 (실제로는 API에서 가져올 것)
const likedData = [
  {
    id: 201,
    title: "요즘 대세 '아무말 대잔치' 밈 모음",
    image: "/placeholder.svg?height=400&width=600&text=아무말 대잔치 밈",
    category: "밈",
    author: {
      name: "밈지니어스",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    likes: 2453,
    comments: 342,
    shares: 128,
    likedAt: "1시간 전",
  },
  {
    id: 202,
    title: "BTS 정국 '3D' 챌린지 열풍",
    image: "/placeholder.svg?height=400&width=600&text=정국 3D 챌린지",
    category: "K-POP",
    author: {
      name: "K-팝인사이더",
      avatar: "/placeholder.svg?height=40&width=40&text=KP",
    },
    likes: 5621,
    comments: 873,
    shares: 1204,
    likedAt: "3시간 전",
  },
  {
    id: 203,
    title: "이 드라마 장면이 새로운 밈으로 등극",
    image: "/placeholder.svg?height=400&width=600&text=드라마 밈",
    category: "드라마",
    author: {
      name: "드라마퀸",
      avatar: "/placeholder.svg?height=40&width=40&text=DQ",
    },
    likes: 1832,
    comments: 421,
    shares: 367,
    likedAt: "5시간 전",
  },
  {
    id: 204,
    title: "신상 '아이스크림 먹방' 챌린지",
    image: "/placeholder.svg?height=400&width=600&text=아이스크림 챌린지",
    category: "챌린지",
    author: {
      name: "푸드스타",
      avatar: "/placeholder.svg?height=40&width=40&text=FS",
    },
    likes: 1245,
    comments: 231,
    shares: 98,
    likedAt: "1일 전",
  },
  {
    id: 205,
    title: "에스파 새 앨범 '슈퍼시크' 리액션",
    image: "/placeholder.svg?height=400&width=600&text=에스파 슈퍼시크",
    category: "K-POP",
    author: {
      name: "뮤직러버",
      avatar: "/placeholder.svg?height=40&width=40&text=ML",
    },
    likes: 3421,
    comments: 562,
    shares: 721,
    likedAt: "2일 전",
  },
  {
    id: 206,
    title: "이 틱톡 댄스가 초등학교 사로잡은 이유",
    image: "/placeholder.svg?height=400&width=600&text=틱톡 댄스",
    category: "틱톡",
    author: {
      name: "댄스마스터",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
    },
    likes: 2187,
    comments: 318,
    shares: 452,
    likedAt: "3일 전",
  },
]

export default function ProfileLikes() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">좋아요 누른 게시물</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{likedData.length}개 항목</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {likedData.map((post, index) => (
          <motion.div
            key={post.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-1/3">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover aspect-video md:aspect-square"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-purple-600 hover:bg-purple-700">{post.category}</Badge>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{post.author.name}</span>
                    <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">{post.likedAt}</span>
                  </div>

                  <Link href={`/trending/${post.id}`}>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  <div className="mt-auto flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                    <div className="flex items-center text-purple-600 dark:text-purple-400">
                      <Heart className="h-4 w-4 mr-1 fill-current" />
                      {post.likes.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Share2 className="h-4 w-4 mr-1" />
                      {post.shares.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
