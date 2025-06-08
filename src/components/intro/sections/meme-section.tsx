"use client";

import DynamicVideoGrid from "@/components/intro/video-grid";
import { motion, MotionValue } from "framer-motion";
import { useState } from "react";
import styles from "./meme-section.module.css";

interface MemeSectionProps {
  thirdSectionOpacity: MotionValue<number>;
  thirdSectionY: MotionValue<number>;
  thirdVisible: boolean;
}

export function MemeSection({
  thirdSectionOpacity,
  thirdSectionY,
  thirdVisible,
}: MemeSectionProps) {
  const [showFrames, setShowFrames] = useState(true);

  return (
    <motion.section
      style={{ opacity: thirdSectionOpacity, y: thirdSectionY }}
      className={`${styles.section} ${thirdVisible ? styles.sectionVisible : styles.sectionHidden}`}
    >
      {/* 플로팅 배경 요소들 */}
      <div className={styles.floatingOrbs}>
        <motion.div
          className={`${styles.orb} ${styles.orb1}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`${styles.orb} ${styles.orb2}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className={`${styles.orb} ${styles.orb3}`}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.65, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className={`${styles.orb} ${styles.orb4}`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className={styles.container}>
        {/* 제목 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.titleGroup}
        >
          <motion.div
            className={styles.titleGlow}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className={styles.title}>
            요즘 가장 핫한{" "}
            <motion.span
              className={styles.memeText}
              animate={{
                textShadow: [
                  "0 0 15px rgba(255, 20, 147, 0.8), 0 0 30px rgba(255, 105, 180, 0.6), 0 2px 4px rgba(255, 20, 147, 0.3)",
                  "0 0 25px rgba(255, 20, 147, 1), 0 0 50px rgba(255, 105, 180, 0.8), 0 2px 6px rgba(255, 20, 147, 0.5)",
                  "0 0 15px rgba(255, 20, 147, 0.8), 0 0 30px rgba(255, 105, 180, 0.6), 0 2px 4px rgba(255, 20, 147, 0.3)",
                ],
                filter: [
                  "drop-shadow(0 0 20px rgba(255, 20, 147, 0.7))",
                  "drop-shadow(0 0 30px rgba(255, 20, 147, 1))",
                  "drop-shadow(0 0 20px rgba(255, 20, 147, 0.7))",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              밈
            </motion.span>{" "}
            모음
          </h2>
        </motion.div>

        {/* 비디오 그리드 컨테이너 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={styles.videoContainer}
        >
          <motion.div
            className={styles.videoGlow}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <div className={styles.videoWrapper}>
            <div className={styles.videoInner}>
              <DynamicVideoGrid showFrames={showFrames} onToggleShowFrames={setShowFrames} />
            </div>

            {/* 코너 데코레이션 */}
            <motion.div
              className={styles.cornerTL}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(255, 105, 180, 0.6), inset 0 0 10px rgba(255, 105, 180, 0.3)",
                  "0 0 25px rgba(255, 105, 180, 0.8), inset 0 0 15px rgba(255, 105, 180, 0.4)",
                  "0 0 15px rgba(255, 105, 180, 0.6), inset 0 0 10px rgba(255, 105, 180, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className={styles.cornerTR}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(147, 112, 219, 0.6), inset 0 0 10px rgba(147, 112, 219, 0.3)",
                  "0 0 25px rgba(147, 112, 219, 0.8), inset 0 0 15px rgba(147, 112, 219, 0.4)",
                  "0 0 15px rgba(147, 112, 219, 0.6), inset 0 0 10px rgba(147, 112, 219, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className={styles.cornerBL}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(0, 191, 255, 0.6), inset 0 0 10px rgba(0, 191, 255, 0.3)",
                  "0 0 25px rgba(0, 191, 255, 0.8), inset 0 0 15px rgba(0, 191, 255, 0.4)",
                  "0 0 15px rgba(0, 191, 255, 0.6), inset 0 0 10px rgba(0, 191, 255, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
            <motion.div
              className={styles.cornerBR}
              animate={{
                boxShadow: [
                  "0 0 15px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(255, 215, 0, 0.3)",
                  "0 0 25px rgba(255, 215, 0, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.4)",
                  "0 0 15px rgba(255, 215, 0, 0.6), inset 0 0 10px rgba(255, 215, 0, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            />
          </div>
        </motion.div>

        {/* 추가 파티클 효과들 */}
        <motion.div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "4px",
            height: "4px",
            background: "linear-gradient(45deg, #ff69b4, #ff1493)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
          animate={{
            x: [0, 100, 200, 100, 0],
            y: [0, -50, 0, 50, 0],
            opacity: [0, 1, 1, 1, 0],
            scale: [0, 1, 1.2, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            top: "70%",
            right: "15%",
            width: "3px",
            height: "3px",
            background: "linear-gradient(45deg, #9370db, #8a2be2)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
          animate={{
            x: [-50, 50, -50],
            y: [-30, 30, -30],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "70%",
            width: "5px",
            height: "5px",
            background: "linear-gradient(45deg, #00bfff, #1e90ff)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
          animate={{
            x: [-80, 0, 80, 0, -80],
            y: [0, -80, 0, 80, 0],
            opacity: [0, 0.8, 1, 0.8, 0],
            scale: [0, 1, 1.3, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>
    </motion.section>
  );
}
