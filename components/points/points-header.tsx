"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, TrendingUp, Gift } from "lucide-react"
import Link from "next/link"

export default function PointsHeader() {
  // 실제로는 사용자 데이터를 API에서 가져올 것
  const userData = {
    points: 5280,
    level: 23,
    rank: 456,
    badges: 12,
  }

  return (
    <div className="bg-gradient-to-r from-amber-500 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Award className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">인싸 포인트</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">인싸 포인트 시스템</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            활동하고, 참여하고, 공유하면서 인싸 포인트를 모아보세요. 다양한 혜택과 보상이 기다리고 있습니다.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-md border-0 text-white">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1">내 포인트</h3>
                  <p className="text-3xl font-bold text-amber-300">{userData.points.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1">인싸 레벨</h3>
                  <p className="text-3xl font-bold text-amber-300">Lv.{userData.level}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1">랭킹</h3>
                  <p className="text-3xl font-bold text-amber-300">#{userData.rank}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-1">획득 배지</h3>
                  <p className="text-3xl font-bold text-amber-300">{userData.badges}개</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <Link href="/challenges">
                  <Button className="bg-white text-purple-600 hover:bg-white/90 rounded-full w-full sm:w-auto">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    포인트 모으기
                  </Button>
                </Link>
                <Link href="/points/rewards">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 rounded-full w-full sm:w-auto"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    보상 교환하기
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
