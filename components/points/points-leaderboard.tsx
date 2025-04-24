"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Crown, Medal, Award } from "lucide-react"

// 리더보드 데이터 (실제로는 API에서 가져올 것)
const leaderboardData = {
  weekly: [
    {
      rank: 1,
      name: "김민서",
      username: "@minseo_style",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
      points: 12500,
      level: 32,
      badge: "챌린지 마스터",
    },
    {
      rank: 2,
      name: "박준혁",
      username: "@junhyuk_content",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
      points: 10800,
      level: 29,
      badge: "콘텐츠 크리에이터",
    },
    {
      rank: 3,
      name: "이지유",
      username: "@jiyu_beauty",
      avatar: "/placeholder.svg?height=40&width=40&text=JY",
      points: 9500,
      level: 27,
      badge: "뷰티 인플루언서",
    },
    {
      rank: 4,
      name: "최다은",
      username: "@daeun_food",
      avatar: "/placeholder.svg?height=40&width=40&text=DE",
      points: 8200,
      level: 25,
      badge: "푸드 크리에이터",
    },
    {
      rank: 5,
      name: "정승우",
      username: "@seungwoo_travel",
      avatar: "/placeholder.svg?height=40&width=40&text=SW",
      points: 7800,
      level: 24,
      badge: "여행 인플루언서",
    },
  ],
  monthly: [
    {
      rank: 1,
      name: "한소희",
      username: "@sohee_fitness",
      avatar: "/placeholder.svg?height=40&width=40&text=SH",
      points: 45600,
      level: 42,
      badge: "피트니스 마스터",
    },
    {
      rank: 2,
      name: "김민서",
      username: "@minseo_style",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
      points: 42300,
      level: 32,
      badge: "챌린지 마스터",
    },
    {
      rank: 3,
      name: "김태호",
      username: "@taeho_gaming",
      avatar: "/placeholder.svg?height=40&width=40&text=TH",
      points: 38900,
      level: 35,
      badge: "게임 스트리머",
    },
    {
      rank: 4,
      name: "이하은",
      username: "@haeun_lifestyle",
      avatar: "/placeholder.svg?height=40&width=40&text=HE",
      points: 35600,
      level: 31,
      badge: "라이프스타일 전문가",
    },
    {
      rank: 5,
      name: "박준혁",
      username: "@junhyuk_content",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
      points: 32100,
      level: 29,
      badge: "콘텐츠 크리에이터",
    },
  ],
  allTime: [
    {
      rank: 1,
      name: "김태호",
      username: "@taeho_gaming",
      avatar: "/placeholder.svg?height=40&width=40&text=TH",
      points: 256000,
      level: 65,
      badge: "레전드 크리에이터",
    },
    {
      rank: 2,
      name: "한소희",
      username: "@sohee_fitness",
      avatar: "/placeholder.svg?height=40&width=40&text=SH",
      points: 235000,
      level: 62,
      badge: "피트니스 마스터",
    },
    {
      rank: 3,
      name: "김민서",
      username: "@minseo_style",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
      points: 210000,
      level: 58,
      badge: "패션 아이콘",
    },
    {
      rank: 4,
      name: "이지유",
      username: "@jiyu_beauty",
      avatar: "/placeholder.svg?height=40&width=40&text=JY",
      points: 195000,
      level: 55,
      badge: "뷰티 인플루언서",
    },
    {
      rank: 5,
      name: "박준혁",
      username: "@junhyuk_content",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
      points: 180000,
      level: 52,
      badge: "콘텐츠 크리에이터",
    },
  ],
}

export default function PointsLeaderboard() {
  const [period, setPeriod] = useState("weekly")

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-700" />
    return <span className="text-gray-500 font-medium">{rank}</span>
  }

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">인싸 리더보드</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6">
            가장 활발하게 활동하는 인싸들의 랭킹을 확인해보세요.
          </p>

          <Tabs defaultValue="weekly" value={period} onValueChange={setPeriod} className="w-full max-w-md mx-auto mb-8">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="weekly">주간</TabsTrigger>
              <TabsTrigger value="monthly">월간</TabsTrigger>
              <TabsTrigger value="allTime">전체</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl">
              {period === "weekly" ? "주간" : period === "monthly" ? "월간" : "전체"} 인싸 랭킹
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaderboardData[period as keyof typeof leaderboardData].map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`flex items-center p-4 rounded-lg ${
                    user.rank <= 3 ? "bg-purple-50 dark:bg-purple-900/20" : "bg-gray-50 dark:bg-gray-900/50"
                  }`}
                >
                  <div className="flex items-center justify-center w-8 mr-4">{getRankIcon(user.rank)}</div>
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900 dark:text-white">{user.name}</h3>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{user.username}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Lv.{user.level}</span>
                      <Badge
                        variant="outline"
                        className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      >
                        {user.badge}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {user.points.toLocaleString()} P
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
