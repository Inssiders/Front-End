"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Zap, Shield, Sparkles } from "lucide-react";

export default function DownloadAppSection() {
  const features = [
    {
      icon: <Smartphone className="size-6 text-purple-600" />,
      title: "앱처럼 사용하기",
      description: "홈 화면에 추가하여 앱처럼 사용할 수 있어요.",
    },
    {
      icon: <Zap className="size-6 text-purple-600" />,
      title: "빠른 로딩 속도",
      description: "한번 방문한 페이지는 더 빠르게 로딩됩니다.",
    },
    {
      icon: <Shield className="size-6 text-purple-600" />,
      title: "오프라인 지원",
      description: "인터넷 연결이 없어도 기본 기능을 사용할 수 있어요.",
    },
    {
      icon: <Sparkles className="size-6 text-purple-600" />,
      title: "푸시 알림",
      description: "최신 트렌드와 소식을 알림으로 받아보세요.",
    },
  ];

  return (
    <section className="overflow-hidden bg-white py-20 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              인싸이더를 앱으로 설치하세요
            </h2>

            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              인싸이더는 PWA(Progressive Web App)로 제작되어 앱처럼 설치하고 사용할 수 있습니다. 홈
              화면에 추가하여 더 빠르고 편리하게 이용해보세요.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <div className="mr-4 mt-1 rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700">
              <Download className="mr-2 size-5" />앱 설치하기
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
              <div className="relative overflow-hidden rounded-[2.5rem] border-8 border-gray-800 shadow-2xl dark:border-gray-700">
                <div className="absolute inset-x-0 top-0 z-10 h-6 rounded-t-lg bg-gray-800 dark:bg-gray-700"></div>

                {/* 앱 스크린샷 */}
                <div className="aspect-[9/19] overflow-hidden bg-white">
                  <img
                    src="/placeholder.svg?height=800&width=400&text=인싸이더 앱 화면"
                    alt="인싸이더 앱 화면"
                    className="size-full object-cover"
                  />
                </div>

                {/* 홈 버튼 */}
                <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-gray-800 dark:bg-gray-700"></div>
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
                className="absolute -right-10 -top-10 size-24 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 opacity-70 blur-xl"
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
                className="absolute -bottom-10 -left-10 size-32 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 opacity-70 blur-xl"
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
                <div className="rounded-lg bg-purple-600 px-3 py-2 text-sm font-medium text-white">
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
  );
}
