"use client";

import { motion } from "framer-motion";
import { Sparkles, Star, TrendingUp, Zap } from "lucide-react";
import { useMemo } from "react";

interface PostsHeaderProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  emojis?: string[];
  stats?: Array<{
    icon: any;
    label: string;
    value: string;
    color: string;
  }>;
  className?: string;
}

export default function PostsHeader({
  title = "밈 월드",
  subtitle = "🔥 핫한 밈부터 감성 짤까지! 지금 가장 트렌디한 콘텐츠를 만나보세요 💖",
  badge = "✨ 최신 밈 갤러리 ✨",
  emojis = ["🤩", "😎", "🔥", "💯", "✨", "🚀"],
  stats = [
    {
      icon: TrendingUp,
      label: "밈 콘텐츠",
      value: "50+",
      color: "from-pink-400 to-pink-600",
    },
  ],
  className = "",
}: PostsHeaderProps) {
  // Hydration 이슈 해결을 위해 랜덤 값들을 고정
  const particleData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      initialX: (i * 8.33) % 100, // 0-100% 사이 균등 분배
      animateX: (i * 11.5) % 100, // 다른 패턴으로 분배
      duration: 15 + (i % 5) * 2, // 15-23초 사이
      delay: (i % 4) * 1.25, // 0-3.75초 지연
    }));
  }, []);
  return (
    <div
      className={`relative min-h-[35vh] bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 overflow-hidden ${className}`}
    >
      {/* Page Background Elements - moved from page.tsx */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300/30 to-purple-300/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-cyan-300/30 to-blue-300/30 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-28 h-28 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-xl animate-pulse delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-gradient-to-r from-yellow-300/30 to-orange-300/30 rounded-full blur-xl animate-pulse delay-3000" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 105, 180, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 105, 180, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Header Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-200/30 via-purple-200/30 to-cyan-200/30 animate-pulse" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particleData.map((particle, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: particle.initialX + "vw", rotate: 0 }}
            animate={{
              y: "-20vh",
              x: [null, particle.animateX + "vw"],
              rotate: 360,
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
            className={`absolute w-2 h-2 rounded-full opacity-60 ${
              i % 4 === 0
                ? "bg-pink-400"
                : i % 4 === 1
                  ? "bg-purple-400"
                  : i % 4 === 2
                    ? "bg-cyan-400"
                    : "bg-yellow-400"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-6 rounded-full bg-white/80 backdrop-blur-md border border-pink-200/50 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-pink-500" />
            <span className="text-sm font-bold text-gray-800 tracking-wide">{badge}</span>
            <Star className="w-4 h-4 text-yellow-500" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-lg">
              {title}
            </span>
            <br />
            <span className="text-gray-800 text-3xl md:text-4xl lg:text-5xl">갤러리</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto mb-6 leading-relaxed font-medium"
          >
            {subtitle}
          </motion.p>

          {/* Emoji Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
            className="flex justify-center gap-4 text-2xl md:text-3xl mb-8"
          >
            {emojis.map((emoji, i) => (
              <motion.span
                key={emoji}
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="hover:scale-125 transition-transform cursor-pointer"
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] flex-shrink-0"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-3 mx-auto`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-black text-gray-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Action Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 left-8 hidden lg:block"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          className="absolute top-32 right-12 hidden lg:block"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, -25, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-16 hidden lg:block"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <Star className="w-7 h-7 text-white" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
