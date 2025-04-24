"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, Eye, Edit, Trash2, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react"
import Link from "next/link"

// 콘텐츠 데이터 (실제로는 API에서 가져올 것)
const contentData = [
  {
    id: 1,
    title: "2023 인기 밈 모음",
    image: "/placeholder.svg?height=400&width=400&text=인기 밈 모음",
    type: "article",
    category: "밈",
    status: "published",
    publishedAt: "2023-12-15",
    likes: 3245,
    comments: 187,
    views: 12543,
  },
  {
    id: 2,
    title: "뉴진스 'ETA' 댄스 튜토리얼",
    image: "/placeholder.svg?height=400&width=400&text=뉴진스 댄스",
    type: "video",
    category: "K-POP",
    status: "published",
    publishedAt: "2023-12-10",
    likes: 8765,
    comments: 543,
    views: 34567,
  },
  {
    id: 3,
    title: "아무말 대잔치 밈 만들기",
    image: "/placeholder.svg?height=400&width=400&text=아무말 대잔치",
    type: "tutorial",
    category: "밈",
    status: "published",
    publishedAt: "2023-12-05",
    likes: 5432,
    comments: 321,
    views: 23456,
  },
  {
    id: 4,
    title: "MZ세대 패션 트렌드 분석",
    image: "/placeholder.svg?height=400&width=400&text=패션 트렌드",
    type: "article",
    category: "패션",
    status: "published",
    publishedAt: "2023-11-28",
    likes: 2345,
    comments: 154,
    views: 9876,
  },
  {
    id: 5,
    title: "아이유 '홀씨' 립싱크 챌린지",
    image: "/placeholder.svg?height=400&width=400&text=아이유 립싱크",
    type: "challenge",
    category: "K-POP",
    status: "published",
    publishedAt: "2023-11-20",
    likes: 7654,
    comments: 432,
    views: 28765,
  },
  {
    id: 6,
    title: "틱톡 인기 챌린지 모음",
    image: "/placeholder.svg?height=400&width=400&text=틱톡 챌린지",
    type: "collection",
    category: "챌린지",
    status: "published",
    publishedAt: "2023-11-15",
    likes: 4321,
    comments: 234,
    views: 15678,
  },
]

export default function CreatorStudioContent() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">내 콘텐츠</h2>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="콘텐츠 검색..."
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

          <Link href="/creator-studio/create">
            <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">새 콘텐츠</Button>
          </Link>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">콘텐츠 유형</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="article">아티클</SelectItem>
                  <SelectItem value="video">비디오</SelectItem>
                  <SelectItem value="tutorial">튜토리얼</SelectItem>
                  <SelectItem value="challenge">챌린지</SelectItem>
                  <SelectItem value="collection">컬렉션</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">카테고리</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="meme">밈</SelectItem>
                  <SelectItem value="kpop">K-POP</SelectItem>
                  <SelectItem value="fashion">패션</SelectItem>
                  <SelectItem value="challenge">챌린지</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">상태</label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="published">게시됨</SelectItem>
                  <SelectItem value="draft">임시저장</SelectItem>
                  <SelectItem value="scheduled">예약됨</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">정렬</label>
              <Select defaultValue="newest">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="정렬 기준" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">최신순</SelectItem>
                  <SelectItem value="oldest">오래된순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="views">조회수순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {contentData.map((content, index) => (
          <motion.div
            key={content.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900 h-full">
              <div className="relative">
                <img
                  src={content.image || "/placeholder.svg"}
                  alt={content.title}
                  className="w-full aspect-video object-cover"
                />

                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600 hover:bg-purple-700">{content.category}</Badge>
                </div>

                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-white/80 dark:bg-black/50">
                    {content.type}
                  </Badge>
                </div>

                <motion.div
                  className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center opacity-0"
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex space-x-3">
                    <Link href={`/creator-studio/edit/${content.id}`}>
                      <Button variant="secondary" size="sm" className="rounded-full">
                        <Edit className="h-4 w-4 mr-2" />
                        편집
                      </Button>
                    </Link>
                    <Button variant="destructive" size="sm" className="rounded-full">
                      <Trash2 className="h-4 w-4 mr-2" />
                      삭제
                    </Button>
                  </div>
                </motion.div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{content.title}</h3>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>{new Date(content.publishedAt).toLocaleDateString("ko-KR")}</span>
                  <Badge
                    variant="outline"
                    className={`
                    ${content.status === "published" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : ""}
                    ${content.status === "draft" ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" : ""}
                    ${content.status === "scheduled" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" : ""}
                  `}
                  >
                    {content.status === "published" ? "게시됨" : content.status === "draft" ? "임시저장" : "예약됨"}
                  </Badge>
                </div>

                <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 mr-1" />
                    <span>{content.likes.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>{content.comments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    <span>{content.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
