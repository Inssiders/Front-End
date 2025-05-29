"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Camera, KeyRound, Save } from "lucide-react";

export default function SettingsProfile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <Card className="p-2 sm:p-4">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg md:text-xl">
            프로필 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <div className="space-y-6">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96&text=MS"
                    alt="프로필 이미지"
                  />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="username" className="mb-1 block">
                      닉네임
                    </Label>
                    <Input id="username" defaultValue="@minseo_style" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio" className="mb-1 block">
                    소개
                  </Label>
                  <Textarea
                    id="bio"
                    defaultValue="패션 & 뷰티 인플루언서 | 대학생 | 트렌드 리더"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="mb-1 block">
                    이메일
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="minseo@example.com"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-2" />
                저장하기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="p-2 sm:p-4">
        <CardHeader className="pb-2 sm:pb-4">
          <CardTitle className="text-base sm:text-lg md:text-xl">
            비밀번호 변경
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 sm:p-2 md:p-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="current-password" className="mb-1 block">
                  현재 비밀번호
                </Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="new-password" className="mb-1 block">
                  새 비밀번호
                </Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="confirm-password" className="mb-1 block">
                  새 비밀번호 확인
                </Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" className="bg-white hover:bg-gray-100">
                <KeyRound className="h-4 w-4 mr-2" />
                비밀번호 변경
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
