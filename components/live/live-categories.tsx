"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, Flame, Clock, Users } from "lucide-react"

export default function LiveCategories() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-950 sticky top-16 z-30 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full w-full max-w-md">
                <TabsTrigger
                  value="trending"
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
                  value="following"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Users className="h-4 w-4 mr-2" />
                  팔로잉
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="라이브 검색..."
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
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                  <option value="all">전체</option>
                  <option value="kpop">K-POP</option>
                  <option value="gaming">게임</option>
                  <option value="talk">토크/챗</option>
                  <option value="beauty">뷰티</option>
                  <option value="food">푸드</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">상태</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                  <option value="all">전체</option>
                  <option value="live">라이브 중</option>
                  <option value="upcoming">예정된 방송</option>
                  <option value="ended">종료된 방송</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">정렬</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                  <option value="viewers">시청자 수</option>
                  <option value="recent">최신순</option>
                  <option value="duration">방송 시간</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
