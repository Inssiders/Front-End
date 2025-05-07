"use client"

import { motion } from "framer-motion"

export default function AboutHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">인싸이더 소개</h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            인싸이더는 MZ세대를 위한 트렌디한 콘텐츠 플랫폼입니다. 밈, 인플루언서, 연예인, 챌린지 등 다양한 콘텐츠를
            제공하며 인싸 문화의 중심이 되고자 합니다.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
