"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, SlidersHorizontal, Music, Film, Tv } from "lucide-react"

export default function CelebritiesCategories() {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-950 sticky top-16 z-30 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Tabs defaultValue="kpop" className="w-full">
              <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-full w-full max-w-md">
                <TabsTrigger
                  value="kpop"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Music className="h-4 w-4 mr-2" />
                  K-POP
                </TabsTrigger>
                <TabsTrigger
                  value="actor"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Film className="h-4 w-4 mr-2" />
                  배우
                </TabsTrigger>
                <TabsTrigger
                  value="variety"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Tv className="h-4 w-4 mr-2" />
                  예능인
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="연예인 검색..."
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
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">소속사</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                  <option value="all">전체</option>
                  <option value="hybe">HYBE</option>
                  <option value="sm">SM 엔터테인먼트</option>
                  <option value="jyp">JYP 엔터테인먼트</option>
                  <option value="yg">YG 엔터테인먼트</option>
                  <option value="other">기타</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">활동 분야</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                  <option value="all">전체</option>
                  <option value="idol">아이돌</option>
                  <option value="actor">배우</option>
                  <option value="solo">솔로 가수</option>
                  <option value="variety">예능인</option>
                  <option value="model">모델</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">정렬</label>
                <select className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100">
                  <option value="popular">인기순</option>
                  <option value="recent">최신순</option>
                  <option value="name">이름순</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
