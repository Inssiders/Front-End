"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Clock } from "lucide-react"
import Link from "next/link"

// 임시저장 데이터 (실제로는 API에서 가져올 것)
const draftsData = [
  {
    id: 1,
    title: "2024 패션 트렌드 분석",
    excerpt: "2024년 봄/여름 시즌 패션 트렌드를 분석한 글입니다. 주요 컬러, 패턴, 스타일 등을 다룹니다.",
    category: "패션",
    type: "article",
    lastEdited: "2023-12-14 15:30",
    thumbnail: "/placeholder.svg?height=200&width=300&text=패션 트렌드",
  },
  {
    id: 2,
    title: "아이유 '홀씨' 커버 영상",
    excerpt: "아이유의 신곡 '홀씨'를 커버한 영상입니다. 편집 중인 상태입니다.",
    category: "K-POP",
    type: "video",
    lastEdited: "2023-12-13 20:45",
    thumbnail: "/placeholder.svg?height=200&width=300&text=아이유 커버",
  },
  {
    id: 3,
    title: "요즘 MZ세대 밈 모음",
    excerpt: "최근 MZ세대 사이에서 유행하는 밈을 모아봤습니다. 아직 작성 중입니다.",
    category: "밈",
    type: "collection",
    lastEdited: "2023-12-12 10:15",
    thumbnail: "/placeholder.svg?height=200&width=300&text=MZ 밈",
  },
  {
    id: 4,
    title: "홈 카페 챌린지 기획",
    excerpt: "집에서 만드는 카페 음료 챌린지 기획안입니다. 참여 방법과 규칙을 정리 중입니다.",
    category: "챌린지",
    type: "challenge",
    lastEdited: "2023-12-10 16:20",
    thumbnail: "/placeholder.svg?height=200&width=300&text=홈 카페",
  },
]

export default function CreatorStudioDrafts() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">임시저장 콘텐츠</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{draftsData.length}개 항목</span>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {draftsData.map((draft, index) => (
          <motion.div key={draft.id} variants={item}>
            <Card className="overflow-hidden border-0 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/4">
                    <img
                      src={draft.thumbnail || "/placeholder.svg"}
                      alt={draft.title}
                      className="w-full h-full object-cover aspect-video md:aspect-square"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{draft.title}</h3>
                        <div className="flex items-center mt-1 space-x-2">
                          <Badge className="bg-purple-600 hover:bg-purple-700">{draft.category}</Badge>
                          <Badge variant="outline">{draft.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>마지막 수정: {draft.lastEdited}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">{draft.excerpt}</p>

                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" size="sm" className="rounded-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        삭제
                      </Button>
                      <Link href={`/creator-studio/edit/${draft.id}`}>
                        <Button className="rounded-full bg-purple-600 hover:bg-purple-700">
                          <Edit className="h-4 w-4 mr-2" />
                          편집 계속하기
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
