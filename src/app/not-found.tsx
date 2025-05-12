"use client";

import { Web3CubeLoader } from "@/components/loader";
import { motion } from "framer-motion";
import { Lock } from "lucide-react"; // 아이콘 라이브러리
import { useRouter, useSearchParams } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.keys();
  const isForbidden = error.next().value; // 접근 불가 상황 감지

  // 애니메이션 설정
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.04, boxShadow: "0 4px 24px 0 rgba(99,102,241,0.15)" },
    tap: { scale: 0.97 },
  };

  return (
    <motion.div
      className="flex h-[60vh] flex-col justify-center items-center text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Web3CubeLoader className="mb-6" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center"
      >
        {isForbidden ? (
          <>
            <Lock className="mx-auto mb-2 h-10 w-10 text-cyan-400 drop-shadow-glow" />
            <h2 className="text-3xl font-semibold text-cyan-400">접근 불가</h2>
            <p className="mt-4 text-gray-500">
              로그인 후 이용 가능한 서비스입니다.
            </p>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-semibold text-rose-600">
              404 Not Found
            </h2>
            <p className="mt-4 text-gray-500">
              해당 경로에 맞는 페이지를 찾을 수 없습니다.
            </p>
          </>
        )}
      </motion.div>
      <motion.div
        className="mt-8"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <motion.button
          type="button"
          onClick={() => router.back()}
          className={`
            group relative inline-flex items-center justify-center
            rounded-xl px-8 py-3 min-w-[180px] min-h-[52px]
            font-bold text-lg
            bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500
            text-white shadow-[0_2px_24px_0_rgba(99,102,241,0.15)]
            transition-all duration-200
            border-none outline-none
            focus:ring-2 focus:ring-cyan-400/60 focus:ring-offset-2
            hover:brightness-110 hover:shadow-[0_4px_32px_0_rgba(139,92,246,0.25)]
            active:scale-95
            overflow-hidden
          `}
          style={{
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: "0 6px 32px 0 rgba(139,92,246,0.25)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative z-10">메인으로 돌아가기</span>
          <span
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              boxShadow:
                "0 0 24px 8px rgba(34,211,238,0.25), 0 0 48px 16px rgba(168,85,247,0.15)",
              opacity: 0.7,
            }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
