"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Eye } from "lucide-react"
import Link from "next/link"

// 게시물 데이터 (실제로는 API에서 가져올 것)
const postsData = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=400&text=패션 스타일링",
    type: "image",
    category: "패션",
    likes: 1245,
    comments: 87,
    views: 5432,
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=400&text=메이크업 튜토리얼",
    type: "video",
    category: "뷰티",
    likes: 2356,
    comments: 156,
    views: 8765,
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=400&text=카페 투어",
    type: "image",
    category: "라이프스타일",
    likes: 876,
    comments: 45,
    views: 3421,
  },
  {
    id: 4,
    image: "/placeholder.svg?height=400&width=400&text=신상 하울",
    type: "video",
    category: "패션",
    likes: 1532,
    comments: 98,
    views: 6543,
  },
  {
    id: 5,
    image: "/placeholder.svg?height=400&width=400&text=데일리 룩",
    type: "image",
    category: "패션",
    likes: 2187,
    comments: 123,
    views: 7654,
  },
  {
    id: 6,
    image: "/placeholder.svg?height=400&width=400&text=뷰티 팁",
    type: "image",
    category: "뷰티",
    likes: 1432,
    comments: 76,
    views: 4321,
  },
  {
    id: 7,
    image: "/placeholder.svg?height=400&width=400&text=여행 브이로그",
    type: "video",
    category: "라이프스타일",
    likes: 3245,
    comments: 187,
    views: 9876,
  },
  {
    id: 8,
    image: "/placeholder.svg?height=400&width=400&text=홈 데코",
    type: "image",
    category: "라이프스타일",
    likes: 987,
    comments: 54,
    views: 3456,
  },
  {
    id: 9,
    image: "/placeholder.svg?height=400&width=400&text=스킨케어 루틴",
    type: "video",
    category: "뷰티",
    likes: 1876,
    comments: 132,
    views: 6789,
  },
]

export default function ProfilePosts() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {postsData.map((post, index) => (
        <motion.div
          key={post.id}
          variants={item}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link href={`/posts/${post.id}`}>
            <Card className="overflow-hidden border-0 bg-gray-100 dark:bg-gray-800 aspect-square relative">
              <img
                src={post.image || "/placeholder.svg"}
                alt={`게시물 ${post.id}`}
                className="w-full h-full object-cover"
              />

              {post.type === "video" && (
                <div className="absolute top-3 right-3 bg-black/50 text-white p-1 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
              )}

              <div className="absolute top-3 left-3">
                <Badge className="bg-purple-600 hover:bg-purple-700">{post.category}</Badge>
              </div>

              <motion.div
                className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0"
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex space-x-6 text-white">
                  <div className="flex flex-col items-center">
                    <Heart className="h-6 w-6 mb-1" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <MessageCircle className="h-6 w-6 mb-1" />
                    <span>{post.comments.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Eye className="h-6 w-6 mb-1" />
                    <span>{post.views.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
