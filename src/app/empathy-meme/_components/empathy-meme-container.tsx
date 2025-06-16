"use client";

import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import { CategoryData, Post } from "@/utils/types/posts";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./empathy-meme-container.module.css";
import { Line } from "recharts";
import Link from "next/link";

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
  id?: string;
}

export default function EmpathyMemeContainer({
  categories,
  category,
  initialPosts,
  hasNextPage,
  headerType = "default",
  id = "1",
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
    subtitle: "🎬 유튜브 영상으로 공감할 수 있는 밈들을 공유하세요! 재미있고 공감되는 순간들을 함께 나누어보세요 💫",
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

  return (
    <motion.div
      className={styles.mainContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <div className={styles.animatedBackground}>
        {/* Base gradient */}
        <motion.div
          className={styles.baseGradient}
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Floating orbs */}
        <motion.div
          className={styles.floatingOrb1}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          className={styles.floatingOrb2}
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2,
          }}
        />
        <motion.div
          className={styles.floatingOrb3}
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 12,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 4,
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        className={styles.mainContent}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Header Section */}
        <motion.div className={styles.headerSection} transition={{ type: "spring", stiffness: 300 }}>
          <PostsHeader {...empathyMemeHeaderProps} />
        </motion.div>

        {/* Clean & Modern Content Area */}
        <div className={styles.contentContainer}>
          <motion.div
            className={styles.glassContainer}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{
              boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
            }}
          >
            {/* Simple Top Accent */}
            <div className={styles.topAccent} />
            <div className="flex items-center gap-2 w-full md:w-auto">

              <Link href={`/empathy-meme/create/${id}`}>
                <h3 className="">
                  밈 생성하기
                </h3>
              </Link>
            </div>
            {/* Clean Content Area */}
            <div className={styles.contentWrapper}>
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
          </motion.div>
        </div>
      </motion.div>

      {/* Additional floating elements */}
      <motion.div
        className={styles.floatingParticle1}
        animate={{
          y: [0, -20, 0],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      <motion.div
        className={styles.floatingParticle2}
        animate={{
          x: [0, 15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
      />
    </motion.div>
  );
}
