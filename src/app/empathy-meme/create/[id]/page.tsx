import { startServer } from "@/mocks/server";
import { PostDetail } from "@/components/posts/post-detail";

import dynamic from "next/dynamic";


const  PostEmpathyContainer= dynamic(() => import("@/components/posts/post-empathy-container"), {
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
interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {


  

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <PostEmpathyContainer  />
    </main>
  );
}
