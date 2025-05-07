"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Instagram, Youtube, Twitter } from "lucide-react"
import Link from "next/link"
import InfluencersLoading from "./influencers-loading"

// 인플루언서 데이터 (실제로는 API에서 가져올 것)
const influencersData = [
  {
    id: 1,
    name: "김민서",
    username: "@minseo_style",
    avatar: "/placeholder.svg?height=100&width=100&text=MS",
    coverImage: "/placeholder.svg?height=200&width=400&text=패션 인플루언서",
    bio: "패션 & 뷰티 인플루언서 | 대학생 | 트렌드 리더",
    followers: 125000,
    posts: 342,
    category: "패션",
    badges: ["인싸 크리에이터", "트렌드 리더"],
    social: {
      instagram: "minseo_style",
      youtube: "MinSeoStyle",
      twitter: "minseo_style",
    },
    isFollowing: false,
    isVerified: true,
  },
  {
    id: 2,
    name: "박준혁",
    username: "@junhyuk_content",
    avatar: "/placeholder.svg?height=100&width=100&text=JH",
    coverImage: "/placeholder.svg?height=200&width=400&text=콘텐츠 크리에이터",
    bio: "콘텐츠 크리에이터 | 유튜버 | 마케팅 전문가",
    followers: 87000,
    posts: 215,
    category: "라이프스타일",
    badges: ["콘텐츠 마스터", "마케팅 전문가"],
    social: {
      instagram: "junhyuk_content",
      youtube: "JunhyukContent",
      twitter: "junhyuk_content",
    },
    isFollowing: true,
    isVerified: true,
  },
  {
    id: 3,
    name: "이지유",
    username: "@jiyu_beauty",
    avatar: "/placeholder.svg?height=100&width=100&text=JY",
    coverImage: "/placeholder.svg?height=200&width=400&text=뷰티 인플루언서",
    bio: "뷰티 인플루언서 | 메이크업 아티스트 | 화장품 리뷰",
    followers: 156000,
    posts: 423,
    category: "뷰티",
    badges: ["뷰티 전문가", "메이크업 아티스트"],
    social: {
      instagram: "jiyu_beauty",
      youtube: "JiyuBeauty",
      twitter: "jiyu_beauty",
    },
    isFollowing: false,
    isVerified: true,
  },
  {
    id: 4,
    name: "최다은",
    username: "@daeun_food",
    avatar: "/placeholder.svg?height=100&width=100&text=DE",
    coverImage: "/placeholder.svg?height=200&width=400&text=푸드 크리에이터",
    bio: "푸드 크리에이터 | 요리 레시피 | 맛집 탐방",
    followers: 92000,
    posts: 287,
    category: "푸드",
    badges: ["푸드 마스터", "요리 전문가"],
    social: {
      instagram: "daeun_food",
      youtube: "DaeunFood",
      twitter: "daeun_food",
    },
    isFollowing: false,
    isVerified: false,
  },
  {
    id: 5,
    name: "정승우",
    username: "@seungwoo_travel",
    avatar: "/placeholder.svg?height=100&width=100&text=SW",
    coverImage: "/placeholder.svg?height=200&width=400&text=여행 인플루언서",
    bio: "여행 인플루언서 | 세계 여행 | 여행 팁 공유",
    followers: 178000,
    posts: 356,
    category: "여행",
    badges: ["여행 전문가", "글로벌 트래블러"],
    social: {
      instagram: "seungwoo_travel",
      youtube: "SeungwooTravel",
      twitter: "seungwoo_travel",
    },
    isFollowing: true,
    isVerified: true,
  },
  {
    id: 6,
    name: "한소희",
    username: "@sohee_fitness",
    avatar: "/placeholder.svg?height=100&width=100&text=SH",
    coverImage: "/placeholder.svg?height=200&width=400&text=피트니스 인플루언서",
    bio: "피트니스 인플루언서 | 퍼스널 트레이너 | 건강한 라이프스타일",
    followers: 134000,
    posts: 298,
    category: "피트니스",
    badges: ["피트니스 전문가", "건강 라이프"],
    social: {
      instagram: "sohee_fitness",
      youtube: "SoheeFitness",
      twitter: "sohee_fitness",
    },
    isFollowing: false,
    isVerified: true,
  },
  {
    id: 7,
    name: "김태호",
    username: "@taeho_gaming",
    avatar: "/placeholder.svg?height=100&width=100&text=TH",
    coverImage: "/placeholder.svg?height=200&width=400&text=게임 스트리머",
    bio: "게임 스트리머 | e스포츠 | 게임 리뷰",
    followers: 210000,
    posts: 187,
    category: "게임",
    badges: ["게임 마스터", "e스포츠 전문가"],
    social: {
      instagram: "taeho_gaming",
      youtube: "TaehoGaming",
      twitter: "taeho_gaming",
    },
    isFollowing: false,
    isVerified: true,
  },
  {
    id: 8,
    name: "이하은",
    username: "@haeun_lifestyle",
    avatar: "/placeholder.svg?height=100&width=100&text=HE",
    coverImage: "/placeholder.svg?height=200&width=400&text=라이프스타일 인플루언서",
    bio: "라이프스타일 인플루언서 | 인테리어 | 일상 공유",
    followers: 98000,
    posts: 312,
    category: "라이프스타일",
    badges: ["라이프스타일 전문가", "인테리어 디자이너"],
    social: {
      instagram: "haeun_lifestyle",
      youtube: "HaeunLifestyle",
      twitter: "haeun_lifestyle",
    },
    isFollowing: true,
    isVerified: false,
  },
]

