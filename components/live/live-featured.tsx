"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Play } from "lucide-react"
import Link from "next/link"

// 인기 라이브 데이터 (실제로는 API에서 가져올 것)
const featuredLive = {
  id: 1,
  title: "신곡 발매 기념 라이브 방송",
  thumbnail: "/placeholder.svg?height=600&width=1200&text=라이브 방송",
  category: "K-POP",
  viewers: 12543,
  host: {
    name: "아이유 (이지은)",
    avatar: "/placeholder.svg?height=40&width=40&text=IU",
    followers: 30000000,
  },
  duration: "01:23:45",
  isLive: true,
}

export default function LiveFeatured() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card className="overflow-hidden border-0 bg-gray-100 dark:bg-gray-900">
          <div className="relative aspect-video">
            <img
              src={featuredLive.thumbnail || "/placeholder.svg"}
              alt={featuredLive.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
              <div className="flex items-center mb-4">
                <Badge className="bg-red-600 hover:bg-red-700 mr-2">LIVE</Badge>
                <Badge variant="outline" className="bg-black/30 text-white border-0">
                  {featuredLive.category}
                </Badge>
                <div className="ml-auto flex items-center text-white text-sm">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{featuredLive.viewers.toLocaleString()} 시청 중</span>
                </div>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{featuredLive.title}</h2>

              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-white">
                  <AvatarImage src={featuredLive.host.avatar || "/placeholder.svg"} alt={featuredLive.host.name} />
                  <AvatarFallback>{featuredLive.host.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-medium">{featuredLive.host.name}</h3>
                  <p className="text-white/70 text-sm">{(featuredLive.host.followers / 1000000).toFixed(1)}M 팔로워</p>
                </div>
                <div className="ml-auto">
                  <Link href={`/live/${featuredLive.id}`}>
                    <Button className="bg-purple-600 hover:bg-purple-700 rounded-full">
                      <Play className="h-4 w-4 mr-2" />
                      지금 시청하기
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <motion.div
              className="absolute inset-0 bg-purple-600/20 flex items-center justify-center"
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white/20 backdrop-blur-sm p-6 rounded-full"
              >
                <Play className="h-16 w-16 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
