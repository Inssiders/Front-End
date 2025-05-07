"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Award, Plus } from "lucide-react"
import Link from "next/link"

export default function ChallengesHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Award className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">인싸 챌린지</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">챌린지에 참여하세요</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              인싸이더의 다양한 챌린지에 참여하고 포인트와 배지를 획득하세요. 당신의 창의력을 보여줄 기회입니다!
            </p>
          </div>

          <Link href="/challenges/create">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 rounded-full">
              <Plus className="h-5 w-5 mr-2" />
              챌린지 만들기
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
