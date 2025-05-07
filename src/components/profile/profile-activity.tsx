"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, Award, Upload, UserPlus } from "lucide-react"
import Link from "next/link"

// 활동 내역 데이터 (실제로는 API에서 가져올 것)
const activityData = [
  {
    id: 301,
    type: "like",
    content: {
      id: 101,
      title: "요즘 대세 '아무말 대잔치' 밈 모음",
      link: "/trending/101",
    },
    timestamp: "1시간 전",
    icon: <Heart className="h-5 w-5 text-pink-500" />,
  },
  {
    id: 302,
    type: "comment",
    content: {
      id: 102,
      title: "BTS 정국 '3D' 챌린지 열풍",
      link: "/trending/102",
      comment: "정국 춤선 진짜 대박이에요! 저도 도전해봐야겠어요 ㅎㅎ",
    },
    timestamp: "3시간 전",
    icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 303,
    type: "challenge",
    content: {
      id: 103,
      title: "댄스 챌린지: 뉴진스 'ETA'",
      link: "/challenges/103",
    },
    timestamp: "5시간 전",
    icon: <Award className="h-5 w-5 text-purple-500" />,
  },
  {
    id: 304,
    type: "share",
    content: {
      id: 104,
      title: "이 드라마 장면이 새로운 밈으로 등극",
      link: "/trending/104",
      platform: "Instagram",
    },
    timestamp: "1일 전",
    icon: <Share2 className="h-5 w-5 text-green-500" />,
  },
  {
    id: 305,
    type: "upload",
    content: {
      id: 105,
      title: "나만의 '아무말 대잔치' 밈 버전",
      link: "/posts/105",
    },
    timestamp: "2일 전",
    icon: <Upload className="h-5 w-5 text-amber-500" />,
  },
  {
    id: 306,
    type: "follow",
    content: {
      id: 106,
      name: "김민서",
      username: "@minseo_style",
      link: "/profile/minseo_style",
      avatar: "/placeholder.svg?height=40&width=40&text=MS",
    },
    timestamp: "3일 전",
    icon: <UserPlus className="h-5 w-5 text-indigo-500" />,
  },
]

export default function ProfileActivity() {
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

  const renderActivityContent = (activity: any) => {
    switch (activity.type) {
      case "like":
        return (
          <div>
            <span className="font-medium">좋아요</span>를 눌렀습니다:
            <Link href={activity.content.link} className="ml-1 text-purple-600 dark:text-purple-400 hover:underline">
              {activity.content.title}
            </Link>
          </div>
        )
      case "comment":
        return (
          <div>
            <div>
              <span className="font-medium">댓글</span>을 남겼습니다:
              <Link href={activity.content.link} className="ml-1 text-purple-600 dark:text-purple-400 hover:underline">
                {activity.content.title}
              </Link>
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
              "{activity.content.comment}"
            </div>
          </div>
        )
      case "challenge":
        return (
          <div>
            <span className="font-medium">챌린지</span>에 참여했습니다:
            <Link href={activity.content.link} className="ml-1 text-purple-600 dark:text-purple-400 hover:underline">
              {activity.content.title}
            </Link>
          </div>
        )
      case "share":
        return (
          <div>
            <span className="font-medium">공유</span>했습니다:
            <Link href={activity.content.link} className="ml-1 text-purple-600 dark:text-purple-400 hover:underline">
              {activity.content.title}
            </Link>
            <span className="ml-1 text-gray-500 dark:text-gray-400">({activity.content.platform}에)</span>
          </div>
        )
      case "upload":
        return (
          <div>
            <span className="font-medium">업로드</span>했습니다:
            <Link href={activity.content.link} className="ml-1 text-purple-600 dark:text-purple-400 hover:underline">
              {activity.content.title}
            </Link>
          </div>
        )
      case "follow":
        return (
          <div className="flex items-center">
            <span className="font-medium mr-1">팔로우</span>했습니다:
            <Link href={activity.content.link} className="flex items-center ml-1">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarImage src={activity.content.avatar || "/placeholder.svg"} alt={activity.content.name} />
                <AvatarFallback>{activity.content.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-purple-600 dark:text-purple-400 hover:underline">{activity.content.username}</span>
            </Link>
          </div>
        )
      default:
        return <div>알 수 없는 활동</div>
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">최근 활동</h2>
      </div>

      <Card className="border-0 bg-white dark:bg-gray-800">
        <CardContent className="p-6">
          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {activityData.map((activity) => (
              <motion.div
                key={activity.id}
                variants={item}
                className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50"
              >
                <div className="mr-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800">{activity.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-gray-900 dark:text-white">{renderActivityContent(activity)}</div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {activity.timestamp}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  )
}
