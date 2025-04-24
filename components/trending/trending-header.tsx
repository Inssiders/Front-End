"use client"

import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export default function TrendingHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <TrendingUp className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">실시간 인기 트렌드</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">지금 뜨는 트렌드</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            인싸이더가 엄선한 최신 트렌드를 확인하세요. 밈, 인플루언서, 연예인 소식까지 한눈에 볼 수 있습니다.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
