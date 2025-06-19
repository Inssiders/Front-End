"use client";

import { Button } from "@/components/ui/button";
import { CategoryData } from "@/types/posts";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./post-categories.module.css";

interface PostCategoriesProps {
  categories: CategoryData[];
  id?: string;
}

export default function PostCategories({ categories = [], id = "0" }: PostCategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategoryId = searchParams.get("category_id") || "0";
  const scrollRef = useRef<HTMLDivElement>(null);

  // API 데이터 또는 기본 카테고리 사용
  const displayCategories = [{ id: "0", type: "all", name: "전체" }, ...categories];

  const handleCategoryClick = (categoryId: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    if (categoryId === "0") {
      params.delete("category_id");
    } else {
      params.set("category_id", categoryId.toString());
    }

    // 페이지 파라미터 초기화
    params.delete("page");

    // URL 업데이트 (전체 페이지 리로드 없이)
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const scrollToCategory = (category: string) => {
    const element = document.getElementById(`category-${category}`);
    if (element && scrollRef.current) {
      const container = scrollRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      // 스크롤 위치 계산 시 패딩 고려
      const scrollPadding = 32; // 2rem
      const scrollLeft =
        elementRect.left - containerRect.left - containerRect.width / 2 + elementRect.width / 2 + scrollPadding;

      container.scrollTo({
        left: container.scrollLeft + scrollLeft,
        behavior: "smooth",
      });
    }
  };

  // 컴포넌트가 마운트되거나 카테고리가 변경될 때 스크롤
  useEffect(() => {
    if (currentCategoryId) {
      // 약간의 지연을 주어 애니메이션이 완료된 후 스크롤
      setTimeout(() => {
        scrollToCategory(currentCategoryId);
      }, 100);
    }
  }, [currentCategoryId]);

  return (
    <motion.div
      className={styles.categoryContainer}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={styles.categoryWrapper}>
        <div className={styles.categoryScroll} ref={scrollRef}>
          <AnimatePresence>
            {displayCategories.map((category, index) => (
              <motion.div
                key={`category-${category.id}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={currentCategoryId === category.id.toString() ? "default" : "outline"}
                  className={styles.categoryButton}
                  data-state={currentCategoryId === category.id.toString() ? "active" : "inactive"}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
