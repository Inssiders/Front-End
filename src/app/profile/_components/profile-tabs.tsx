"use client";

import ProfileLikes from "@/app/profile/_components/profile-likes";
import ProfilePosts from "@/app/profile/_components/profile-posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ProfileTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function ProfileTabs({ value, onValueChange }: ProfileTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 초기 탭 설정: 쿼리 파라미터 > initialTab > 기본값 'posts'
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("tab") || value || "posts";
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

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="posts">게시물</TabsTrigger>
          <TabsTrigger value="likes">좋아요</TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="posts">
            <ProfilePosts userId="1" />
          </TabsContent>
          <TabsContent value="likes">
            <ProfileLikes userId="1" />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
