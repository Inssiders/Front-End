"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Filter } from "lucide-react"

const categories = ["전체", "일상", "유머", "정보", "질문", "토론", "리뷰", "창작"]

const sortOptions = [
  { label: "최신순", value: "newest" },
  { label: "인기순", value: "popular" },
  { label: "댓글 많은 순", value: "comments" },
  { label: "조회수 순", value: "views" },
]

export default function PostsFilters() {
  const [activeCategory, setActiveCategory] = useState("전체")
  const [sortBy, setSortBy] = useState(sortOptions[0])

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter size={16} />
                <span>{sortBy.label}</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {sortOptions.map((option) => (
                <DropdownMenuItem key={option.value} onClick={() => setSortBy(option)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
