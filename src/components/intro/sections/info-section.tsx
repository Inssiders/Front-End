"use client";

import { Button } from "@/components/ui/button";
import { motion, MotionValue } from "framer-motion";
import Link from "next/link";
import styles from "./info-section.module.css";

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
      className={`${styles.infoContainer} ${secondVisible ? "z-30" : "z-0"}`}
    >
      <div className={styles.contentWrapper}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.headerContainer}
        >
          <div className={styles.headerSpace}>
            <motion.div
              initial={{ rotate: -3, scale: 0.9 }}
              animate={{ rotate: -3, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className={styles.trendBadge}
            >
              밈 트렌드의
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className={styles.titleContainer}
            >
              <span className={styles.quoteSymbol}>❝</span>
              <div className={styles.brandLetters}>
                <h1 className={styles.mainTitle}>
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
                    className={styles.specialLetter}
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
              className={styles.description}
            >
              지금 가장 인기있는 밈을 확인하세요!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={styles.tagsContainer}
            >
              {["#트렌디", "#meme", "#요즘뜨는거"].map((tag, index) => (
                <motion.span
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                  className={styles.tag}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <main className={styles.mainGrid}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-start"
          >
            <div className="size-full max-w-lg">
              <motion.div
                whileHover={{
                  boxShadow:
                    "0 10px 25px -5px rgba(249, 115, 22, 0.1), 0 8px 10px -6px rgba(249, 115, 22, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="flex h-full flex-col justify-between rounded-lg bg-orange-50 p-5 transition-colors duration-300 hover:bg-orange-100/50"
              >
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <h2 className="group flex items-center text-lg font-bold">
                      <motion.span whileHover={{ scale: 1.05 }}>INSSIDER는?</motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="ml-2 text-sm text-orange-400"
                      >
                        ✨
                      </motion.span>
                    </h2>
                    <p className="mt-1 text-sm">
                      밈과 유행의 중심, <strong>INSSIDER(인싸이더)</strong>는 지금 가장 뜨거운
                      트렌드를 한눈에 즐길 수 있는 밈 큐레이션 플랫폼입니다.
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <h2 className="group flex items-center text-lg font-bold">
                      <motion.span whileHover={{ scale: 1.05 }}>어떻게 이용하나요?</motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7, duration: 0.4 }}
                        className="ml-2 text-sm text-orange-400"
                      >
                        🚀
                      </motion.span>
                    </h2>
                    <ul className="mt-1 space-y-2 text-sm">
                      {[
                        {
                          icon: "💡",
                          title: "밈 갤러리",
                          content: "에서 카테고리별 최신 밈을 탐색하세요!",
                        },
                        {
                          icon: "🧭",
                          title: "카테고리 탐색",
                          content: "으로 예능, 드라마, K-POP 등 다양한 주제를 골라보세요!",
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
                          content: "된 UI로 언제 어디서든 쾌적하게 밈을 즐겨보세요!",
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
                          className="group flex gap-2"
                        >
                          <motion.span
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            className="shrink-0 transition-transform duration-200"
                          >
                            {item.icon}
                          </motion.span>
                          <span>
                            <strong className="transition-colors duration-200 group-hover:text-orange-500">
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
            className="hidden md:block"
          >
            <div className="w-full max-w-lg space-y-4">
              <motion.div
                whileHover={{
                  boxShadow:
                    "0 10px 25px -5px rgba(219, 39, 119, 0.1), 0 8px 10px -6px rgba(219, 39, 119, 0.1)",
                }}
                transition={{ duration: 0.2 }}
                className="rounded-lg bg-gradient-to-r from-pink-300 via-purple-300 to-purple-400 p-5 text-gray-800 shadow-sm"
              >
                <motion.h2
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="mb-3 flex items-center text-lg font-bold"
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
                  <Button className="group relative overflow-hidden bg-white text-sm text-purple-500 shadow-sm hover:bg-white/90">
                    <Link href="posts">
                      <span className="relative z-10 transition-colors duration-200 group-hover:text-purple-700">
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
                className="rounded-lg bg-orange-50 p-5 transition-colors duration-300 hover:bg-orange-100/50"
              >
                <h2 className="mb-3 flex items-center text-lg font-bold">
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
                      className="group cursor-pointer text-center"
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
                        className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-orange-100 transition-colors duration-200"
                      >
                        <span>{item.icon}</span>
                      </motion.div>
                      <h3 className="text-xs font-medium transition-colors duration-200 group-hover:text-orange-600">
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
