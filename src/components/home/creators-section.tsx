"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, ArrowRight, Crown } from "lucide-react"
import Link from "next/link"

const creators = [
  {
    id: 1,
    name: "김민서",
    username: "@minseo_style",
    avatar: "/placeholder.svg?height=100&width=100&text=MS",
    bio: "패션 & 뷰티 인플루언서 | 대학생 | 트렌드 리더",
    followers: 125000,
    posts: 342,
    badges: ["인싸 크리에이터", "트렌드 리더"],
    category: "패션",
    isVerified: true,
  },
  {
    id: 2,
    name: "박준혁",
    username: "@junhyuk_content",
    avatar: "/placeholder.svg?height=100&width=100&text=JH",
    bio: "콘텐츠 크리에이터 | 유튜버 | 마케팅 전문가",
    followers: 87000,
    posts: 215,
    badges: ["콘텐츠 마스터", "K-POP 전문가"],
    category: "엔터테인먼트",
    isVerified: true,
  },
  {
    id: 3,
    name: "이지유",
    username: "@jiyu_kpop",
    avatar: "/placeholder.svg?height=100&width=100&text=JY",
    bio: "K-POP 팬 | 댄스 챌린지 | NCT & 에스파 팬",
    followers: 45000,
    posts: 178,
    badges: ["댄스 챌린지 마스터", "라이징 스타"],
    category: "K-POP",
    isVerified: false,
  },
  {
    id: 4,
    name: "최다은",
    username: "@daeun_meme",
    avatar: "/placeholder.svg?height=100&width=100&text=DE",
    bio: "밈 크리에이터 | 유머 콘텐츠 | 일상 공유",
    followers: 67000,
    posts: 256,
    badges: ["밈 마스터", "유머 퀸"],
    category: "밈",
    isVerified: true,
  },
]

export default function CreatorsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Crown className="h-6 w-6 text-amber-500 mr-2" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">인싸 크리에이터</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              인싸이더에서 가장 인기 있는 크리에이터들을 만나보세요. 그들의 최신 콘텐츠와 트렌드를 확인하고
              팔로우하세요.
            </p>
          </div>

          <Link href="/creators">
            <Button variant="outline" className="mt-4 md:mt-0 rounded-full">
              모든 크리에이터 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative"
            >
              <Card className="overflow-hidden border-0 bg-white dark:bg-gray-800 h-full hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
                    {creator.isVerified && (
                      <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-1">
                        <Crown className="h-4 w-4 text-amber-500" />
                      </div>
                    )}
                  </div>

                  <div className="px-5 pt-12 pb-5 relative">
                    <div className="absolute -top-10 left-5">
                      <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
                        <AvatarFallback>{creator.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>

                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">{creator.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{creator.username}</p>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{creator.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {creator.badges.map((badge) => (
                        <Badge
                          key={badge}
                          className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900 dark:text-white">
                          {creator.followers.toLocaleString()}
                        </span>
                        <span>팔로워</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900 dark:text-white">{creator.posts}</span>
                        <span>게시물</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900 dark:text-white">{creator.category}</span>
                        <span>카테고리</span>
                      </div>
                    </div>

                    <Button className="w-full bg-purple-600 hover:bg-purple-700 rounded-full">
                      <Users className="h-4 w-4 mr-2" />
                      팔로우
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/80 flex items-center justify-center opacity-0 z-10"
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{creator.name}</h3>
                  <p className="text-white/90 mb-4">{creator.bio}</p>
                  <Link href={`/creators/${creator.id}`}>
                    <Button variant="secondary" className="rounded-full">
                      프로필 보기
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
