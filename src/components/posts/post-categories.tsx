"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { PostCategoriesProps } from "./types";

export default function PostCategories({
  categories = [],
}: PostCategoriesProps) {
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
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex items-center overflow-y-auto overflow-x-auto md:overflow-hidden pb-2 md:pb-0 w-full md:w-auto">
            {displayCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={
                    currentCategory === category.id ? "default" : "ghost"
                  }
                  className={`rounded-full mr-2 ${
                    currentCategory === category.id
                      ? "bg-main-700 hover:bg-main-700 text-white font-bold"
                      : "text-gray-700 dark:text-gray-300"
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
