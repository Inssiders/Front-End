import EmpathyMemeContainer from "@/app/empathy-meme/_components/empathy-meme-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "공감밈 - 인싸이더",
  description: "유튜브 영상으로 공감할 수 있는 밈들을 공유하세요",
};

async function getMockData() {
  const res = await fetch(
    `${process.env.SERVER_URL || ""}/mock-data/all-mock-data.json`,
    { cache: "no-store" }
  );
  const allData = await res.json();

  // Transform data to match PostsGrid shape
  const posts = allData
    .filter((row: any) => row.post_media_url?.includes("youtube"))
    .slice(0, 9)
    .map((row: any) => ({
      id: row.post_id,
      title: row.post_title,
      category: row.category_name || "기타",
      post_media_url: row.post_media_url,
      type: "video",
      author: {
        name: row.user_detail_username || "Unknown",
        avatar: row.user_detail_profile_url || "/placeholder.svg",
      },
      likes: row.likes || 0,
      comments: row.comments || 0,
      shares: row.shares || 0,
      views: row.video_views || 0,
      isLiked: false,
      isBookmarked: false,
    }));

  return posts;
}

export default async function EmpathyMeme() {
  const initialPosts = await getMockData();

  return (
    <main className="container mx-auto py-6">
      <EmpathyMemeContainer initialPosts={initialPosts} />
    </main>
  );
}
