"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Edit, Camera } from "lucide-react";
import Link from "next/link";

export default function ProfileHeader() {
  const [isHovered, setIsHovered] = useState(false);

  // 프로필 데이터 (실제로는 API에서 가져올 것)
  const profile = {
    name: "김민서",
    username: "@minseo_style",
    avatar: "/placeholder.svg?height=150&width=150&text=MS",
    bio: "패션 & 뷰티 인플루언서 | 대학생 | 트렌드 리더",
    followers: 125000,
    following: 532,
    posts: 342,
    points: 8750,
    level: 23,
    badges: ["인싸 크리에이터", "트렌드 리더", "챌린지 마스터"],
    coverImage: "/placeholder.svg?height=400&width=1200&text=커버 이미지",
  };

  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800 md:h-80">
        <img
          src={profile.coverImage || "/placeholder.svg"}
          alt="커버 이미지"
          className="size-full object-cover"
        />
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <Camera className="mr-2 size-4" />
            커버 변경
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-6">
          <div className="flex flex-col items-start md:flex-row md:items-end">
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Avatar className="size-32 border-4 border-white shadow-md dark:border-gray-900">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50"
                >
                  <Camera className="size-6 text-white" />
                </motion.div>
              )}
            </div>

            <div className="mt-4 grow md:ml-6 md:mt-0">
              <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profile.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">{profile.username}</p>
                </div>
                <div className="mt-4 flex space-x-2 md:mt-0">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Edit className="mr-2 size-4" />
                    프로필 편집
                  </Button>
                  <Link href="/settings">
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <Settings className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="mb-4 text-gray-700 dark:text-gray-300">{profile.bio}</p>

            <div className="mb-6 flex flex-wrap gap-2">
              {profile.badges.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                >
                  {badge}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  {profile.posts.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400">게시물</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  {profile.followers.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400">팔로워</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  {profile.following.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400">팔로잉</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {profile.points.toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400">인싸 포인트</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-amber-500">Lv.{profile.level}</span>
                <span className="text-gray-600 dark:text-gray-400">인싸 레벨</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
