import { startServer } from "@/mocks/server";
import { PostDetail } from "@/components/posts/post-detail";
import PostBasic from "@/components/posts/post-basic";

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
 


  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
     <PostBasic/>
    </main>
  );
}
