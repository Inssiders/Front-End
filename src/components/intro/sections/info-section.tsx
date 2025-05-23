"use client";

import { Button } from "@/components/ui/button";
import { motion, MotionValue } from "framer-motion";
import Link from "next/link";

interface InfoSectionProps {
  secondSectionOpacity: MotionValue<number>;
  secondSectionY: MotionValue<number>;
  secondVisible: boolean;
}

export function InfoSection({
  secondSectionOpacity,
  secondSectionY,
  secondVisible,
}: InfoSectionProps) {
  return (
    <motion.section
      style={{ opacity: secondSectionOpacity, y: secondSectionY }}
      className={`fixed top-0 left-0 w-full flex flex-col justify-center items-center bg-cream-100 text-mocha-900 p-8 md:p-16 ${
        secondVisible ? "z-30" : "z-0"
      }`}
    >
      <div className="bg-white flex flex-col p-4 sm:p-6 overflow-hidden mt-16 sm:mt-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6"
        >
          <div className="space-y-2">
            <motion.div
              initial={{ rotate: -3, scale: 0.9 }}
              animate={{ rotate: -3, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="inline-block bg-black text-white px-3 py-1 ml-5 text-sm font-medium rounded-full transform -rotate-3"
            >
              밈 트렌드의
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex items-start"
            >
              <span className="text-5xl">❝</span>
              <div className="flex flex-row items-center space-x-2">
                <h1 className="text-5xl font-bold">
                  in
                  <motion.span
                    animate={{
                      color: ["#FF9142", "#FF7D29", "#FF9142"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                    className="text-[#FF9142]"
                  >
                    SS
                  </motion.span>
                  ider
                </h1>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-amber-700 text-sm"
            >
              지금 가장 인기있는 밈을 확인하세요!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-2 pt-1"
            >
              {["#트렌디", "#meme", "#요즘뜨는거"].map((tag, index) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05, backgroundColor: "#FFBB80" }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-start"
          >
            <div className="max-w-lg size-full">
              <motion.div
                whileHover={{
                  boxShadow:
                    "0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-orange-50 p-5 rounded-lg h-full flex flex-col justify-between hover:bg-orange-100/50 transition-colors duration-300"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h2 className="font-bold text-lg group flex items-center">
                      <motion.span whileHover={{ scale: 1.05 }}>
                        INSSIDER는?
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="ml-2 text-orange-400 text-sm"
                      >
                        ✨
                      </motion.span>
                    </h2>
                    <p className="text-sm mt-1">
                      밈과 유행의 중심, <strong>INSSIDER(인싸이더)</strong>는
                      지금 가장 뜨거운 트렌드를 한눈에 즐길 수 있는 밈 큐레이션
                      플랫폼입니다.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h2 className="font-bold text-lg group flex items-center">
                      <motion.span whileHover={{ scale: 1.05 }}>
                        어떻게 이용하나요?
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="ml-2 text-orange-400 text-sm"
                      >
                        🚀
                      </motion.span>
                    </h2>
                    <ul className="text-sm space-y-2 mt-1">
                      {[
                        {
                          icon: "💡",
                          title: "밈 갤러리",
                          content: "에서 카테고리별 최신 밈을 탐색하세요!",
                        },
                        {
                          icon: "🧭",
                          title: "카테고리 탐색",
                          content:
                            "으로 예능, 드라마, K-POP 등 다양한 주제를 골라보세요!",
                        },
                        {
                          icon: "🔍",
                          title: "검색 기능",
                          content: "으로 지금 핫한 키워드를 빠르게 찾아보세요.",
                        },
                        {
                          icon: "✏️",
                          title: "공감밈 제작",
                          content: "으로 나만의 콘텐츠를 만들어보세요!",
                        },
                        {
                          icon: "📱",
                          title: "모바일 최적화",
                          content:
                            "된 UI로 언제 어디서든 쾌적하게 밈을 즐겨보세요!",
                        },
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.6 + index * 0.1,
                            duration: 0.4,
                          }}
                          whileHover={{ x: 5 }}
                          className="flex gap-2 group"
                        >
                          <motion.span
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="flex-shrink-0 transition-transform duration-200"
                          >
                            {item.icon}
                          </motion.span>
                          <span>
                            <strong className="group-hover:text-orange-500 transition-colors duration-200">
                              {item.title}
                            </strong>
                            {item.content}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-start hidden md:block"
          >
            <div className="space-y-4 max-w-lg w-full">
              <motion.div
                whileHover={{
                  boxShadow:
                    "0 10px 25px -5px rgba(219, 39, 119, 0.1), 0 8px 10px -6px rgba(219, 39, 119, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="bg-gradient-to-r from-pink-300 via-purple-300 to-purple-400 text-gray-800 p-5 rounded-lg shadow-sm"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="font-bold text-lg mb-3 flex items-center"
                >
                  이런 분들께 추천해요!
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.6,
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    className="ml-2"
                  >
                    ✨
                  </motion.span>
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="mt-4 text-center"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Button className="bg-white text-purple-500 hover:bg-white/90 shadow-sm text-sm group relative overflow-hidden">
                    <Link href="posts">
                      <span className="relative z-10 group-hover:text-purple-700 transition-colors duration-200">
                        지금 인기 밈 보러가기
                      </span>
                    </Link>
                    <motion.span
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 h-1 bg-purple-200"
                    />
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                whileHover={{
                  boxShadow:
                    "0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)",
                }}
                className="bg-orange-50 p-5 rounded-lg hover:bg-orange-100/50 transition-colors duration-300"
              >
                <h2 className="font-bold text-lg mb-3 flex items-center">
                  INSSIDER 특징
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 0.8,
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    }}
                    className="ml-2"
                  >
                    🌟
                  </motion.span>
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      icon: "🔥",
                      title: "실시간 트렌드",
                      desc: "매일 업데이트되는 최신 밈",
                    },
                    {
                      icon: "🌈",
                      title: "다양한 카테고리",
                      desc: "주제별 밈 탐색",
                    },
                    {
                      icon: "🔍",
                      title: "스마트 검색",
                      desc: "키워드로 빠른 검색",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.9 + index * 0.1,
                        duration: 0.4,
                      }}
                      whileHover={{ y: -5 }}
                      className="text-center cursor-pointer group"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          rotate: 10,
                          backgroundColor: "#FFBB80",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 10,
                        }}
                        className="bg-orange-100 rounded-full h-10 w-10 flex items-center justify-center mx-auto mb-2 transition-colors duration-200"
                      >
                        <span>{item.icon}</span>
                      </motion.div>
                      <h3 className="font-medium text-xs group-hover:text-orange-600 transition-colors duration-200">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-600">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </main>
      </div>
    </motion.section>
  );
}
