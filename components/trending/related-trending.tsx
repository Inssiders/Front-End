"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"

// 관련 트렌딩 데이터 (실제로는 API에서 가져올 것)
const relatedItems = [
  {
    id: 10,
    title: "이번 주 인기 밈 TOP 10",
    category: "밈",
    image: "/placeholder.svg?height=400&width=600&text=인기 밈 TOP 10",
    author: {
      name: "밈지니어스",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
    },
    likes: 1853,
    comments: 245,
    shares: 98,
  },
  {
    id: 11,
    title: "SNS에서 유행하는 '말 없는 사진' 밈",
    category: "밈",
    image: "/placeholder.svg?height=400&width=600&text=말 없는 사진 밈",
    author: {
      name: "트렌드헌터",
      avatar: "/placeholder.svg?height=40&width=40&text=TH",
    },
    likes: 1245,
    comments: 187,
    shares: 76,
  },
  {
    id: 12,
    title: "밈으로 보는 2023년 트렌드",
    category: "밈",
    image: "/placeholder.svg?height=400&width=600&text=2023 밈 트렌드",
    author: {
      name: "트렌드애널리스트",
      avatar: "/placeholder.svg?height=40&width=40&text=TA",
    },
    likes: 2187,
    comments: 312,
    shares: 154,
  },
]

export default function RelatedTrending({ currentId }: { currentId: string }) {
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
    <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {relatedItems.map((relatedItem) => (
        <motion.div key={relatedItem.id} variants={item}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 bg-gray-50 dark:bg-gray-900">
            <div className="relative">
              <img
                src={relatedItem.image || "/placeholder.svg"}
                alt={relatedItem.title}
                className="w-full aspect-video object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-purple-600 hover:bg-purple-700">{relatedItem.category}</Badge>
              </div>
            </div>

            <CardContent className="p-5">
              <Link href={`/trending/${relatedItem.id}`}>
                <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {relatedItem.title}
                </h3>
              </Link>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={relatedItem.author.avatar || "/placeholder.svg"} alt={relatedItem.author.name} />
                    <AvatarFallback>{relatedItem.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{relatedItem.author.name}</span>
                </div>
              </div>

              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 mr-1" />
                  {relatedItem.likes.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  {relatedItem.comments.toLocaleString()}
                </div>
                <div className="flex items-center">
                  <Share2 className="h-4 w-4 mr-1" />
                  {relatedItem.shares.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
