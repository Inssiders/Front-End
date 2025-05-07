"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Eye, Bookmark } from "lucide-react"
import Link from "next/link"

// 저장된 게시물 데이터 (실제로는 API에서 가져올 것)
const savedData = [
  {
    id: 101,
    image: "/placeholder.svg?height=400&width=400&text=트렌드 분석",
    type: "article",
    category: "트렌드",
    likes: 3245,
    comments: 187,
    views: 12543,
    savedAt: "2일 전",
  },
  {
    id: 102,
    image: "/placeholder.svg?height=400&width=400&text=뉴진스 댄스",
    type: "video",
    category: "K-POP",
    likes: 8765,
    comments: 543,
    views: 34567,
    savedAt: "3일 전",
  },
  {
    id: 103,
    image: "/placeholder.svg?height=400&width=400&text=밈 컬렉션",
    type: "image",
    category: "밈",
    likes: 5432,
    comments: 321,
    views: 23456,
    savedAt: "1주일 전",
  },
  {
    id: 104,
    image: "/placeholder.svg?height=400&width=400&text=스타일링 팁",
    type: "article",
    category: "패션",
    likes: 2345,
    comments: 154,
    views: 9876,
    savedAt: "2주일 전",
  },
  {
    id: 105,
    image: "/placeholder.svg?height=400&width=400&text=아이유 립싱크",
    type: "video",
    category: "K-POP",
    likes: 7654,
    comments: 432,
    views: 28765,
    savedAt: "3주일 전",
  },
  {
    id: 106,
    image: "/placeholder.svg?height=400&width=400&text=인기 챌린지",
    type: "challenge",
    category: "챌린지",
    likes: 4321,
    comments: 234,
    views: 15678,
    savedAt: "1달 전",
  },
]

export default function ProfileSaved() {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">저장된 항목</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{savedData.length}개 항목</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        {savedData.map((item, index) => (
          <motion.div
            key={item.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link href={`/posts/${item.id}`}>
              <Card className="overflow-hidden border-0 bg-gray-100 dark:bg-gray-800 aspect-square relative">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`저장된 항목 ${item.id}`}
                  className="w-full h-full object-cover"
                />

                {item.type === "video" && (
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
                  <Badge className="bg-purple-600 hover:bg-purple-700">{item.category}</Badge>
                </div>

                <div className="absolute bottom-3 right-3 text-xs text-white bg-black/50 px-2 py-1 rounded-full">
                  {item.savedAt}
                </div>

                <motion.div
                  className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center opacity-0"
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex space-x-6 text-white">
                    <div className="flex flex-col items-center">
                      <Heart className="h-6 w-6 mb-1" />
                      <span>{item.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="h-6 w-6 mb-1" />
                      <span>{item.comments.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Eye className="h-6 w-6 mb-1" />
                      <span>{item.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 bg-transparent border-white text-white hover:bg-white/20"
                    onClick={(e) => {
                      e.preventDefault()
                      // 저장 취소 로직
                    }}
                  >
                    <Bookmark className="h-4 w-4 mr-2 fill-current" />
                    저장 취소
                  </Button>
                </motion.div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
