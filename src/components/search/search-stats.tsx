"use client";

import { motion } from "framer-motion";
import { BarChart3, Clock } from "lucide-react";
import styles from "./search-stats.module.css";

interface SearchStatsProps {
  query: string;
  totalResults: number;
  loading: boolean;
}

export default function SearchStats({ query, totalResults, loading }: SearchStatsProps) {
  if (!query) return null;

  return (
    <motion.div
      className={styles.statsContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className={styles.statsContent}>
        {/* Results Count */}
        <motion.div
          className={styles.statItem}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div
            className={styles.statIcon}
            animate={{ rotate: loading ? 360 : 0 }}
            transition={{ duration: 1, repeat: loading ? Infinity : 0 }}
          >
            <BarChart3 className="w-4 h-4 text-purple-500" />
          </motion.div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>검색 결과</span>
            <motion.span
              className={styles.statValue}
              key={totalResults}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {loading ? "검색 중..." : `${totalResults.toLocaleString()}개`}
            </motion.span>
          </div>
        </motion.div>

        {/* Search Time */}
        <motion.div
          className={styles.statItem}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.div
            className={styles.statIcon}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Clock className="w-4 h-4 text-cyan-500" />
          </motion.div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>검색 시간</span>
            <span className={styles.statValue}>{loading ? "..." : "0.12초"}</span>
          </div>
        </motion.div>
      </div>

      {/* Animated accent line */}
      <motion.div
        className={styles.accentLine}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>
  );
}
