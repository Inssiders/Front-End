"use client";

import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { KeyboardEvent, useState } from "react";

export interface InputHashProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export function InputHash({ tags, onChange }: InputHashProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue("");
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300"
          >
            #{tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 text-purple-500 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              ×
            </button>
          </motion.span>
        ))}
      </div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="해시태그를 입력하고 Enter를 눌러주세요"
        className="focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:shadow-md"
      />
    </div>
  );
}
