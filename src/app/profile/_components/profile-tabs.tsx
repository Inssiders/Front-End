"use client";

import ProfileLikes from "@/app/profile/_components/profile-likes";
import ProfilePosts from "@/app/profile/_components/profile-posts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Grid3X3, Heart } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ProfileTabsProps {
  userId?: string;
  initialTab?: string;
}

export function ProfileTabs({ userId = "1", initialTab }: ProfileTabsProps) {
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

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs
        defaultValue="posts"
        value={activeTab}
        onValueChange={handleTabChange}
      >
        <TabsList className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-full max-w-3xl mx-auto mb-8">
          <TabsTrigger
            value="posts"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            게시물
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 flex-1"
          >
            <Heart className="h-4 w-4 mr-2" />
            좋아요
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TabsContent value="posts">
            <ProfilePosts id={userId} />
          </TabsContent>
          <TabsContent value="likes">
            <ProfileLikes id={userId} />
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
