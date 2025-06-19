"use client";

import { Post } from "@/types/posts";
import { ProfileData } from "@/types/profile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProfileHeader from "./profile-header";
import { ProfileTabs } from "./profile-tabs";

export interface QueryParams {
  keyword?: string;
  size: number;
}

export interface ProfileDetailProps {
  profile: ProfileData;
  initialTab?: string;
  initialPostsData?: Post[];
  initialLikesData?: Post[];
  queryParams?: QueryParams;
}

export function ProfileDetail({
  profile,
  initialTab = "posts",
  initialPostsData,
  initialLikesData,
  queryParams = {
    size: 20,
  },
}: ProfileDetailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 초기 탭 설정: 쿼리 파라미터 > initialTab > 기본값 'posts'
  const [activeTab, setActiveTab] = useState(initialTab);

  if (!profile) {
    return <div className="p-8 text-center">프로필을 찾을 수 없습니다.</div>;
  }

  const id = profile.user_id;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <ProfileHeader profile={profile} />
      <ProfileTabs
        value={activeTab}
        onValueChange={setActiveTab}
        userId={id}
        initialPostsData={initialPostsData}
        initialLikesData={initialLikesData}
        queryParams={queryParams}
      />
    </div>
  );
}
