"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfilePostsResponse } from "@/utils/type/profile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ProfileLikes from "./profile-likes";
import ProfilePosts from "./profile-posts";

interface ProfileDetailProps {
  profile: any;
  initialTab?: string;
  initialPostsData?: ProfilePostsResponse;
  initialLikesData?: ProfilePostsResponse;
}

export function ProfileDetail({
  profile,
  initialTab,
  initialPostsData,
  initialLikesData,
}: ProfileDetailProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 초기 탭 설정: 쿼리 파라미터 > initialTab > 기본값 'posts'
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") || initialTab || "posts";
  });

  // URL 업데이트 함수
  const updateURL = useCallback(
    (newTab: string) => {
      const params = new URLSearchParams(searchParams);
      if (newTab === "posts") {
        params.delete("tab"); // 기본 탭인 경우 쿼리 파라미터 제거
      } else {
        params.set("tab", newTab);
      }

      const newURL = `${pathname}${
        params.toString() ? `?${params.toString()}` : ""
      }`;
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
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-200 to-orange-100 h-48 w-full" />
        <CardContent className="mt-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32 border-4 border-white mb-4">
                <AvatarImage
                  src={profile.user_detail_profile_url || "/placeholder.svg"}
                  alt={profile.user_detail_username || profile.user_id}
                />
                <AvatarFallback>
                  {profile.user_detail_username?.[0] || profile.user_id?.[0]}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-bold mb-1">
                {profile.user_detail_username || profile.user_id}
              </CardTitle>
              <CardDescription className="mb-4">
                @{profile.user_detail_username || profile.user_id}
              </CardDescription>
              <div className="flex gap-2 mb-6">
                <Badge
                  variant="secondary"
                  className="flex flex-col items-center px-4 py-2"
                >
                  <span className="font-bold">
                    {profile.posts?.toLocaleString() ?? 0}
                  </span>
                  <span className="text-xs text-gray-500">게시물</span>
                </Badge>
              </div>
              <Card className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-base font-bold mb-2">
                    소개
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-700 mb-4">
                    {profile.user_detail_introduction || "소개가 없습니다."}
                  </p>
                  <p className="text-gray-500 text-sm">
                    가입일:{" "}
                    {profile.user_created_at
                      ? new Date(profile.user_created_at).toLocaleDateString(
                          "ko-KR"
                        )
                      : "-"}
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="md:w-2/3 mt-8 md:mt-0 md:pl-8">
              <Tabs
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="posts">게시물</TabsTrigger>
                  <TabsTrigger value="likes">좋아요</TabsTrigger>
                </TabsList>
                <Separator />
                <TabsContent value="posts" className="mt-6">
                  <ProfilePosts id={id} initialData={initialPostsData} />
                </TabsContent>
                <TabsContent value="likes" className="mt-6">
                  <ProfileLikes id={id} initialData={initialLikesData} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
