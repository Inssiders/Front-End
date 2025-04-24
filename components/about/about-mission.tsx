"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Users, Zap, Globe } from "lucide-react"

export default function AboutMission() {
  const missions = [
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "트렌드 큐레이션",
      description:
        "다양한 플랫폼에 흩어진 트렌드와 콘텐츠를 큐레이션하여 MZ세대가 쉽게 접근할 수 있는 원스톱 플랫폼을 제공합니다.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "커뮤니티 형성",
      description: "같은 관심사를 가진 사용자들이 모여 소통하고 공유할 수 있는 활발한 커뮤니티를 만들어갑니다.",
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-600" />,
      title: "창작 지원",
      description: "크리에이터들이 자신만의 콘텐츠를 제작하고 공유할 수 있는 다양한 도구와 플랫폼을 제공합니다.",
    },
    {
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      title: "글로벌 확장",
      description:
        "한국의 인싸 문화를 글로벌 시장에 소개하고, 다양한 문화권의 트렌드를 국내에 소개하는 가교 역할을 합니다.",
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
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">우리의 미션</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            인싸이더는 MZ세대의 문화와 트렌드를 선도하고, 창의적인 콘텐츠 생태계를 구축하는 것을 목표로 합니다.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full">{mission.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{mission.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{mission.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
