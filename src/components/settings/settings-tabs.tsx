"use client";

import SettingsAppearance from "@/components/settings/settings-appearance";
import SettingsBilling from "@/components/settings/settings-billing";
import SettingsHelp from "@/components/settings/settings-help";
import SettingsNotifications from "@/components/settings/settings-notifications";
import SettingsPrivacy from "@/components/settings/settings-privacy";
import SettingsProfile from "@/components/settings/settings-profile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Bell,
  CreditCard,
  HelpCircle,
  Lock,
  Palette,
  User,
} from "lucide-react";
import { useState } from "react";

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList
          className="flex md:grid md:grid-cols-6 overflow-x-auto no-scrollbar gap-1 mb-8 w-full rounded-lg bg-gray-50 dark:bg-gray-900 p-1"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <TabsTrigger
            value="profile"
            className="flex-1 min-w-[110px] px-2 py-2 text-xs md:text-sm"
          >
            <User className="h-4 w-4 mr-1" />
            프로필
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex-1 min-w-[110px] px-2 py-2 text-xs md:text-sm"
          >
            <Bell className="h-4 w-4 mr-1" />
            알림
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="flex-1 min-w-[110px] px-2 py-2 text-xs md:text-sm"
          >
            <Lock className="h-4 w-4 mr-1" />
            개인정보
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex-1 min-w-[110px] px-2 py-2 text-xs md:text-sm"
          >
            <Palette className="h-4 w-4 mr-1" />
            테마
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="flex-1 min-w-[110px] px-2 py-2 text-xs md:text-sm"
          >
            <CreditCard className="h-4 w-4 mr-1" />
            결제
          </TabsTrigger>
          <TabsTrigger
            value="help"
            className="flex-1 min-w-[110px] px-2 py-2 text-xs md:text-sm"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            도움말
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="w-full">
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
          </div>
        </motion.div>
      </Tabs>
    </div>
  );
}
