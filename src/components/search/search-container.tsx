"use client";

import PostsGrid from "@/components/posts/post-grid";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import styles from "./search-container.module.css";
import SearchHeader from "./search-header";
import SearchStats from "./search-stats";

interface SearchContainerProps {
  query: string;
  posts?: any[];
  loading?: boolean;
  hasNextPage?: boolean;
  totalResults?: number;
  // ISR에서 사용할 초기 데이터
  initialPosts?: any[];
  initialLoading?: boolean;
  initialHasNextPage?: boolean;
  initialTotalResults?: number;
  initialSearchTime?: number;
}

export default function SearchContainer({
  query,
  posts,
  loading,
  hasNextPage = false,
  totalResults = 0,
  initialPosts = [],
  initialLoading = false,
  initialHasNextPage = false,
  initialTotalResults = 0,
  initialSearchTime,
}: SearchContainerProps) {
  const [isFromCache, setIsFromCache] = useState(false);

  // ISR 데이터와 클라이언트 데이터 통합
  const currentPosts = posts ?? initialPosts;
  const currentLoading = loading ?? initialLoading;
  const currentHasNextPage = hasNextPage || initialHasNextPage;
  const currentTotalResults = totalResults || initialTotalResults;

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
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
        />

        {/* Floating search orbs */}
        <motion.div
          className={styles.floatingOrb1}
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
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
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
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
            x: [0, 100, 0],
            y: [0, -60, 0],
            scale: [1, 1.15, 1],
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
        {/* Search Header */}
        <SearchHeader query={query} />

        {/* Search Stats */}
        <SearchStats
          query={query}
          totalResults={currentTotalResults}
          loading={currentLoading}
          searchTime={initialSearchTime}
        />

        {/* Search Results */}
        <div className={styles.resultsContainer}>
          {query ? (
            <>
              {currentPosts.length > 0 || currentLoading ? (
                <motion.div
                  className={styles.resultsGrid}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <PostsGrid
                    posts={currentPosts}
                    loading={currentLoading}
                    hasNextPage={currentHasNextPage}
                    columns={4}
                    layout="grid"
                    showAuthor={true}
                    showActions={true}
                    enableHoverPlay={true}
                    disableAnimation={isFromCache}
                    searchQuery={query}
                  />
                </motion.div>
              ) : (
                <motion.div
                  className={styles.noResults}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <motion.div
                    className={styles.noResultsIcon}
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Search className="w-16 h-16 text-purple-400" />
                  </motion.div>
                  <h3 className={styles.noResultsTitle}>검색 결과가 없어요 😢</h3>
                  <p className={styles.noResultsDesc}>다른 키워드로 검색해보거나 철자를 확인해보세요</p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              className={styles.emptyState}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={styles.emptyIcon}
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-20 h-20 text-cyan-400" />
              </motion.div>
              <h2 className={styles.emptyTitle}>✨ 검색하고 싶은 것이 있나요?</h2>
              <p className={styles.emptyDesc}>트렌드, 밈, 콘텐츠 등 원하는 것을 검색해보세요!</p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Floating particles */}
      <motion.div
        className={styles.floatingParticle1}
        animate={{
          y: [0, -15, 0],
          opacity: [0.6, 1, 0.6],
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
          x: [0, 12, 0],
          opacity: [0.5, 0.9, 0.5],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 1,
        }}
      />
      <motion.div
        className={styles.floatingParticle3}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 2,
        }}
      />
    </motion.div>
  );
}
