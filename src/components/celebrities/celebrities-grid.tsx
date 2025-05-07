"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Instagram, Youtube, Music } from "lucide-react"
import Link from "next/link"
import CelebritiesLoading from "./celebrities-loading"

// 연예인 데이터 (실제로는 API에서 가져올 것)
const celebritiesData = [
  {
    id: 1,
    name: "김태형 (뷔)",
    group: "BTS",
    avatar: "/placeholder.svg?height=100&width=100&text=V",
    coverImage: "/placeholder.svg?height=200&width=400&text=BTS V",
    bio: "BTS 멤버 | 솔로 아티스트 | 배우",
    followers: 45000000,
    agency: "HYBE",
    category: "K-POP",
    badges: ["아이돌", "솔로 아티스트"],
    social: {
      instagram: "thv",
      youtube: "BANGTANTV",
    },
    isFollowing: false,
    isVerified: true,
    recentNews: "새 솔로 앨범 'Layover' 발매",
  },
  {
    id: 2,
    name: "카리나",
    group: "에스파",
    avatar: "/placeholder.svg?height=100&width=100&text=KR",
    coverImage: "/placeholder.svg?height=200&width=400&text=aespa Karina",
    bio: "에스파 멤버 | 댄서 | 모델",
    followers: 12000000,
    agency: "SM 엔터테인먼트",
    category: "K-POP",
    badges: ["아이돌", "모델"],
    social: {
      instagram: "karina.official",
      youtube: "SMTOWN",
    },
    isFollowing: true,
    isVerified: true,
    recentNews: "새 미니앨범 'Drama' 활동 중",
  },
  {
    id: 3,
    name: "이종석",
    group: null,
    avatar: "/placeholder.svg?height=100&width=100&text=JS",
    coverImage: "/placeholder.svg?height=200&width=400&text=이종석",
    bio: "배우 | 모델 | 전 YG 엔터테인먼트",
    followers: 8500000,
    agency: "에이맨 프로젝트",
    category: "배우",
    badges: ["배우", "모델"],
    social: {
      instagram: "jongsuk0206",
    },
    isFollowing: false,
    isVerified: true,
    recentNews: "새 드라마 '악마가 너의 이름을 부를 때' 출연 확정",
  },
  {
    id: 4,
    name: "아이유 (이지은)",
    group: null,
    avatar: "/placeholder.svg?height=100&width=100&text=IU",
    coverImage: "/placeholder.svg?height=200&width=400&text=아이유",
    bio: "가수 | 배우 | 작곡가",
    followers: 30000000,
    agency: "EDAM 엔터테인먼트",
    category: "K-POP",
    badges: ["솔로 아티스트", "배우"],
    social: {
      instagram: "dlwlrma",
      youtube: "dlwlrma",
    },
    isFollowing: true,
    isVerified: true,
    recentNews: "새 싱글 '홀씨' 발매 및 콘서트 투어 예정",
  },
  {
    id: 5,
    name: "유재석",
    group: null,
    avatar: "/placeholder.svg?height=100&width=100&text=YJS",
    coverImage: "/placeholder.svg?height=200&width=400&text=유재석",
    bio: "예능인 | MC | 코미디언",
    followers: 15000000,
    agency: "안테나",
    category: "예능인",
    badges: ["MC", "코미디언"],
    social: {},
    isFollowing: false,
    isVerified: true,
    recentNews: "MBC '놀면 뭐하니?' 진행 중",
  },
  {
    id: 6,
    name: "정호연",
    group: null,
    avatar: "/placeholder.svg?height=100&width=100&text=HY",
    coverImage: "/placeholder.svg?height=200&width=400&text=정호연",
    bio: "배우 | 모델 | '오징어 게임' 출연",
    followers: 7800000,
    agency: "사람엔터테인먼트",
    category: "배우",
    badges: ["배우", "모델"],
    social: {
      instagram: "hoooooyeony",
    },
    isFollowing: false,
    isVerified: true,
    recentNews: "할리우드 영화 출연 확정",
  },
  {
    id: 7,
    name: "뉴진스",
    group: "NewJeans",
    avatar: "/placeholder.svg?height=100&width=100&text=NJ",
    coverImage: "/placeholder.svg?height=200&width=400&text=NewJeans",
    bio: "K-POP 걸그룹 | HYBE ADOR 소속",
    followers: 20000000,
    agency: "HYBE ADOR",
    category: "K-POP",
    badges: ["아이돌", "걸그룹"],
    social: {
      instagram: "newjeans_official",
      youtube: "NewJeans",
    },
    isFollowing: true,
    isVerified: true,
    recentNews: "새 싱글 'How Sweet' 발매",
  },
  {
    id: 8,
    name: "송강호",
    group: null,
    avatar: "/placeholder.svg?height=100&width=100&text=SKH",
    coverImage: "/placeholder.svg?height=200&width=400&text=송강호",
    bio: "배우 | '기생충' 주연 | 아카데미상 수상작 출연",
    followers: 5000000,
    agency: "써브라임 아티스트 에이전시",
    category: "배우",
    badges: ["배우", "영화배우"],
    social: {},
    isFollowing: false,
    isVerified: true,
    recentNews: "새 영화 '비상선언' 개봉",
  },
]

