"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, Smartphone, Zap, Shield, Sparkles } from "lucide-react"

export default function DownloadAppSection() {
  const features = [
    {
      icon: <Smartphone className="h-6 w-6 text-purple-600" />,
      title: "앱처럼 사용하기",
      description: "홈 화면에 추가하여 앱처럼 사용할 수 있어요.",
    },
    {
      icon: <Zap className="h-6 w-6 text-purple-600" />,
      title: "빠른 로딩 속도",
      description: "한번 방문한 페이지는 더 빠르게 로딩됩니다.",
    },
    {
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      title: "오프라인 지원",
      description: "인터넷 연결이 없어도 기본 기능을 사용할 수 있어요.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-600" />,
      title: "푸시 알림",
      description: "최신 트렌드와 소식을 알림으로 받아보세요.",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">인싸이더를 앱으로 설치하세요</h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              인싸이더는 PWA(Progressive Web App)로 제작되어 앱처럼 설치하고 사용할 수 있습니다. 홈 화면에 추가하여 더
              빠르고 편리하게 이용해보세요.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="mr-4 mt-1 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 rounded-full">
              <Download className="mr-2 h-5 w-5" />앱 설치하기
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-xs">
              {/* 모바일 디바이스 프레임 */}
              <div className="relative rounded-[2.5rem] border-8 border-gray-800 dark:border-gray-700 overflow-hidden shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 dark:bg-gray-700 z-10 rounded-t-lg"></div>

                {/* 앱 스크린샷 */}
                <div className="aspect-[9/19] bg-white overflow-hidden">
                  <img
                    src="/placeholder.svg?height=800&width=400&text=인싸이더 앱 화면"
                    alt="인싸이더 앱 화면"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 홈 버튼 */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-800 dark:bg-gray-700 rounded-full"></div>
              </div>

              {/* 장식 요소들 */}
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  y: [0, -5, 0, 5, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-2xl opacity-70 blur-xl"
              />

              <motion.div
                animate={{
                  rotate: [0, -10, 0, 10, 0],
                  y: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-indigo-400 to-purple-500 rounded-full opacity-70 blur-xl"
              />

              {/* 설치 안내 화살표 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
                className="absolute -top-16 right-0 flex items-center"
              >
                <div className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm font-medium">
                  홈 화면에 추가하기
                </div>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path
                    d="M15 25L5 15L15 5"
                    stroke="#9333EA"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
