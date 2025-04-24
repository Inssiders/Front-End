"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

export default function CelebritiesHeader() {
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
            <Star className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">인기 연예인</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">연예인 소식</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            K-POP 아이돌, 배우, 예능인 등 인기 연예인들의 최신 소식과 활동을 확인하세요. 팬이라면 놓치지 말아야 할
            콘텐츠를 제공합니다.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
