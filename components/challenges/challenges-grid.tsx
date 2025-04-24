"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Users, Clock, Play } from "lucide-react"
import Link from "next/link"
import ChallengesLoading from "./challenges-loading"

// 챌린지 데이터 (실제로는 API에서 가져올 것)
const challengesData = [
  {
    id: 1,
    title: "댄스 챌린지: 뉴진스 'ETA'",
    description: "뉴진스의 새 히트곡 'ETA'에 맞춰 댄스 챌린지에 도전하세요!",
    image: "/placeholder.svg?height=400&width=600&text=뉴진스 ETA 챌린지",
    participants: 12453,
    deadline: "3일 남음",
    prize: "1,000 인싸 포인트",
    difficulty: "중간",
    category: "댄스",
    tags: ["K-POP", "댄스", "뉴진스"],
    isLiked: false,
  },
  {
    id: 2,
    title: "밈 챌린지: '아무말 대잔치'",
    description: "요즘 유행하는 '아무말 대잔치' 밈을 재해석해 나만의 버전을 만들어보세요.",
    image: "/placeholder.svg?height=400&width=600&text=아무말 대잔치 챌린지",
    participants: 8765,
    deadline: "5일 남음",
    prize: "800 인싸 포인트",
    difficulty: "쉬움",
    category: "밈",
    tags: ["밈", "유머", "창작"],
    isLiked: true,
  },
  {
    id: 3,
    title: "립싱크 챌린지: 아이유 '홀씨'",
    description: "아이유의 신곡 '홀씨'에 맞춰 립싱크 챌린지를 해보세요.",
    image: "/placeholder.svg?height=400&width=600&text=아이유 홀씨 챌린지",
    participants: 9876,
    deadline: "7일 남음",
    prize: "1,200 인싸 포인트",
    difficulty: "어려움",
    category: "K-POP",
    tags: ["K-POP", "립싱크", "아이유"],
    isLiked: false,
  },
  {
    id: 4,
    title: "아이스크림 먹방 챌린지",
    description: "가장 창의적인 방법으로 아이스크림을 먹는 영상을 공유해보세요.",
    image: "/placeholder.svg?height=400&width=600&text=아이스크림 챌린지",
    participants: 5432,
    deadline: "10일 남음",
    prize: "500 인싸 포인트",
    difficulty: "쉬움",
    category: "음식",
    tags: ["먹방", "아이스크림", "음식"],
    isLiked: false,
  },
  {
    id: 5,
    title: "패션 챌린지: Y2K 스타일",
    description: "2000년대 초반 Y2K 패션을 현대적으로 재해석한 스타일링을 보여주세요.",
    image: "/placeholder.svg?height=400&width=600&text=Y2K 패션 챌린지",
    participants: 7654,
    deadline: "12일 남음",
    prize: "1,500 인싸 포인트",
    difficulty: "중간",
    category: "패션",
    tags: ["패션", "Y2K", "스타일링"],
    isLiked: true,
  },
  {
    id: 6,
    title: "틱톡 댄스 챌린지: 'Smoke'",
    description: "틱톡에서 유행하는 'Smoke' 댄스 챌린지에 참여해보세요.",
    image: "/placeholder.svg?height=400&width=600&text=Smoke 댄스 챌린지",
    participants: 15678,
    deadline: "4일 남음",
    prize: "2,000 인싸 포인트",
    difficulty: "어려움",
    category: "댄스",
    tags: ["틱톡", "댄스", "챌린지"],
    isLiked: false,
  },
]

export default function ChallengesGrid() {
  const [challenges, setChallenges] = useState(challengesData)
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleLike = (id: number) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) => {
        if (challenge.id === id) {
          return {
            ...challenge,
            isLiked: !challenge.isLiked,
          }
        }
        return challenge
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
    return <ChallengesLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900 h-full hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={challenge.image || "/placeholder.svg"}
                  alt={challenge.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Badge variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700 mr-2">
                        {challenge.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-black/30 text-white border-0">
                        {challenge.category}
                      </Badge>
                      <span className="ml-auto text-xs text-white flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {challenge.deadline}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{challenge.title}</h3>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 bg-purple-600/80 flex items-center justify-center opacity-0"
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/challenges/${challenge.id}`}>
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Play className="h-5 w-5 mr-2" />
                      참여하기
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <CardContent className="p-5">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{challenge.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-2">
                      {[...Array(3)].map((_, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-white dark:border-gray-900">
                          <AvatarImage src={`/placeholder.svg?height=24&width=24&text=${i + 1}`} />
                          <AvatarFallback>U{i + 1}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {challenge.participants.toLocaleString()}명 참여
                    </span>
                  </div>

                  <div className="text-xs font-medium text-purple-600 dark:text-purple-400">{challenge.prize}</div>
                </div>

                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                  <button
                    className={`flex items-center hover:text-purple-600 dark:hover:text-purple-400 ${
                      challenge.isLiked ? "text-purple-600 dark:text-purple-400" : ""
                    }`}
                    onClick={() => toggleLike(challenge.id)}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${challenge.isLiked ? "fill-current" : ""}`} />
                    좋아요
                  </button>
                  <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    댓글
                  </button>
                  <button className="flex items-center hover:text-purple-600 dark:hover:text-purple-400">
                    <Share2 className="h-4 w-4 mr-1" />
                    공유
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
