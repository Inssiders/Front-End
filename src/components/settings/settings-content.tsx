"use client";

import { UserType } from "@/utils/types/user";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import로 설정 컴포넌트들을 로드
const ProfileSettings = dynamic(() => import("./profile-settings"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg" />,
});

const PasswordSettings = dynamic(() => import("./password-settings"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg" />,
});

const PrivacySettings = dynamic(() => import("./privacy-settings"), {
  loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg" />,
});

interface SettingsContentProps {
  user: UserType;
}

export default function SettingsContent({ user }: SettingsContentProps) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto px-4">
      <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded-lg" />}>
        <ProfileSettings user={user} />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded-lg" />}>
        <PasswordSettings />
      </Suspense>

      <Suspense fallback={<div className="h-64 bg-gray-50 animate-pulse rounded-lg" />}>
        <PrivacySettings user={user} />
      </Suspense>
    </div>
  );
}
