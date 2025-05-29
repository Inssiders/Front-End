"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <motion.div
        className="size-2 rounded-full bg-gray-500"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="size-2 rounded-full bg-gray-500"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.2,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="size-2 rounded-full bg-gray-500"
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: 0.4,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 transition-all sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "z-[0] max-h-[340px] min-h-[240px] max-w-[340px] rounded-md bg-gray-200 object-cover",
            className
          )}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}
export function FullPageLoader() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-screen w-full flex-col justify-center bg-white">
      <motion.div
        className="m-auto size-10 rounded-full border-4 border-current border-t-transparent text-gray-400"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        로딩 중...
      </motion.p>
    </div>
  );
}

export function PrimaryLoader({ className }: { className?: string }) {
  return (
    <div className="z-50 flex min-h-screen flex-col justify-center">
      <div className="flex items-center justify-center gap-5">
        <motion.div
          className="size-2 rounded-full bg-rose-600"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="size-2 rounded-full bg-rose-600"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="size-2 rounded-full bg-rose-600"
          animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}

export function Web3CubeLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[120px]",
        className
      )}
    >
      <motion.div
        className="relative w-12 h-12"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
      >
        {/* 네온 큐브 */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 via-purple-500 to-fuchsia-500 blur-[2px] opacity-80 animate-pulse" />
        <div className="absolute inset-0 rounded-lg border-2 border-cyan-400/60 shadow-[0_0_16px_4px_rgba(99,102,241,0.4)]" />
        <div className="absolute inset-1 rounded-md bg-black/80" />
        {/* 중앙에 Web3 아이콘 느낌의 점 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_12px_4px_rgba(99,102,241,0.7)] animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}

export function Web3PulseLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-[120px]",
        className
      )}
    >
      <motion.div
        className="relative w-16 h-16 flex items-center justify-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: [0.8, 1.1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-fuchsia-500 blur-lg opacity-60" />
        <div className="absolute inset-2 rounded-full border-2 border-cyan-400/80" />
        <div className="absolute inset-4 rounded-full bg-black/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-cyan-400 to-fuchsia-500 shadow-[0_0_16px_4px_rgba(99,102,241,0.7)] animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}
