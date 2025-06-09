"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import styles from "./loader.module.css";

export function Loader({ className }: { className?: string }) {
  return (
    <div className={cn(styles.loaderContainer, className)}>
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={styles.loadingDot}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
        />
      ))}
    </div>
  );
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <div className={styles.gridContainer}>
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(styles.gridItem, className)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className={styles.fullPageContainer}>
      <motion.div
        className={styles.fullPageSpinner}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.p
        className={styles.fullPageText}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        로딩 중...
      </motion.p>
    </div>
  );
}

export function PrimaryLoader({ className }: { className?: string }) {
  return (
    <div className={styles.primaryContainer}>
      <div className={styles.primaryDotsContainer}>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.primaryDot}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: i * 0.2,
              duration: 0.4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function Web3CubeLoader({ className }: { className?: string }) {
  return (
    <div className={cn(styles.cubeContainer, className)}>
      <motion.div
        className={styles.cubeWrapper}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className={styles.cubeOuter} />
        <div className={styles.cubeInner} />
        <div className={styles.cubeCore}>
          <div className={styles.cubeDot} />
        </div>
      </motion.div>
    </div>
  );
}

export function Web3PulseLoader({ className }: { className?: string }) {
  return (
    <div className={cn(styles.pulseContainer, className)}>
      <motion.div
        className={styles.pulseWrapper}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.pulseOuter} />
        <div className={styles.pulseInner} />
        <div className={styles.pulseCore}>
          <div className={styles.pulseDot} />
        </div>
      </motion.div>
    </div>
  );
}
