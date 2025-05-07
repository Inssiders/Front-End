"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Plus } from "lucide-react"
import Link from "next/link"

export default function CreatorStudioHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">인싸 크리에이터 스튜디오</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">당신의 창의력을 보여주세요</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              밈, 짤방, 영상을 제작하고 공유하세요. 인싸이더의 크리에이터 스튜디오에서 당신만의 콘텐츠를 만들어보세요.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link href="/creator-studio/create">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 rounded-full">
                <Plus className="h-5 w-5 mr-2" />새 콘텐츠 만들기
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
