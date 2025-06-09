"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { authApi } from "@/utils/fetch/auth";
import { UserType } from "@/utils/types/user";
import { Save, Shield } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface PrivacySettingsProps {
  user: UserType;
}

export default function PrivacySettings({ user }: PrivacySettingsProps) {
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [privacyData, setPrivacyData] = useState({
    accountVisible: user.accountVisible ?? true,
    followerVisible: user.followerVisible ?? true,
  });

  const handlePrivacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authApi.updateProfile({
        nickname: user.nickname || "",
        introduction: user.bio || "",
        account_visibility: privacyData.accountVisible,
        follower_visibility: privacyData.followerVisible,
      });

      await update({
        accountVisible: data.data?.accountVisible ?? privacyData.accountVisible,
        followerVisible: data.data?.followerVisible ?? privacyData.followerVisible,
      });

      toast.success("개인정보 설정이 성공적으로 저장되었습니다.");
    } catch (error) {
      console.error("개인정보 설정 저장 에러:", error);
      toast.error(error instanceof Error ? error.message : "개인정보 설정 저장에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader className="border-b border-gray-100/50">
        <CardTitle className="flex items-center text-lg font-semibold text-gray-800">
          <Shield className="mr-2 size-5" />
          개인정보 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handlePrivacySubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 border border-gray-100">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">계정 공개 설정</Label>
                <p className="text-xs text-gray-500">다른 사용자가 내 프로필을 볼 수 있도록 허용합니다.</p>
              </div>
              <Switch
                checked={privacyData.accountVisible}
                onCheckedChange={(checked) => setPrivacyData((prev) => ({ ...prev, accountVisible: checked }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50/50 border border-gray-100">
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">팔로워 목록 공개</Label>
                <p className="text-xs text-gray-500">다른 사용자가 내 팔로워 목록을 볼 수 있도록 허용합니다.</p>
              </div>
              <Switch
                checked={privacyData.followerVisible}
                onCheckedChange={(checked) => setPrivacyData((prev) => ({ ...prev, followerVisible: checked }))}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-purple-500 data-[state=checked]:to-pink-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>저장 중...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Save className="w-4 h-4" />
                  <span>설정 저장</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
