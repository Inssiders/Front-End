"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, ThumbsUp, Award, Share2, Video, Users } from "lucide-react"

export default function PointsExplained() {
  const pointsActivities = [
    {
      icon: <MessageSquare className="h-8 w-8 text-purple-600" />,
      title: "댓글 작성",
      points: "+5 포인트",
      description: "다른 사용자의 게시물에 댓글을 작성하면 포인트가 적립됩니다.",
    },
    {
      icon: <ThumbsUp className="h-8 w-8 text-purple-600" />,
      title: "좋아요",
      points: "+2 포인트",
      description: "게시물에 좋아요를 누르면 포인트가 적립됩니다.",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "챌린지 참여",
      points: "+50~200 포인트",
      description: "챌린지에 참여하고 완료하면 포인트가 적립됩니다.",
    },
    {
      icon: <Share2 className="h-8 w-8 text-purple-600" />,
      title: "콘텐츠 공유",
      points: "+10 포인트",
      description: "인싸이더 콘텐츠를 SNS에 공유하면 포인트가 적립됩니다.",
    },
    {
      icon: <Video className="h-8 w-8 text-purple-600" />,
      title: "콘텐츠 업로드",
      points: "+100 포인트",
      description: "밈, 영상 등 콘텐츠를 업로드하면 포인트가 적립됩니다.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "친구 초대",
      points: "+200 포인트",
      description: "친구를 초대하고 가입하면 포인트가 적립됩니다.",
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">포인트 적립 방법</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            인싸이더에서 다양한 활동을 통해 포인트를 적립하고 레벨을 올려보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pointsActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">{activity.icon}</div>
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mr-3">{activity.title}</h3>
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                          {activity.points}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{activity.description}</p>
                    </div>
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
