"use client";

import { motion } from "framer-motion";
import { Settings, Sparkles } from "lucide-react";
import { useState } from "react";
import styles from "./settings-header.module.css";

export default function SettingsHeader() {
  const [isHovered, setIsHovered] = useState(false);

  const floatingElements = [
    { id: 1, x: "10%", y: "20%", delay: 0 },
    { id: 2, x: "80%", y: "30%", delay: 0.5 },
    { id: 3, x: "15%", y: "70%", delay: 1 },
    { id: 4, x: "75%", y: "80%", delay: 1.5 },
    { id: 5, x: "50%", y: "15%", delay: 2 },
  ];

  return (
    <div className={styles.headerContainer}>
      {/* 배경 애니메이션 요소들 */}
      <div className={styles.backgroundWrapper}>
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={styles.floatingParticle}
            style={{ left: element.x, top: element.y }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 배경 그라데이션 오버레이 */}
      <motion.div
        className={styles.gradientOverlay}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className={styles.contentWrapper}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.centerContainer}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className={styles.settingsButton}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.div
              animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Settings className={styles.settingsIcon} />
            </motion.div>
            <span className={styles.settingsLabel}>설정</span>
            <motion.div
              className={styles.sparkleWrapper}
              animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
            >
              <Sparkles className={styles.sparkleIcon} />
            </motion.div>
          </motion.div>

          <motion.h1
            className={styles.mainTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.span
              className={styles.titleSpan}
              whileHover={{
                scale: 1.03,
                textShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              계정
            </motion.span>{" "}
            <motion.span
              className={styles.titleSpanGradient}
              whileHover={{
                scale: 1.03,
                textShadow: "0 0 15px rgba(255, 255, 255, 0.6)",
              }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
            >
              설정
            </motion.span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            프로필, 보안, 개인정보 설정을 관리합니다.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
