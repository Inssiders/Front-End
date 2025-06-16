"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ProfileData } from "@/utils/types/profile";
import { motion } from "framer-motion";
import { Camera, Edit, Settings } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface ProfileHeaderProps {
  profile: ProfileData;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800 md:h-80">
        <img
          src={profile.user_detail_profile_url || "/placeholder.svg"}
          alt="커버 이미지"
          className="size-full object-cover"
        />
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <Button variant="secondary" size="sm" className="rounded-full bg-black/50 text-white hover:bg-black/70">
            <Camera className="mr-2 size-4" />
            커버 변경
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-6">
          <div className="flex flex-col items-start md:flex-row md:items-end">
            <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <Avatar className="size-32 border-4 border-white shadow-md dark:border-gray-900">
                <AvatarImage
                  src={profile.user_detail_profile_url || "/placeholder.svg"}
                  alt={profile.user_detail_username || profile.user_id}
                />
                <AvatarFallback>{(profile.user_detail_username || profile.user_id).substring(0, 2)}</AvatarFallback>
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
                    {profile.user_detail_username || profile.user_id}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">@{profile.user_id}</p>
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
            <p className="mb-4 text-gray-700 dark:text-gray-300">{profile.user_detail_introduction}</p>

            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900 dark:text-white">{(profile.posts || 0).toLocaleString()}</span>
                <span className="text-gray-600 dark:text-gray-400">게시물</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  {(profile.followers || 0).toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400">팔로워</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-gray-900 dark:text-white">
                  {(profile.following || 0).toLocaleString()}
                </span>
                <span className="text-gray-600 dark:text-gray-400">팔로잉</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
