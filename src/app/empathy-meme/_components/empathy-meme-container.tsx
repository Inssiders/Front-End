"use client";

import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import { CategoryData, Post } from "@/utils/types/posts";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";

interface FloatingCircle {
  width: number;
  height: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  xMove: number;
}

interface EmpathyMemeContainerProps {
  categories: CategoryData[];
  category: string;
  initialPosts: Post[];
  hasNextPage: boolean;
  headerType?: "default" | "posts" | "none";
}

export default function EmpathyMemeContainer({
  categories,
  category,
  initialPosts,
  hasNextPage,
  headerType = "default",
}: EmpathyMemeContainerProps) {
  const [circles, setCircles] = useState<FloatingCircle[]>([]);

  // Generate random circle properties on client-side only
  useEffect(() => {
    const newCircles = Array(5)
      .fill(null)
      .map(() => ({
        width: Math.random() * 100 + 50,
        height: Math.random() * 100 + 50,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        xMove: Math.random() * 20 - 10,
      }));
    setCircles(newCircles);
  }, []);

  // 전달받은 초기 posts 데이터를 그대로 사용
  const allPosts = initialPosts;

  // 공감밈 전용 헤더 설정
  const empathyMemeHeaderProps = {
    title: "공감밈",
    subtitle:
      "🎬 유튜브 영상으로 공감할 수 있는 밈들을 공유하세요! 재미있고 공감되는 순간들을 함께 나누어보세요 💫",
    badge: "✨ 공감밈 갤러리 ✨",
    emojis: ["🎬", "😂", "👍", "💯", "🔥", "🎉"],
    stats: [
      {
        icon: Users,
        label: "공감밈 콘텐츠",
        value: "50+",
        color: "from-pink-400 to-pink-600",
      },
    ],
  };

  const renderHeader = () => {
    if (headerType === "none") return null;

    if (headerType === "posts") {
      return <PostsHeader {...empathyMemeHeaderProps} />;
    }

    // 기본 배너 (headerType === "default")
    return (
      <div className="relative h-[300px] overflow-hidden rounded-xl">
        {/* Animated background gradients */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        />
        {/* Floating circles */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {circles.map((circle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10 backdrop-blur-sm"
              style={{
                width: circle.width,
                height: circle.height,
                left: circle.left,
                top: circle.top,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, circle.xMove, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: circle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: circle.delay,
              }}
            />
          ))}
        </motion.div>
        {/* Content overlay */}
        <motion.div
          className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="mb-4 text-4xl font-bold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            공감밈
          </motion.h1>
          <motion.p
            className="max-w-2xl text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            유튜브 영상으로 공감할 수 있는 밈들을 공유하세요.
            <br />
            재미있고 공감되는 순간들을 함께 나누어보세요.
          </motion.p>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      {renderHeader()}

      {/* Grid Section */}
      <PostsGrid
        posts={allPosts}
        loading={false}
        hasNextPage={hasNextPage}
        category={category}
        columns={4}
        showAuthor={true}
        showActions={true}
        layout="grid"
      />
    </div>
  );
}