export default function CelebritiesGrid() {
  const [celebrities, setCelebrities] = useState(celebritiesData)
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    // 데이터 로딩 시뮬레이션
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const toggleFollow = (id: number) => {
    setCelebrities((prevCelebrities) =>
      prevCelebrities.map((celebrity) => {
        if (celebrity.id === id) {
          return {
            ...celebrity,
            isFollowing: !celebrity.isFollowing,
            followers: celebrity.isFollowing ? celebrity.followers - 1 : celebrity.followers + 1,
          }
        }
        return celebrity
      }),
    )
  }

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

  if (loading) {
    return <CelebritiesLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {celebrities.map((celebrity, index) => (
          <motion.div
            key={celebrity.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-800 h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-32 bg-gradient-to-r from-pink-500 to-purple-500">
                <img
                  src={celebrity.coverImage || "/placeholder.svg"}
                  alt={`${celebrity.name} 커버`}
                  className="w-full h-full object-cover"
                />
                {celebrity.isVerified && (
                  <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 rounded-full p-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-blue-500"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <CardContent className="p-5 pt-12 relative">
                <div className="absolute -top-10 left-5">
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800">
                    <AvatarImage src={celebrity.avatar || "/placeholder.svg"} alt={celebrity.name} />
                    <AvatarFallback>{celebrity.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-3">
                  <Link href={`/celebrities/${celebrity.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {celebrity.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {celebrity.group ? `${celebrity.group} | ` : ""}
                    {celebrity.agency}
                  </p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{celebrity.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {celebrity.category}
                  </Badge>
                  {celebrity.badges.slice(0, 1).map((badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                  <span className="font-medium">최근 소식:</span> {celebrity.recentNews}
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {(celebrity.followers / 1000000).toFixed(1)}M
                    </span>
                    <span>팔로워</span>
                  </div>
                  <div className="flex space-x-2">
                    {celebrity.social.instagram && (
                      <a
                        href={`https://instagram.com/${celebrity.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-pink-600 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                    {celebrity.social.youtube && (
                      <a
                        href={`https://youtube.com/${celebrity.social.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Youtube className="h-4 w-4" />
                      </a>
                    )}
                    {celebrity.category === "K-POP" && (
                      <a
                        href="#"
                        className="text-gray-500 hover:text-green-600 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Music className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <Button
                  className={`w-full rounded-full ${
                    celebrity.isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                  onClick={() => toggleFollow(celebrity.id)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {celebrity.isFollowing ? "팔로잉" : "팔로우"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
