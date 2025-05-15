import { PostDetail } from "@/components/posts/post-detail";

interface PostDetailPageProps {
  params: {
    id: string;
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <PostDetail id={id} />
    </main>
  );
}
