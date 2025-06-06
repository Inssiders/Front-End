import EmpathyMemeContainer from "@/app/empathy-meme/_components/empathy-meme-container";
import { PAGE_SIZE } from "@/utils/constant";
import { getCategories, getPosts } from "@/utils/fetch/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공감밈 - 인싸이더",
  description: "유튜브 영상으로 공감할 수 있는 밈들을 공유하세요",
};

export default async function EmpathyMeme() {
  // SSR로 카테고리와 첫 페이지 posts 데이터 가져오기 (category 99: 기타)
  const [categories, initialPosts] = await Promise.all([
    getCategories(),
    getPosts({ category: "99", page: 1, size: PAGE_SIZE.POSTS }),
  ]);

  return (
    <main className="container mx-auto py-6">
      <EmpathyMemeContainer
        categories={categories.data.categories}
        category="99"
        initialPosts={initialPosts.posts}
        hasNextPage={initialPosts.hasNextPage}
        headerType="posts"
      />
    </main>
  );
}
