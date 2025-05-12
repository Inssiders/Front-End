"use client";

import { motion } from "framer-motion";
import { Copyright, FileText, Lock } from "lucide-react";

export default function TermsHeader() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-10 md:py-14 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center gap-4 mb-4">
            <div className="flex flex-col items-center">
              <FileText className="h-7 w-7 mb-1" />
              <span className="text-xs font-medium">이용약관</span>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="h-7 w-7 mb-1" />
              <span className="text-xs font-medium">개인정보처리방침</span>
            </div>
            <div className="flex flex-col items-center">
              <Copyright className="h-7 w-7 mb-1" />
              <span className="text-xs font-medium">저작권 정책</span>
            </div>
          </div>
          <h1 className="md:text-4xl text-2xl font-semibold mb-2 tracking-tight leading-tight">
            인싸이더 약관 및 정책
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            인싸이더 서비스 이용에 관한 모든 약관과 정책을 한눈에 확인하세요.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
