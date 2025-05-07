"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export default function MemesHeader() {
  return (
    <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Sparkles className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">최신 밈 컬렉션</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">인싸 밈 갤러리</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            최신 유행하는 밈과 짤방을 한눈에 확인하세요. 웃음이 필요한 순간, 인싸이더의 밈 갤러리가 함께합니다.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
