"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Lock, Palette, CreditCard, HelpCircle } from "lucide-react"
import SettingsProfile from "@/components/settings/settings-profile"
import SettingsNotifications from "@/components/settings/settings-notifications"
import SettingsPrivacy from "@/components/settings/settings-privacy"
import SettingsAppearance from "@/components/settings/settings-appearance"
import SettingsBilling from "@/components/settings/settings-billing"
import SettingsHelp from "@/components/settings/settings-help"

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
          <TabsTrigger value="profile" onClick={() => setActiveTab("profile")}>
            <User className="h-4 w-4 mr-2" />
            프로필
          </TabsTrigger>
          <TabsTrigger value="notifications" onClick={() => setActiveTab("notifications")}>
            <Bell className="h-4 w-4 mr-2" />
            알림
          </TabsTrigger>
          <TabsTrigger value="privacy" onClick={() => setActiveTab("privacy")}>
            <Lock className="h-4 w-4 mr-2" />
            개인정보
          </TabsTrigger>
          <TabsTrigger value="appearance" onClick={() => setActiveTab("appearance")}>
            <Palette className="h-4 w-4 mr-2" />
            테마
          </TabsTrigger>
          <TabsTrigger value="billing" onClick={() => setActiveTab("billing")}>
            <CreditCard className="h-4 w-4 mr-2" />
            결제
          </TabsTrigger>
          <TabsTrigger value="help" onClick={() => setActiveTab("help")}>
            <HelpCircle className="h-4 w-4 mr-2" />
            도움말
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="profile">
            <SettingsProfile />
          </TabsContent>
          <TabsContent value="notifications">
            <SettingsNotifications />
          </TabsContent>
          <TabsContent value="privacy">
            <SettingsPrivacy />
          </TabsContent>
          <TabsContent value="appearance">
            <SettingsAppearance />
          </TabsContent>
          <TabsContent value="billing">
            <SettingsBilling />
          </TabsContent>
          <TabsContent value="help">
            <SettingsHelp />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  )
}
