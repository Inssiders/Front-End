"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export function SearchForm() {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 검색 로직 구현
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        type="search"
        placeholder="검색어를 입력하세요..."
        className="w-full pl-10 pr-12 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        검색
      </Button>
    </form>
  );
}
