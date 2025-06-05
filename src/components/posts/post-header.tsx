"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Zap } from "lucide-react";
export default function PostsHeader() {
  return (
    <div className="bg-gradient-to-r from-orange-400  via-orange-500 to-orange-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative w-full overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 left-8 w-16 h-16 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-12 right-16 w-8 h-8 bg-yellow-300 rounded-full animate-bounce"></div>
              <div className="absolute bottom-8 left-1/4 w-12 h-12 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-4 right-8 w-6 h-6 bg-orange-200 rounded-full animate-bounce delay-500"></div>
            </div>

            {/* Floating meme-style elements */}
            <div className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm rounded-full p-3 animate-float">
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            <div className="absolute bottom-8 left-8 bg-white/20 backdrop-blur-sm rounded-full p-3 animate-float delay-1000">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>

            <div className="absolute top-1/2 left-16 bg-white/20 backdrop-blur-sm rounded-full p-2 animate-float delay-500">
              <Zap className="w-4 h-4 text-white" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white font-medium text-sm">
                  {"최신 밈 컬렉션"}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
                {"인싸 밈 갤러리"}
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                {
                  "최신 유행하는 밈과 짤방을 한눈에 확인하세요. 오늘이 필요한 순간, 인싸이더의 밈 갤러리가 함께합니다."
                }
              </p>

              {/*   <div className="flex justify-center gap-4 mt-8 text-2xl">
                <span className="animate-bounce">🔥</span>
                <span className="animate-bounce delay-100">😎</span>
                <span className="animate-bounce delay-200">💯</span>
                <span className="animate-bounce delay-300">🚀</span>
              </div>*/}
            </div>

            <div className="absolute top-16 left-4 md:left-16 bg-white rounded-2xl p-4 shadow-lg transform -rotate-12 hidden md:block"></div>

            <div className="absolute bottom-16 right-4 md:right-16 bg-orange-300 rounded-2xl p-4 shadow-lg transform rotate-12 hidden md:block"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
