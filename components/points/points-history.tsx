"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp, Award, Share2, Video, Gift } from "lucide-react"

export default function PointsHistory() {
  // 포인트 내역 데이터 (실제로는 API에서 가져올 것)
  const historyData = [
    {
      id: 1,
      type: "earn",
      activity: "챌린지 참여",
      points: 100,
      date: "2023-12-15 14:23",
      icon: <Award className="h-5 w-5 text-purple-600" />,
    },
    {
      id: 2,
      type: "earn",
      activity: "댓글 작성",
      points: 5,
      date: "2023-12-15 10:45",
      icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
    },
    {
      id: 3,
      type: "earn",
      activity: "콘텐츠 업로드",
      points: 100,
      date: "2023-12-14 16:32",
      icon: <Video className="h-5 w-5 text-purple-600" />,
    },
    {
      id: 4,
      type: "spend",
      activity: "프리미엄 배지 교환",
      points: -1000,
      date: "2023-12-13 09:15",
      icon: <Gift className="h-5 w-5 text-red-600" />,
    },
    {
      id: 5,
      type: "earn",
      activity: "좋아요 받음",
      points: 10,
      date: "2023-12-12 20:45",
      icon: <ThumbsUp className="h-5 w-5 text-purple-600" />,
    },
    {
      id: 6,
      type: "earn",
      activity: "콘텐츠 공유",
      points: 10,
      date: "2023-12-12 18:30",
      icon: <Share2 className="h-5 w-5 text-purple-600" />,
    },
    {
      id: 7,
      type: "spend",
      activity: "커피 기프티콘 교환",
      points: -2000,
      date: "2023-12-10 11:20",
      icon: <Gift className="h-5 w-5 text-red-600" />,
    },
  ]

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">포인트 내역</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            최근 포인트 적립 및 사용 내역을 확인해보세요.
          </p>
        </motion.div>

        <Card className="border-0 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-xl">최근 포인트 내역</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historyData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50"
                >
                  <div className="flex items-center">
                    <div className="mr-4">{item.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.activity}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <div>
                    <Badge
                      className={`${
                        item.type === "earn"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                    >
                      {item.type === "earn" ? "+" : ""}
                      {item.points.toLocaleString()} P
                    </Badge>
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
