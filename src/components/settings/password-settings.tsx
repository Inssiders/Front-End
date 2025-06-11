"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authApi } from "@/utils/fetch/auth";
import { useState } from "react";
import toast from "react-hot-toast";

export function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("비밀번호는 최소 8자 이상이어야 합니다.");
      return;
    }

    setIsLoading(true);
    try {
      await authApi.changePassword(newPassword);
      toast.success("비밀번호가 성공적으로 변경되었습니다.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("비밀번호 변경에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>비밀번호 변경</CardTitle>
        <CardDescription>보안을 위해 정기적으로 비밀번호를 변경해주세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">현재 비밀번호</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">새 비밀번호</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "변경 중..." : "비밀번호 변경"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
