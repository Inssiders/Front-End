"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authApi } from "@/utils/fetch/auth";
import { motion } from "framer-motion";
import { Camera, Save, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProfileData {
  nickname: string;
  introduction: string;
  profileImage?: string;
}

export function ProfileSettings() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<ProfileData>({
    nickname: "",
    introduction: "",
    profileImage: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setProfile({
        nickname: session.user.nickname || "",
        introduction: session.user.bio || "",
        profileImage: session.user.profileImage || "",
      });
    }
  }, [session]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await authApi.updateProfile({
        nickname: profile.nickname,
        introduction: profile.introduction,
        profile_url: profile.profileImage || "",
        account_visibility: true,
        follower_visibility: true,
      });
      toast.success("프로필이 수정되었습니다.");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("프로필 수정에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100/50">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
          <User className="mr-2 size-5" />
          프로필 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
            <motion.div
              className="flex flex-col items-center space-y-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage
                  src={profile.profileImage || "/placeholder.svg?height=96&width=96&text=MS"}
                  alt="프로필 이미지"
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-xl font-bold text-white">
                  {profile.nickname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button type="button" size="icon" className="rounded-full bg-white shadow-md hover:shadow-lg">
                  <Camera className="size-4" />
                </Button>
              </motion.div>
            </motion.div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname" className="text-sm font-medium text-gray-700">
                  닉네임
                </Label>
                <Input
                  id="nickname"
                  value={profile.nickname}
                  onChange={(e) => handleInputChange("nickname", e.target.value)}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  placeholder="닉네임을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="introduction" className="text-sm font-medium text-gray-700">
                  자기소개
                </Label>
                <Textarea
                  id="introduction"
                  value={profile.introduction}
                  onChange={(e) => handleInputChange("introduction", e.target.value)}
                  className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 min-h-20"
                  placeholder="간단한 자기소개를 작성해보세요"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage" className="text-sm font-medium text-gray-700">
                  프로필 이미지 URL
                </Label>
                <Input
                  id="profileImage"
                  value={profile.profileImage}
                  onChange={(e) => handleInputChange("profileImage", e.target.value)}
                  placeholder="프로필 이미지 URL을 입력하세요"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6"
            >
              {isSaving ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>저장 중...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>프로필 저장</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
