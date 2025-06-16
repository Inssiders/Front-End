"use client";
import { Button } from "@/components/ui/button";
import { PostCategoriesProps } from "@/utils/types/posts";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./post-categories.module.css";
import Link from "next/link";

export default function PostCategories({ categories = [], id = "1" }: PostCategoriesProps) {
  const router = useRouter(); // 라우터
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  // API 데이터 또는 기본 카테고리 사용
  const displayCategories =
    categories.length > 0
      ? [
          { id: "all", name: "전체", label: "전체" },
          ...categories.map(
            (cat) => ({
              id: String(cat.id),
              name: cat.name,
              label: cat.label,
            }),
            console.log("cate:", categories)
          ),
        ]
      : [{ id: "all", name: "전체", label: "전체" }];

  const handleCategoryClick = (categoryId: string) => {
    // 현재 스크롤 위치 저장
    const currentScrollY = window.pageYOffset;

    const params = new URLSearchParams(searchParams.toString());

    params.delete("category_id");

    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", String(categoryId));
    }

    const queryString = params.toString();

    // URL 변경 후 스크롤 위치 복원
    router.push(queryString ? `?${queryString}` : "/posts");

    // 스크롤 위치 복원 (여러 시점에서 시도)
    requestAnimationFrame(() => {
      window.scrollTo(0, currentScrollY);
    });

    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 50);

    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 200);

    setTimeout(() => {
      window.scrollTo(0, currentScrollY);
    }, 500);
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Link href={`/create/${id}`}>
              <h3 className="">밈 생성하기</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
