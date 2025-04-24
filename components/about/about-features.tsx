"use client"

import { motion } from "framer-motion"
import { TrendingUp, Sparkles, Users, Award, Video, Zap } from "lucide-react"

export default function AboutFeatures() {
  const features = [
    {
      icon: <TrendingUp className="h-10 w-10 text-purple-600" />,
      title: "트렌딩",
      description: "실시간으로 업데이트되는 인기 트렌드와 콘텐츠를 확인할 수 있습니다.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-pink-600" />,
      title: "밈",
      description: "최신 유행하는 밈과 짤방을 한눈에 확인하고 공유할 수 있습니다.",
    },
    {
      icon: <Users className="h-10 w-10 text-indigo-600" />,
      title: "인플루언서",
      description: "다양한 분야의 인기 인플루언서들을 팔로우하고 소통할 수 있습니다.",
    },
    {
      icon: <Award className="h-10 w-10 text-amber-600" />,
      title: "챌린지",
      description: "재미있는 챌린지에 참여하고 인싸 포인트를 획득할 수 있습니다.",
    },
    {
      icon: <Video className="h-10 w-10 text-red-600" />,
      title: "라이브",
      description: "인기 크리에이터들의 실시간 방송을 시청하고 소통할 수 있습니다.",
    },
    {
      icon: <Zap className="h-10 w-10 text-green-600" />,
      title: "크리에이터 스튜디오",
      description: "나만의 콘텐츠를 제작하고 공유할 수 있는 다양한 도구를 제공합니다.",
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">주요 기능</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            인싸이더는 다양한 기능을 통해 MZ세대의 트렌드와 문화를 경험할 수 있는 플랫폼을 제공합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
