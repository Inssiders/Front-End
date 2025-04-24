"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Calendar, Users, Award } from "lucide-react"
import Link from "next/link"

// 챌린지 데이터 (실제로는 API에서 가져올 것)
const challengesData = [
  {
    id: 1,
    title: "댄스 챌린지: 뉴진스 'ETA'",
    image: "/placeholder.svg?height=400&width=600&text=뉴진스 ETA 챌린지",
    category: "댄스",
    status: "completed",
    participants: 12453,
    completedAt: "2023-12-10",
    reward: "500 인싸 포인트",
    badge: "댄스 마스터",
  },
  {
    id: 2,
    title: "밈 챌린지: '아무말 대잔치'",
    image: "/placeholder.svg?height=400&width=600&text=아무말 대잔치 챌린지",
    category: "밈",
    status: "in-progress",
    participants: 8765,
    deadline: "2023-12-20",
    reward: "800 인싸 포인트",
    badge: "밈 크리에이터",
  },
  {
    id: 3,
    title: "립싱크 챌린지: 아이유 '홀씨'",
    image: "/placeholder.svg?height=400&width=600&text=아이유 홀씨 챌린지",
    category: "K-POP",
    status: "completed",
    participants: 9876,
    completedAt: "2023-11-25",
    reward: "700 인싸 포인트",
    badge: "K-POP 팬",
  },
]

export default function ProfileChallenges() {
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
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">참여한 챌린지</h2>
        <Link href="/challenges">
          <Button variant="outline" className="rounded-full">
            더 많은 챌린지
          </Button>
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {challengesData.map((challenge, index) => (
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
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 hover:bg-purple-700">{challenge.category}</Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Badge
                    className={`${
                      challenge.status === "completed"
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-amber-600 hover:bg-amber-700"
                    }`}
                  >
                    {challenge.status === "completed" ? "완료" : "진행 중"}
                  </Badge>
                </div>

                <motion.div
                  className="absolute inset-0 bg-purple-600/70 flex items-center justify-center opacity-0"
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/challenges/${challenge.id}`}>
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Play className="h-5 w-5 mr-2" />
                      {challenge.status === "completed" ? "결과 보기" : "계속하기"}
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{challenge.title}</h3>

                <div className="flex flex-col space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{challenge.participants.toLocaleString()}명 참여</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {challenge.status === "completed" ? `${challenge.completedAt} 완료` : `${challenge.deadline}까지`}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-2" />
                    <span>{challenge.reward} 획득</span>
                  </div>
                </div>

                {challenge.status === "completed" && (
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    획득한 배지: {challenge.badge}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
