"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MEME_CATEGORIES } from "@/utils/constant";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function PostCategories() {
  const router = useRouter(); // 라우터
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const [showSearch, setShowSearch] = useState(false);

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // category 쿼리만 쓰기로 했으면 category_id는 삭제
    params.delete("category_id");

    if (category === "all") {
      // 'all' 이면 category 쿼리 제거
      params.delete("category");
    } else {
      params.set("category", String(category));
    }

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/posts");
  };

  return (
    <div className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center overflow-y-auto overflow-x-auto md:overflow-hidden pb-2 md:pb-0 w-full md:w-auto">
            {MEME_CATEGORIES.map((category) => (
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

          <div className="flex items-center gap-2 w-full md:w-auto">
            {showSearch ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative flex-1"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="밈 검색..."
                  className="pl-10 rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500 dark:bg-gray-800"
                  autoFocus
                />
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setShowSearch(true)}
                aria-label="검색"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              aria-label="필터"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
