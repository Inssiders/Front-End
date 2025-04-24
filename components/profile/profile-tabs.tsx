"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3X3, Bookmark, Award, Heart, Clock } from "lucide-react"
import ProfilePosts from "@/components/profile/profile-posts"
import ProfileSaved from "@/components/profile/profile-saved"
import ProfileChallenges from "@/components/profile/profile-challenges"
import ProfileLikes from "@/components/profile/profile-likes"
import ProfileActivity from "@/components/profile/profile-activity"

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState("posts")

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="posts" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-3xl mx-auto mb-8">
          <TabsTrigger
            value="posts"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("posts")}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            게시물
          </TabsTrigger>
          <TabsTrigger
            value="saved"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("saved")}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            저장됨
          </TabsTrigger>
          <TabsTrigger
            value="challenges"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("challenges")}
          >
            <Award className="h-4 w-4 mr-2" />
            챌린지
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("likes")}
          >
            <Heart className="h-4 w-4 mr-2" />
            좋아요
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("activity")}
          >
            <Clock className="h-4 w-4 mr-2" />
            활동
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="posts">
            <ProfilePosts />
          </TabsContent>
          <TabsContent value="saved">
            <ProfileSaved />
          </TabsContent>
          <TabsContent value="challenges">
            <ProfileChallenges />
          </TabsContent>
          <TabsContent value="likes">
            <ProfileLikes />
          </TabsContent>
          <TabsContent value="activity">
            <ProfileActivity />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
