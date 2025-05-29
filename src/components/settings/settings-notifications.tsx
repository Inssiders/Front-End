"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

export default function SettingsNotifications() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 p-2 sm:p-4">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg md:text-xl">
            알림 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                앱 알림
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="comments" className="flex-1">
                    댓글 알림
                  </Label>
                  <Switch id="comments" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="likes" className="flex-1">
                    좋아요 알림
                  </Label>
                  <Switch id="likes" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="follows" className="flex-1">
                    팔로우 알림
                  </Label>
                  <Switch id="follows" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="mentions" className="flex-1">
                    멘션 알림
                  </Label>
                  <Switch id="mentions" defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                이메일 알림
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-news" className="flex-1">
                    뉴스레터 및 업데이트
                  </Label>
                  <Switch id="email-news" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketing" className="flex-1">
                    마케팅 이메일
                  </Label>
                  <Switch id="email-marketing" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-activity" className="flex-1">
                    계정 활동 요약
                  </Label>
                  <Switch id="email-activity" defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Bell className="h-4 w-4 mr-2" />
                알림 설정 저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
