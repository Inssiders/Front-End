"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Users, Eye, Heart, BarChart, PieChart, LineChart, Calendar } from "lucide-react"

export default function CreatorStudioAnalytics() {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">분석 대시보드</h2>

        <div className="flex gap-4 w-full md:w-auto">
          <Select defaultValue="30days">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="기간 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">최근 7일</SelectItem>
              <SelectItem value="30days">최근 30일</SelectItem>
              <SelectItem value="90days">최근 90일</SelectItem>
              <SelectItem value="year">올해</SelectItem>
              <SelectItem value="all">전체 기간</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="콘텐츠 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">모든 콘텐츠</SelectItem>
              <SelectItem value="meme">밈</SelectItem>
              <SelectItem value="kpop">K-POP</SelectItem>
              <SelectItem value="fashion">패션</SelectItem>
              <SelectItem value="challenge">챌린지</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">총 조회수</CardTitle>
              <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">124,892</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                12.5% 증가
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">팔로워</CardTitle>
              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">8,642</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                8.3% 증가
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">좋아요</CardTitle>
              <Heart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">32,456</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                15.2% 증가
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">인싸 포인트</CardTitle>
              <span className="text-purple-600 dark:text-purple-400 font-bold text-xs">IP</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">5,280</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                9.7% 증가
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-md mb-6">
          <TabsTrigger
            value="overview"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            <BarChart className="h-4 w-4 mr-2" />
            개요
          </TabsTrigger>
          <TabsTrigger
            value="audience"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            <PieChart className="h-4 w-4 mr-2" />
            시청자
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            <LineChart className="h-4 w-4 mr-2" />
            콘텐츠
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">조회수 추이</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <LineChart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>조회수 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">인기 콘텐츠</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <BarChart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>인기 콘텐츠 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시청자 연령대</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <PieChart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>연령대 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">시청자 활동 시간</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>활동 시간 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">카테고리별 성과</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <BarChart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>카테고리 성과 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">콘텐츠 유형별 성과</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <PieChart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p>콘텐츠 유형 성과 차트가 여기에 표시됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
