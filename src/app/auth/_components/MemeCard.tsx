import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface MemeCardProps {
  img: string;
  text: string;
  source: string;
}

export default function MemeCard({ img, text, source }: MemeCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={img}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.04, y: -20 }}
        transition={{ duration: 0.5, type: "spring" }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 8px 32px 0 rgba(128,0,255,0.18)",
        }}
        className="flex size-full flex-col items-center justify-center"
      >
        <Card className="relative flex size-full flex-col items-center justify-center overflow-visible rounded-3xl border-0 bg-white/60 p-6 shadow-2xl backdrop-blur-md dark:bg-gray-900/70 md:p-10">
          {/* floating emoji */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg md:text-5xl"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            🎉
          </motion.div>
          <Image
            src={img}
            alt="밈 이미지"
            width={180}
            height={180}
            className="mb-4 size-32 rounded-2xl border-4 border-purple-300 object-cover shadow-lg dark:border-purple-700 md:size-40"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <Badge className="mb-3 rounded-full border-0 bg-gradient-to-r from-purple-500 to-pink-400 px-4 py-2 text-xs font-bold text-white shadow">
            {source}
          </Badge>
          <div
            className="mb-3 flex items-center justify-center text-center text-xl font-extrabold leading-tight text-purple-700 drop-shadow dark:text-purple-200 md:text-2xl"
            style={{ minHeight: 56 }}
          >
            {text}
          </div>
          <div className="text-center text-sm font-medium text-purple-600 dark:text-purple-300">
            로그인 후 더 많은 밈 보기! 👀
            <br />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              매일 업데이트되는 K-드라마/K-pop 밈을 만나보세요
            </span>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
