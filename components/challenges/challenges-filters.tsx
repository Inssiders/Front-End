"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal, Flame, Clock, Award } from "lucide-react"

export default function ChallengesFilters() {
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
                  value="rewards"
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
                >
                  <Award className="h-4 w-4 mr-2" />
                  보상
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="챌린지 검색..."
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
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="dance">댄스</SelectItem>
                    <SelectItem value="kpop">K-POP</SelectItem>
                    <SelectItem value="meme">밈</SelectItem>
                    <SelectItem value="food">음식</SelectItem>
                    <SelectItem value="fashion">패션</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">난이도</label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="난이도 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="easy">쉬움</SelectItem>
                    <SelectItem value="medium">중간</SelectItem>
                    <SelectItem value="hard">어려움</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">기간</label>
                <Select defaultValue="active">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="기간 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">진행 중</SelectItem>
                    <SelectItem value="upcoming">예정</SelectItem>
                    <SelectItem value="ended">종료</SelectItem>
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
