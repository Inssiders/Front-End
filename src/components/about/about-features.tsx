"use client";

import { motion } from "framer-motion";
import { Bell, Globe, Zap } from "lucide-react";

export default function AboutFeatures() {
  const FEATURES = [
    {
      title: "맞춤형 추천 및 알림",
      icon: <Bell className="h-10 w-10 text-purple-600" />,
      description:
        "사용자가 관심 분야(연예인, K-POP 그룹, 유행어 등)를 선택하면, AI가 개인화된 트렌드와 밈을 실시간으로 추천합니다. 좋아하는 아이돌이나 주제의 짤·영상이 급상승하면 푸시 알림으로 즉시 알려주어, 팬덤 참여와 트렌드 반응 속도를 극대화합니다.",
    },
    {
      title: "실시간 크로스 플랫폼 통합",
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      description:
        "유튜브, 틱톡, 인스타그램, 블로그, 뉴스 등 다양한 플랫폼에서 실시간 인기 트렌드를 AI가 자동 수집·가공합니다. 인기 밈 영상·짤·밈어를 선별하고, 해설과 함께 제공하여 신속하고 깊이 있게 트렌드를 파악할 수 있습니다.",
    },
    {
      title: "최신/마이너 트렌드의 신속한 제공",
      icon: <Zap className="h-10 w-10 text-yellow-400" />,
      description:
        "인싸이더는 캐릿 등 기존 플랫폼보다 더 빠르고 정확하게 최신 밈 트렌드를 제공합니다. 타 플랫폼에서 제공하지 않는 마이너한 트렌드까지 놓치지 않고, 차별화된 트렌드 경험을 선사합니다. 방문할 때마다 최신 트렌드를 만날 수 있습니다.",
    },
  ];

  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            주요 기능
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            인싸이더는 다양한 소스의 트렌드를 선별·해설하여, 누구보다 빠르고
            정확하게 최신 밈과 문화를 경험할 수 있는 플랫폼입니다.
            <br />
            <span className="font-semibold text-primary">
              최신 밈 트렌드를 제공하고, 정확하게 제공하거나 제공하지 않는 밈을
              제공합니다.
            </span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
