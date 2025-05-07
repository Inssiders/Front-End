"use client"

import { motion } from "framer-motion"
import { Users } from "lucide-react"

export default function InfluencersHeader() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Users className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">인기 인플루언서</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">인플루언서 탐색</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            다양한 분야의 인기 인플루언서들을 만나보세요. 패션, 뷰티, 라이프스타일, 게임 등 관심 분야의 인플루언서를
            팔로우하고 최신 트렌드를 확인하세요.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
