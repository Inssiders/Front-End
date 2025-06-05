"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 py-20 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            인싸이더와 함께 트렌드를 선도하세요
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/80">
            지금 가입하고 MZ세대의 트렌디한 콘텐츠를 경험해보세요. 인싸이더에서 당신만의 인싸
            라이프를 시작하세요.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button size="lg" className="rounded-full bg-white text-purple-600 hover:bg-white/90">
                지금 시작하기
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-white text-purple-600 hover:bg-white/90">
                문의하기
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
