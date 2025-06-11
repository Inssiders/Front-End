"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api-client";
import { motion } from "framer-motion";
import { Eye, Loader2, Save, Settings, Shield, Upload, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ProfileFormData {
  nickname: string;
  profile_url: string;
  bio: string;
  account_visible: boolean;
  follower_visible: boolean;
}

export default function SettingsUnified() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileFormData>({
    nickname: "",
    profile_url: "",
    bio: "",
    account_visible: true,
    follower_visible: true,
  });

  // 세션에서 초기 데이터 로드
  useEffect(() => {
    if (session?.user) {
      setProfileData({
        nickname: session.user.nickname || "",
        profile_url: session.user.profileImage || "",
        bio: session.user.bio || "",
        account_visible: session.user.accountVisible ?? true,
        follower_visible: session.user.followerVisible ?? true,
      });
    }
  }, [session]);

  const handleInputChange = (field: keyof ProfileFormData, value: string | boolean) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API 요청 - 주어진 형식에 맞춤
      await api.patch("/api/profiles/me", profileData);

      // NextAuth 세션 업데이트
      await update({
        nickname: profileData.nickname,
        profileImage: profileData.profile_url,
        bio: profileData.bio,
        accountVisible: profileData.account_visible,
        followerVisible: profileData.follower_visible,
      });

      toast.success("프로필이 성공적으로 업데이트되었습니다!");
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("프로필 업데이트에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* 헤더 */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">프로필 설정</h1>
        </div>
        <p className="text-muted-foreground">프로필 정보와 개인정보 설정을 한번에 관리하세요</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 프로필 정보 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                기본 정보
              </CardTitle>
              <CardDescription>다른 사용자에게 표시될 프로필 정보를 설정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 프로필 이미지 섹션 */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.profile_url || session.user.profileImage} alt="프로필 이미지" />
                    <AvatarFallback className="text-lg">
                      {profileData.nickname?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor="profile_url">프로필 이미지 URL</Label>
                  <Input
                    id="profile_url"
                    placeholder="https://example.com/image.jpg"
                    value={profileData.profile_url}
                    onChange={(e) => handleInputChange("profile_url", e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">이미지 URL을 입력하거나 위 버튼을 클릭해 업로드하세요</p>
                </div>
              </div>

              <Separator />

              {/* 기본 정보 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nickname">닉네임 *</Label>
                  <Input
                    id="nickname"
                    placeholder="닉네임을 입력하세요"
                    value={profileData.nickname}
                    onChange={(e) => handleInputChange("nickname", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input id="email" type="email" value={session.user.email || ""} disabled className="bg-muted" />
                  <p className="text-sm text-muted-foreground">이메일은 변경할 수 없습니다</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">자기소개</Label>
                <Textarea
                  id="bio"
                  placeholder="자신을 소개해보세요 (최대 500자)"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  maxLength={500}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>다른 사용자에게 표시될 소개글입니다</span>
                  <span>{profileData.bio.length}/500</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 개인정보 설정 카드 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                개인정보 설정
              </CardTitle>
              <CardDescription>프로필 공개 범위를 설정하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <Label className="font-medium">계정 공개 설정</Label>
                      <Badge variant={profileData.account_visible ? "default" : "secondary"}>
                        {profileData.account_visible ? "공개" : "비공개"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">다른 사용자가 내 프로필을 볼 수 있도록 허용합니다</p>
                  </div>
                  <Switch
                    checked={profileData.account_visible}
                    onCheckedChange={(checked) => handleInputChange("account_visible", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <Label className="font-medium">팔로워 목록 공개</Label>
                      <Badge variant={profileData.follower_visible ? "default" : "secondary"}>
                        {profileData.follower_visible ? "공개" : "비공개"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      다른 사용자가 내 팔로워 목록을 볼 수 있도록 허용합니다
                    </p>
                  </div>
                  <Switch
                    checked={profileData.follower_visible}
                    onCheckedChange={(checked) => handleInputChange("follower_visible", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 저장 버튼 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end space-x-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              // 초기값으로 리셋
              if (session?.user) {
                setProfileData({
                  nickname: session.user.nickname || "",
                  profile_url: session.user.profileImage || "",
                  bio: session.user.bio || "",
                  account_visible: session.user.accountVisible ?? true,
                  follower_visible: session.user.followerVisible ?? true,
                });
              }
            }}
          >
            초기화
          </Button>
          <Button type="submit" disabled={isLoading || !profileData.nickname.trim()} className="min-w-[120px]">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                저장 중...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                저장하기
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