export default function InfluencersGrid() {
  const [influencers, setInfluencers] = useState(influencersData)
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
    setInfluencers((prevInfluencers) =>
      prevInfluencers.map((influencer) => {
        if (influencer.id === id) {
          return {
            ...influencer,
            isFollowing: !influencer.isFollowing,
            followers: influencer.isFollowing ? influencer.followers - 1 : influencer.followers + 1,
          }
        }
        return influencer
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
    return <InfluencersLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {influencers.map((influencer, index) => (
          <motion.div
            key={influencer.id}
            variants={item}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Card className="overflow-hidden border-0 bg-white dark:bg-gray-800 h-full hover:shadow-lg transition-all duration-300">
              <div className="relative h-32 bg-gradient-to-r from-purple-500 to-indigo-500">
                <img
                  src={influencer.coverImage || "/placeholder.svg"}
                  alt={`${influencer.name} 커버`}
                  className="w-full h-full object-cover"
                />
                {influencer.isVerified && (
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
                    <AvatarImage src={influencer.avatar || "/placeholder.svg"} alt={influencer.name} />
                    <AvatarFallback>{influencer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>

                <div className="mb-3">
                  <Link href={`/influencers/${influencer.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {influencer.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{influencer.username}</p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{influencer.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {influencer.category}
                  </Badge>
                  {influencer.badges.slice(0, 1).map((badge) => (
                    <Badge
                      key={badge}
                      variant="outline"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-900 dark:text-white">
                      {influencer.followers.toLocaleString()}
                    </span>
                    <span>팔로워</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-900 dark:text-white">{influencer.posts}</span>
                    <span>게시물</span>
                  </div>
                  <div className="flex space-x-2">
                    {influencer.social.instagram && (
                      <a
                        href={`https://instagram.com/${influencer.social.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-pink-600 transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                    {influencer.social.youtube && (
                      <a
                        href={`https://youtube.com/${influencer.social.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Youtube className="h-4 w-4" />
                      </a>
                    )}
                    {influencer.social.twitter && (
                      <a
                        href={`https://twitter.com/${influencer.social.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <Button
                  className={`w-full rounded-full ${
                    influencer.isFollowing
                      ? "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  }`}
                  onClick={() => toggleFollow(influencer.id)}
                >
                  <Users className="h-4 w-4 mr-2" />
                  {influencer.isFollowing ? "팔로잉" : "팔로우"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
