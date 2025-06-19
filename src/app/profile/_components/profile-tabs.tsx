"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Post } from "@/types/posts";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { QueryParams } from "./profile-detail";
import ProfileLikes from "./profile-likes";
import ProfilePosts from "./profile-posts";

interface ProfileTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  userId: string;
  initialPostsData?: Post[];
  initialLikesData?: Post[];
  queryParams?: QueryParams;
}

export function ProfileTabs({
  value,
  onValueChange,
  userId,
  initialPostsData,
  initialLikesData,
  queryParams,
}: ProfileTabsProps) {
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
      onValueChange(newTab);
    },
    [pathname, router, searchParams, onValueChange]
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

        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "posts" ? (
              <motion.div
                key="posts"
                className="absolute w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ProfilePosts
                  key="posts-content"
                  userId={userId}
                  initialData={initialPostsData}
                  queryParams={queryParams}
                />
              </motion.div>
            ) : (
              <motion.div
                key="likes"
                className="absolute w-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <ProfileLikes
                  key="likes-content"
                  userId={userId}
                  initialData={initialLikesData}
                  queryParams={queryParams}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </div>
  );
}
