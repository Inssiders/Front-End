"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ThumbsUp, ThumbsDown } from "lucide-react"
import CommentSection from "@/components/trending/comment-section"

export default function TrendingDetail({ id }: { id: string }) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(2453)

  // 실제로는 ID를 기반으로 API에서 데이터를 가져올 것
  const trendingItem = {
    id: Number.parseInt(id),
    title: "요즘 대세 '아무말 대잔치' 밈 모음",
    category: "밈",
    image: "/placeholder.svg?height=600&width=1200&text=아무말 대잔치 밈",
    author: {
      name: "밈지니어스",
      avatar: "/placeholder.svg?height=40&width=40&text=MG",
      followers: 12500,
    },
    content:
      "최근 SNS와 온라인 커뮤니티에서 '아무말 대잔치'라는 밈이 유행하고 있습니다. 이 밈은 의미 없는 대화나 말을 재치있게 표현한 것으로, MZ세대 사이에서 큰 인기를 끌고 있습니다. 이 글에서는 '아무말 대잔치' 밈의 시작과 다양한 변형, 그리고 왜 이렇게 인기를 끌게 되었는지 알아보겠습니다.",
    likes: likeCount,
    comments: 342,
    shares: 128,
    createdAt: "2023년 5월 15일",
    tags: ["밈", "유머", "SNS", "MZ세대", "아무말"],
  }

  const toggleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg"
      >
        <div className="relative">
          <img
            src={trendingItem.image || "/placeholder.svg"}
            alt={trendingItem.title}
            className="w-full max-h-[500px] object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-purple-600 hover:bg-purple-700 text-white">{trendingItem.category}</Badge>
          </div>
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              onClick={toggleBookmark}
              aria-label="북마크"
            >
              <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current text-yellow-400" : ""}`} />
            </button>
            <button
              className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
              aria-label="더보기"
            >
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage src={trendingItem.author.avatar || "/placeholder.svg"} alt={trendingItem.author.name} />
                <AvatarFallback>{trendingItem.author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{trendingItem.author.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  팔로워 {trendingItem.author.followers.toLocaleString()}명
                </p>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">팔로우</Button>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{trendingItem.title}</h1>

          <div className="flex flex-wrap gap-2 mb-6">
            {trendingItem.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">{trendingItem.content}</p>

          <div className="flex justify-between items-center border-t border-b border-gray-200 dark:border-gray-800 py-4 mb-6">
            <div className="flex space-x-6">
              <button
                className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition-colors ${
                  isLiked ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"
                }`}
                onClick={toggleLike}
              >
                <Heart className={`h-5 w-5 mr-2 ${isLiked ? "fill-current" : ""}`} />
                <span>{likeCount.toLocaleString()}</span>
              </button>
              <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <MessageCircle className="h-5 w-5 mr-2" />
                <span>{trendingItem.comments.toLocaleString()}</span>
              </button>
              <button className="flex items-center text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                <Share2 className="h-5 w-5 mr-2" />
                <span>{trendingItem.shares.toLocaleString()}</span>
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{trendingItem.createdAt}</div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <Button variant="outline" className="rounded-full flex items-center">
              <ThumbsUp className="h-4 w-4 mr-2" />
              좋아요
            </Button>
            <Button variant="outline" className="rounded-full flex items-center">
              <ThumbsDown className="h-4 w-4 mr-2" />
              별로에요
            </Button>
            <Button variant="outline" className="rounded-full flex items-center">
              <Share2 className="h-4 w-4 mr-2" />
              공유하기
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="mt-8">
        <Tabs defaultValue="comments">
          <TabsList className="w-full max-w-md mx-auto">
            <TabsTrigger value="comments" className="flex-1">
              댓글 ({trendingItem.comments})
            </TabsTrigger>
            <TabsTrigger value="related" className="flex-1">
              관련 콘텐츠
            </TabsTrigger>
          </TabsList>
          <TabsContent value="comments" className="mt-6">
            <CommentSection trendingId={id} />
          </TabsContent>
          <TabsContent value="related" className="mt-6">
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              관련 콘텐츠 기능은 곧 제공될 예정입니다.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
