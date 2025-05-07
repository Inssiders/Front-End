"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Star, Ticket, ShoppingBag, Coffee, Zap } from "lucide-react"

export default function PointsRewards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // 보상 데이터 (실제로는 API에서 가져올 것)
  const rewards = [
    {
      id: 1,
      title: "프리미엄 배지",
      description: "프로필에 표시되는 특별한 배지를 획득하세요.",
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      points: 1000,
      category: "배지",
      isAvailable: true,
    },
    {
      id: 2,
      title: "콘서트 티켓",
      description: "인기 K-POP 아티스트의 콘서트 티켓을 획득하세요.",
      icon: <Ticket className="h-8 w-8 text-pink-500" />,
      points: 5000,
      category: "이벤트",
      isAvailable: true,
    },
    {
      id: 3,
      title: "쇼핑 포인트",
      description: "온라인 쇼핑몰에서 사용할 수 있는 포인트를 획득하세요.",
      icon: <ShoppingBag className="h-8 w-8 text-green-500" />,
      points: 3000,
      category: "쇼핑",
      isAvailable: true,
    },
    {
      id: 4,
      title: "커피 기프티콘",
      description: "스타벅스 아메리카노 기프티콘을 획득하세요.",
      icon: <Coffee className="h-8 w-8 text-brown-500" />,
      points: 2000,
      category: "기프티콘",
      isAvailable: false,
    },
    {
      id: 5,
      title: "프리미엄 멤버십",
      description: "1개월 동안 프리미엄 멤버십 혜택을 누리세요.",
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      points: 10000,
      category: "멤버십",
      isAvailable: true,
    },
    {
      id: 6,
      title: "팬미팅 초대권",
      description: "인기 연예인의 팬미팅 초대권을 획득하세요.",
      icon: <Star className="h-8 w-8 text-blue-500" />,
      points: 8000,
      category: "이벤트",
      isAvailable: true,
    },
  ]

  return (
    <div className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
            <Gift className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">포인트 보상</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">포인트로 교환 가능한 보상</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            모은 포인트로 다양한 보상을 교환해보세요. 배지, 기프티콘, 이벤트 티켓 등 다양한 혜택이 준비되어 있습니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card
                className={`h-full border-0 ${
                  reward.isAvailable ? "bg-gray-50 dark:bg-gray-900" : "bg-gray-100 dark:bg-gray-800 opacity-70"
                } hover:shadow-md transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm">{reward.icon}</div>
                    <Badge
                      className={`${
                        reward.category === "배지"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : reward.category === "이벤트"
                            ? "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300"
                            : reward.category === "쇼핑"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : reward.category === "기프티콘"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
                                : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                      }`}
                    >
                      {reward.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{reward.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{reward.description}</p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="font-bold text-purple-600 dark:text-purple-400">
                      {reward.points.toLocaleString()} P
                    </div>
                    <Button
                      className={`rounded-full ${
                        !reward.isAvailable
                          ? "bg-gray-300 text-gray-600 hover:bg-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                      disabled={!reward.isAvailable}
                    >
                      {reward.isAvailable ? "교환하기" : "품절"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
