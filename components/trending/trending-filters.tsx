"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Flame, Clock, TrendingUp, Search, SlidersHorizontal } from "lucide-react"

export default function TrendingFilters() {
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    { value: "all", label: "전체" },
    { value: "meme", label: "밈" },
    { value: "kpop", label: "K-POP" },
    { value: "drama", label: "드라마" },
    { value: "challenge", label: "챌린지" },
    { value: "youtube", label: "유튜브" },
    { value: "tiktok", label: "틱톡" },
  ]

  return (
    <div className="bg-white dark:bg-gray-950 sticky top-16 z-30 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Tabs defaultValue="hot" className="w-full">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full w-full max-w-md">
                <TabsTrigger
                  value="hot"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  인기
                </TabsTrigger>
                <TabsTrigger
                  value="new"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  최신
                </TabsTrigger>
                <TabsTrigger
                  value="rising"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  급상승
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="트렌드 검색..."
                className="pl-10 rounded-full bg-gray-100 border-0 focus-visible:ring-purple-500 dark:bg-gray-800"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() => setShowFilters(!showFilters)}
              aria-label="필터"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">카테고리</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">정렬 기준</label>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="정렬 기준" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">인기순</SelectItem>
                    <SelectItem value="recent">최신순</SelectItem>
                    <SelectItem value="comments">댓글 많은 순</SelectItem>
                    <SelectItem value="shares">공유 많은 순</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">기간</label>
                <Select defaultValue="today">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">오늘</SelectItem>
                    <SelectItem value="week">이번 주</SelectItem>
                    <SelectItem value="month">이번 달</SelectItem>
                    <SelectItem value="year">올해</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
