"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bgShapes, setBgShapes] = useState<any[]>([]);

  const slides = [
    {
      title: "트렌드의 모든 것을 한곳에서",
      description:
        "인스타그램, 틱톡, 유튜브 쇼츠 등 여러 플랫폼에 흩어진 밈, 인플루언서, 연예인 콘텐츠를 인싸이더가 한데 모아 제공합니다.",
      icon: <TrendingUp className="size-6 text-pink-500" />,
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "독점 콘텐츠와 큐레이션",
      description:
        "전문 에디터와 AI가 선별한 '인싸이더만의 콘텐츠'를 제공하며, 숨겨진 밈이나 트렌드를 발굴해 소개합니다.",
      icon: <Sparkles className="size-6 text-indigo-500" />,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "활발한 커뮤니티와 창작 중심",
      description:
        "단순히 콘텐츠를 소비하는 데 그치지 않고, 직접 밈을 만들고, 챌린지에 참여하며, 다른 사용자와 실시간으로 소통하세요.",
      icon: <Users className="size-6 text-purple-500" />,
      color: "from-purple-500 to-pink-600",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const shapes = Array.from({ length: 20 }).map(() => ({
      width: Math.random() * 100 + 50,
      height: Math.random() * 100 + 50,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      y: Math.random() * 100 - 50,
      x: Math.random() * 100 - 50,
      scale: Math.random() + 0.5,
      duration: Math.random() * 10 + 10,
    }));
    setBgShapes(shapes);
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-950"></div>

      {/* 배경 애니메이션 요소들 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {bgShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-200 to-purple-200 opacity-30 dark:from-pink-900/20 dark:to-purple-900/20"
            style={{
              width: shape.width,
              height: shape.height,
              left: shape.left,
              top: shape.top,
            }}
            animate={{
              y: [0, shape.y],
              x: [0, shape.x],
              scale: [1, shape.scale, 1],
            }}
            transition={{
              duration: shape.duration,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="container z-10 mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center rounded-full bg-white px-4 py-2 shadow-md dark:bg-gray-800"
            >
              {slides[currentSlide].icon}
              <span className="ml-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                {currentSlide === 0 ? "NEW" : currentSlide === 1 ? "HOT" : "TREND"}
              </span>
            </motion.div>

            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
              style={{
                backgroundImage: `linear-gradient(to right, ${slides[currentSlide].color
                  .split(" ")[0]
                  .replace("from-", "")}, ${slides[currentSlide].color
                  .split(" ")[1]
                  .replace("to-", "")})`,
              }}
            >
              {slides[currentSlide].title}
            </motion.h1>

            <motion.p
              key={`desc-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-8 max-w-xl text-lg text-gray-600 dark:text-gray-300 lg:mx-0"
            >
              {slides[currentSlide].description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <Button
                size="lg"
                className="rounded-full bg-purple-600 text-white hover:bg-purple-700"
              >
                시작하기
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full">
                  더 알아보기
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex justify-center lg:justify-start"
            >
              <div className="flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`size-3 rounded-full transition-all ${
                      currentSlide === index ? "w-6 bg-purple-600" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                    aria-label={`슬라이드 ${index + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* 모바일 디바이스 프레임 */}
              <div className="relative flex h-[780px] w-[360px] flex-col items-center overflow-hidden rounded-[2.5rem] border-[12px] border-gray-800 bg-black shadow-2xl dark:border-gray-700">
                {/* 상단 노치 */}
                <div className="absolute left-1/2 top-0 z-20 mt-1 h-5 w-32 -translate-x-1/2 rounded-b-2xl bg-gray-900"></div>
                {/* 사이드 버튼 */}
                <div className="absolute left-0 top-24 z-20 h-16 w-1.5 rounded-r-xl bg-gray-700"></div>
                <div className="absolute right-0 top-40 z-20 h-10 w-1.5 rounded-l-xl bg-gray-700"></div>
                {/* iframe으로 실제 페이지 표시 */}
                <div className="relative flex w-full flex-1 flex-col">
                  <iframe
                    src="http://localhost:3000/trending"
                    title="인싸이더 트렌딩"
                    className="size-full rounded-[2rem] border-0 bg-white dark:bg-gray-900"
                    style={{
                      minHeight: 0,
                      minWidth: 0,
                      flex: 1,
                      overflow: "auto",
                    }}
                    allow="clipboard-write; encrypted-media; picture-in-picture;"
                  />
                </div>
                {/* 홈 인디케이터 */}
                <div className="absolute bottom-3 left-1/2 z-20 h-2 w-20 -translate-x-1/2 rounded-full bg-gray-300 opacity-80 dark:bg-gray-700"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
