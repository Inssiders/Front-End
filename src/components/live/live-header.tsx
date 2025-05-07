"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Video, Plus } from "lucide-react"
import Link from "next/link"

export default function LiveHeader() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="inline-flex items-center justify-center p-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
              <Video className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">인싸이더 라이브</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">실시간 스트리밍</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              인기 인플루언서와 크리에이터들의 실시간 방송을 시청하세요. 라이브 채팅으로 소통하고 다양한 콘텐츠를
              즐겨보세요.
            </p>
          </div>

          <div className="flex space-x-4">
            <Link href="/live/create">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 rounded-full">
                <Plus className="h-5 w-5 mr-2" />
                라이브 시작하기
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
