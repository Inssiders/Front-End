"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import styles from "./search-header.module.css";

interface SearchHeaderProps {
  query: string;
}

export default function SearchHeader({ query }: SearchHeaderProps) {
  return (
    <motion.div
      className={styles.headerContainer}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.headerContent}>
        <motion.div
          className={styles.iconWrapper}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Search className={styles.searchIcon} />
        </motion.div>

        <div className={styles.titleSection}>
          <motion.h1
            className={styles.title}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          >
            ✨ 트렌드 검색
          </motion.h1>

          {query && (
            <motion.div
              className={styles.queryDisplay}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className={styles.queryLabel}>검색어:</span>
              <motion.span className={styles.queryText} whileHover={{ scale: 1.02 }}>
                "{query}"
              </motion.span>
              <motion.div
                className={styles.sparkleIcon}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      <div className={styles.headerAccent} />
    </motion.div>
  );
}
