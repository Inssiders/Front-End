"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Award, ArrowRight, Play, Users, Clock } from "lucide-react"
import Link from "next/link"

const challenges = [
  {
    id: 1,
    title: "댄스 챌린지: 뉴진스 'ETA'",
    description: "뉴진스의 새 히트곡 'ETA'에 맞춰 댄스 챌린지에 도전하세요!",
    image: "/placeholder.svg?height=400&width=600&text=뉴진스 ETA 챌린지",
    participants: 12453,
    deadline: "3일 남음",
    prize: "1,000 인싸 포인트",
    difficulty: "중간",
    tags: ["K-POP", "댄스", "뉴진스"],
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
    tags: ["밈", "유머", "창작"],
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
    tags: ["K-POP", "립싱크", "아이유"],
  },
]

export default function ChallengesSection() {
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
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Award className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">인싸 챌린지</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              인싸이더의 다양한 챌린지에 참여하고 포인트와 배지를 획득하세요. 당신의 창의력을 보여줄 기회입니다!
            </p>
          </div>

          <Link href="/challenges">
            <Button className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700 rounded-full">
              모든 챌린지 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {challenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900 h-full">
                <div className="relative">
                  <img
                    src={challenge.image || "/placeholder.svg"}
                    alt={challenge.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <Badge variant="secondary" className="bg-purple-600 text-white hover:bg-purple-700">
                          {challenge.difficulty}
                        </Badge>
                        <span className="ml-2 text-xs text-white flex items-center">
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
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Play className="h-5 w-5 mr-2" />
                      참여하기
                    </Button>
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
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
