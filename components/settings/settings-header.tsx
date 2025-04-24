"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

export default function SettingsHeader() {
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
            <Settings className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">설정</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">계정 설정</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            계정 정보, 알림, 개인정보 보호 및 보안 설정을 관리하세요.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
