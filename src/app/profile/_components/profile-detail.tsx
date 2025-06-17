"use client";

import { ProfileData, ProfilePostsResponse } from "@/utils/types/profile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProfileHeader from "./profile-header";
import ProfileLikes from "./profile-likes";
import ProfilePosts from "./profile-posts";
import { ProfileTabs } from "./profile-tabs";

export interface QueryParams {
  categoryId?: number;
  keyword?: string;
  size: number;
}

export interface ProfileDetailProps {
  profile: ProfileData;
  initialTab?: string;
  initialPostsData?: ProfilePostsResponse;
  initialLikesData?: ProfilePostsResponse;
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

  // URL 업데이트 함수
  const updateURL = useCallback(
    (newTab: string) => {
      const params = new URLSearchParams(searchParams);
      if (newTab === "posts") {
        params.delete("tab"); // 기본 탭인 경우 쿼리 파라미터 제거
      } else {
        params.set("tab", newTab);
      }

      const newURL = `${pathname}${params.toString() ? `?${params.toString()}` : ""}`;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // 탭 변경 핸들러
  const handleTabChange = useCallback(
    (newTab: string) => {
      setActiveTab(newTab);
      updateURL(newTab);
    },
    [updateURL]
  );

  // 쿼리 파라미터 변경 감지 및 동기화
  useEffect(() => {
    const tabFromURL = searchParams.get("tab") || "posts";
    if (tabFromURL !== activeTab) {
      setActiveTab(tabFromURL);
    }
  }, [searchParams, activeTab]);

  if (!profile) {
    return <div className="p-8 text-center">프로필을 찾을 수 없습니다.</div>;
  }

  const id = profile.user_id;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <ProfileHeader profile={profile} />
      <ProfileTabs value={activeTab} onValueChange={handleTabChange} />

      <div className="mt-8">
        {activeTab === "posts" ? (
          <ProfilePosts userId={id} initialData={initialPostsData} queryParams={queryParams} />
        ) : (
          <ProfileLikes userId={id} initialData={initialLikesData} queryParams={queryParams} />
        )}
      </div>
    </div>
  );
}
