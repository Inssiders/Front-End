"use client";

import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function FaqHeader() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-16 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-white/20 p-2 backdrop-blur-sm">
            <HelpCircle className="mr-2 size-5" />
            <span className="text-sm font-medium">도움말</span>
          </div>
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">자주 묻는 질문</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            인싸이더 이용에 관한 궁금증을 해결해드립니다. 원하는 답변을 찾지 못하셨다면 문의하기를
            통해 연락주세요.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
