"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "@/utils/api-client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PrivacySettings() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const [privacyData, setPrivacyData] = useState({
    accountVisible: true,
    followerVisible: true,
  });

  useEffect(() => {
    if (session?.user) {
      setPrivacyData({
        accountVisible: session.user.accountVisible ?? true,
        followerVisible: session.user.followerVisible ?? true,
      });
    }
  }, [session]);

  const handlePrivacySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await api.patch("/api/profiles/me", {
        nickname: session?.user?.nickname || "",
        introduction: session?.user?.bio || "",
        account_visibility: privacyData.accountVisible,
        follower_visibility: privacyData.followerVisible,
      });

      await update({
        accountVisible: privacyData.accountVisible,
        followerVisible: privacyData.followerVisible,
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
    <Card>
      <CardHeader>
        <CardTitle>개인정보 설정</CardTitle>
        <CardDescription>프로필 공개 범위를 설정할 수 있습니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePrivacySubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-1">
                <Label className="text-sm font-medium">계정 공개 설정</Label>
                <p className="text-xs text-muted-foreground">다른 사용자가 내 프로필을 볼 수 있도록 허용합니다.</p>
              </div>
              <Switch
                checked={privacyData.accountVisible}
                onCheckedChange={(checked) => setPrivacyData((prev) => ({ ...prev, accountVisible: checked }))}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-1">
                <Label className="text-sm font-medium">팔로워 목록 공개</Label>
                <p className="text-xs text-muted-foreground">다른 사용자가 내 팔로워 목록을 볼 수 있도록 허용합니다.</p>
              </div>
              <Switch
                checked={privacyData.followerVisible}
                onCheckedChange={(checked) => setPrivacyData((prev) => ({ ...prev, followerVisible: checked }))}
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "저장 중..." : "설정 저장"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
