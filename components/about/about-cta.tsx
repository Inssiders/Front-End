"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function AboutCTA() {
  return (
    <div className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">인싸이더와 함께 트렌드를 선도하세요</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            지금 가입하고 MZ세대의 트렌디한 콘텐츠를 경험해보세요. 인싸이더에서 당신만의 인싸 라이프를 시작하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 rounded-full">
                지금 시작하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full">
                문의하기
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
