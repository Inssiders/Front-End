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

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("category_id");

    if (category === "all") {
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
        </div>
      </div>
    </div>
  );
}
