"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock, Play } from "lucide-react"
import Link from "next/link"
import LiveLoading from "./live-loading"

// 라이브 방송 데이터 (실제로는 API에서 가져올 것)
const liveData = [
  {
    id: 1,
    title: "신곡 발매 기념 라이브 방송",
    thumbnail: "/placeholder.svg?height=400&width=600&text=아이유 라이브",
    category: "K-POP",
    viewers: 12543,
    host: {
      name: "아이유 (이지은)",
      avatar: "/placeholder.svg?height=40&width=40&text=IU",
    },
    duration: "01:23:45",
    isLive: true,
  },
  {
    id: 2,
    title: "롤 랭크 다이아 도전기",
    thumbnail: "/placeholder.svg?height=400&width=600&text=게임 스트리밍",
    category: "게임",
    viewers: 8765,
    host: {
      name: "김태호",
      avatar: "/placeholder.svg?height=40&width=40&text=TH",
    },
    duration: "02:45:12",
    isLive: true,
  },
  {
    id: 3,
    title: "데일리 메이크업 & Q&A",
    thumbnail: "/placeholder.svg?height=400&width=600&text=뷰티 라이브",
    category: "뷰티",
    viewers: 5432,
    host: {
      name: "이지유",
      avatar: "/placeholder.svg?height=40&width=40&text=JY",
    },
    duration: "00:52:18",
    isLive: true,
  },
  {
    id: 4,
    title: "오늘의 맛집 탐방",
    thumbnail: "/placeholder.svg?height=400&width=600&text=푸드 라이브",
    category: "푸드",
    viewers: 3456,
    host: {
      name: "최다은",
      avatar: "/placeholder.svg?height=40&width=40&text=DE",
    },
    duration: "01:15:30",
    isLive: true,
  },
  {
    id: 5,
    title: "팬미팅 사전 라이브",
    thumbnail: "/placeholder.svg?height=400&width=600&text=뉴진스 라이브",
    category: "K-POP",
    viewers: 15678,
    host: {
      name: "뉴진스",
      avatar: "/placeholder.svg?height=40&width=40&text=NJ",
    },
    duration: "00:45:20",
    isLive: true,
  },
  {
    id: 6,
    title: "일상 토크 & 팬과의 대화",
    thumbnail: "/placeholder.svg?height=400&width=600&text=토크 라이브",
    category: "토크/챗",
    viewers: 2345,
    host: {
      name: "박준혁",
      avatar: "/placeholder.svg?height=40&width=40&text=JH",
    },
    duration: "01:30:45",
    isLive: true,
  },
  {
    id: 7,
    title: "홈트레이닝 같이해요",
    thumbnail: "/placeholder.svg?height=400&width=600&text=피트니스 라이브",
    category: "피트니스",
    viewers: 4567,
    host: {
      name: "한소희",
      avatar: "/placeholder.svg?height=40&width=40&text=SH",
    },
    duration: "00:55:10",
    isLive: true,
  },
  {
    id: 8,
    title: "신상 하울 & 코디 팁",
    thumbnail: "/placeholder.svg?height=400&width=600&text=패션 라이브",
    category: "패션",
    viewers: 6789,
    host: {
      name: "김민서",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
    },
    duration: "01:10:25",
    isLive: true,
  },
  {
    id: 9,
    title: "내일 오후 8시 컴백 라이브",
    thumbnail: "/placeholder.svg?height=400&width=600&text=예정된 라이브",
    category: "K-POP",
    viewers: 0,
    host: {
      name: "카리나",
      avatar: "/placeholder.svg?height=40&width=40&text=KR",
    },
    scheduledFor: "2023-12-15 20:00:00",
    isLive: false,
  },
]

export default function LiveGrid() {
  const [lives, setLives] = useState(liveData)
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
    return <LiveLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">라이브 방송</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {lives.filter((live) => live.isLive).length}개 방송 중
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {lives.map((live, index) => (
          <motion.div
            key={live.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-800 h-full hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img
                  src={live.thumbnail || "/placeholder.svg"}
                  alt={live.title}
                  className="w-full aspect-video object-cover"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  {live.isLive ? (
                    <Badge className="bg-red-600 hover:bg-red-700">LIVE</Badge>
                  ) : (
                    <Badge className="bg-blue-600 hover:bg-blue-700">예정됨</Badge>
                  )}
                  <Badge variant="outline" className="bg-black/30 text-white border-0">
                    {live.category}
                  </Badge>
                </div>

                {live.isLive ? (
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {live.duration}
                  </div>
                ) : (
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-md">
                    {new Date(live.scheduledFor).toLocaleString("ko-KR", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                )}

                <motion.div
                  className="absolute inset-0 bg-purple-600/50 flex items-center justify-center opacity-0"
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/live/${live.id}`}>
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Play className="h-5 w-5 mr-2" />
                      {live.isLive ? "시청하기" : "알림 설정"}
                    </Button>
                  </Link>
                </motion.div>
              </div>

              <CardContent className="p-4">
                <Link href={`/live/${live.id}`}>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    {live.title}
                  </h3>
                </Link>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={live.host.avatar || "/placeholder.svg"} alt={live.host.name} />
                      <AvatarFallback>{live.host.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{live.host.name}</span>
                  </div>

                  {live.isLive && (
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Eye className="h-4 w-4 mr-1" />
                      {live.viewers.toLocaleString()}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
