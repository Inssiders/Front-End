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
        className="w-full h-full flex flex-col justify-center items-center"
      >
        <Card className="w-full h-full flex flex-col items-center justify-center bg-white/60 dark:bg-gray-900/70 rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-md border-0 relative overflow-visible">
          {/* floating emoji */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-4xl md:text-5xl drop-shadow-lg"
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
            className="w-32 md:w-40 h-32 md:h-40 mb-4 border-4 border-purple-300 dark:border-purple-700 rounded-2xl object-cover shadow-lg"
            style={{ background: "rgba(255,255,255,0.3)" }}
          />
          <Badge className="mb-3 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-400 text-white text-xs font-bold rounded-full shadow border-0">
            {source}
          </Badge>
          <div
            className="text-xl md:text-2xl font-extrabold text-center text-purple-700 dark:text-purple-200 mb-3 leading-tight drop-shadow flex items-center justify-center"
            style={{ minHeight: 56 }}
          >
            {text}
          </div>
          <div className="text-sm text-center font-medium text-purple-600 dark:text-purple-300">
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
