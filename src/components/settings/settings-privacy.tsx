"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function SettingsPrivacy() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="mb-4 p-2 sm:p-4">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg md:text-xl">
            개인정보 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                계정 공개 설정
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="public-profile" className="flex-1">
                    공개 프로필
                  </Label>
                  <Switch id="public-profile" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-activity" className="flex-1">
                    활동 내역 공개
                  </Label>
                  <Switch id="show-activity" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-followers" className="flex-1">
                    팔로워 목록 공개
                  </Label>
                  <Switch id="show-followers" defaultChecked />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                데이터 및 개인정보
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="data-collection" className="flex-1">
                    데이터 수집 허용
                  </Label>
                  <Switch id="data-collection" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="personalized-ads" className="flex-1">
                    맞춤형 광고
                  </Label>
                  <Switch id="personalized-ads" />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Lock className="h-4 w-4 mr-2" />
                개인정보 설정 저장
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
