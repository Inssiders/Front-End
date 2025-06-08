"use client";

import { useMobile } from "@/hooks/use-mobile";
import { motion, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./hero-section.module.css";

interface HeroSectionProps {
  firstSectionOpacity: MotionValue<number>;
  firstSectionScale: MotionValue<number>;
  firstSectionY: MotionValue<number>;
  firstVisible: boolean;
}

export function HeroSection({
  firstSectionOpacity,
  firstSectionScale,
  firstSectionY,
  firstVisible,
}: HeroSectionProps) {
  const [isImageHover, setIsImageHover] = useState(false);
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null);
  const [currentDate] = useState(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return `${year}년 ${month}월`;
  });
  const isMobile = useMobile();

  const renderInteractiveText = () => {
    const letters = [
      { char: "i", special: false },
      { char: "n", special: false },
      { char: "S", special: true },
      { char: "S", special: true },
      { char: "i", special: false },
      { char: "d", special: false },
      { char: "e", special: false },
      { char: "r", special: false },
    ];

    return (
      <span className={styles.brandName}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            className={`${styles.brandLetter} ${letter.special ? styles.brandLetterSpecial : ""}`}
            animate={{
              y: hoveredLetter === index ? -8 : 0,
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
            onMouseEnter={() => setHoveredLetter(index)}
            onMouseLeave={() => setHoveredLetter(null)}
          >
            {letter.char}
          </motion.span>
        ))}
      </span>
    );
  };

  return (
    <motion.section
      style={{
        opacity: firstSectionOpacity,
        scale: firstSectionScale,
        y: firstSectionY,
      }}
      className={`${styles.heroContainer} ${firstVisible ? "z-30" : "z-0"}`}
    >
      <div className={styles.heroContent}>
        {/* Left Content */}
        <div className={styles.leftContent}>
          <div className={`${styles.trendingBadge} hidden lg:block`}>최신 밈 🔥</div>
          <div className={`${styles.trendingLine} hidden sm:block`} />

          <div className="mb-8">
            <p className={styles.sectionTitle}>Trending Meme Platform</p>
            <h2 className={styles.mainTitle}>
              <span className={styles.quoteSymbol}>❝</span>
              <span>밈 트렌드의</span>
              {renderInteractiveText()}
            </h2>
            <p className={styles.description}>✨ 지금 가장 핫한 밈과 트렌드를 한눈에! 🚀</p>
          </div>

          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles.tagPrimary}`}>#최신 밈</span>
            <span className={`${styles.tag} ${styles.tagSecondary}`}>#요즘 유행</span>
            <span className={`${styles.tag} ${styles.tagTertiary}`}>#트렌드</span>
          </div>
        </div>

        {/* Right Content - Featured Meme */}
        <div className={styles.rightContent}>
          <div className={styles.memeCardWrapper}>
            <div className={styles.memeCardBackground} />
            <div className={styles.memeCard}>
              <div className={styles.bestMemeBadge}>BEST MEME</div>
              <div className={styles.popularBadge}>{currentDate} 인기 밈</div>

              <div
                className={styles.memeImageContainer}
                onMouseEnter={() => setIsImageHover(true)}
                onMouseLeave={() => setIsImageHover(false)}
              >
                <div className={styles.memeOverlay}>
                  <p className={styles.overlayTitle}>밈 보기</p>
                  <p className={styles.overlayDescription}>클릭하여 더 많은 밈을 확인하세요</p>
                  <Link href="/posts">
                    <div className={styles.overlayButton}>
                      <ArrowRight size={isMobile ? 16 : 20} />
                    </div>
                  </Link>
                </div>

                <div className={styles.memeImage}>
                  <Image
                    src="/shark.png"
                    alt="Featured meme"
                    width={400}
                    height={400}
                    className="max-h-full max-w-full object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Start Button */}
      <div className={styles.startButtonContainer}>
        <Link href="/posts">
          <button className={styles.startButton}>
            <div className={styles.buttonContent}>
              <span>더 많은 밈 보러가기</span>
              <ArrowRight className={styles.buttonIcon} size={isMobile ? 18 : 20} />
            </div>
          </button>
        </Link>
      </div>
    </motion.section>
  );
}
