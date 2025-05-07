"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Grid3X3, BarChart, Clock, Settings } from "lucide-react"
import CreatorStudioContent from "@/components/creator-studio/creator-studio-content"
import CreatorStudioAnalytics from "@/components/creator-studio/creator-studio-analytics"
import CreatorStudioDrafts from "@/components/creator-studio/creator-studio-drafts"
import CreatorStudioSettings from "@/components/creator-studio/creator-studio-settings"

export default function CreatorStudioTabs() {
  const [activeTab, setActiveTab] = useState("content")

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-3xl mx-auto mb-8">
          <TabsTrigger
            value="content"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("content")}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            콘텐츠
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("analytics")}
          >
            <BarChart className="h-4 w-4 mr-2" />
            분석
          </TabsTrigger>
          <TabsTrigger
            value="drafts"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("drafts")}
          >
            <Clock className="h-4 w-4 mr-2" />
            임시저장
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
            onClick={() => setActiveTab("settings")}
          >
            <Settings className="h-4 w-4 mr-2" />
            설정
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="content">
            <CreatorStudioContent />
          </TabsContent>
          <TabsContent value="analytics">
            <CreatorStudioAnalytics />
          </TabsContent>
          <TabsContent value="drafts">
            <CreatorStudioDrafts />
          </TabsContent>
          <TabsContent value="settings">
            <CreatorStudioSettings />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
