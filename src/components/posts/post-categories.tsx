"use client";

import { Button } from "@/components/ui/button";
import { PostCategoriesProps } from "@/utils/types/posts";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./post-categories.module.css";

export default function PostCategories({ categories = [] }: PostCategoriesProps) {
  const router = useRouter(); // 라우터
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";
  // API 데이터 또는 기본 카테고리 사용
  const displayCategories =
    categories.length > 0
      ? [
          { id: "all", name: "전체", label: "전체" },
          ...categories.map((cat) => ({
            id: String(cat.id),
            name: cat.label,
            label: cat.label,
          })),
        ]
      : [{ id: "all", name: "전체", label: "전체" }];

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category_id");

    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", String(categoryId));
    }

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/posts");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.categoriesWrapper}>
            {displayCategories.map((category) => (
              <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className={`${styles.categoryButton} ${
                    currentCategory === category.id ? styles.active : styles.inactive
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
