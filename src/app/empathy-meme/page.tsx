import { PAGE_SIZE } from "@/utils/constant";
import { getCategories, getPosts } from "@/utils/fetch/posts";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import
const EmpathyMemeContainer = dynamic(() => import("./_components/empathy-meme-container"), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <div className="h-20 bg-white/50 animate-pulse rounded-lg mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-64 bg-white/50 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "공감밈 - 인싸이더",
  description: "유튜브 영상으로 공감할 수 있는 밈들을 공유하세요",
};

export default async function EmpathyMemePage() {
  const [categoriesResponse, postsResponse] = await Promise.all([
    getCategories(),
    getPosts({ category: "99", page: 1, size: PAGE_SIZE.POSTS }),
  ]);

  const categories = categoriesResponse.data?.categories || [];
  const posts = postsResponse.posts || [];
  const hasNextPage = postsResponse.hasNextPage || false;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmpathyMemeContainer categories={categories} category="99" initialPosts={posts} hasNextPage={hasNextPage} />
    </Suspense>
  );
}
