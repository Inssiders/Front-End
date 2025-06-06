// 인스타그램 스타일 애니메이션 설정
export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // 더 빠른 간격
        delayChildren: 0.1,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3, // 더 빠른 애니메이션
        ease: "easeOut",
      },
    },
  },
};

// 그리드 열 설정
export const GRID_COLUMNS = {
  2: "grid-cols-1 sm:grid-cols-1",
  3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-3 md:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5",
} as const;

export const DEFAULT_GRID_COLS = "grid-cols-2 sm:grid-cols-3 md:grid-cols-4";
