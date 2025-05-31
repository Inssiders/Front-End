import { startServer } from "@/mocks/server";
import { PostDetail } from "@/components/posts/post-detail";

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  // MSW 서버가 켜져 있지 않다면 켜기
  if (process.env.NODE_ENV === "development") {
    await startServer();
  }

  const { id } = params;

  const baseUrl = process.env.SERVER_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/posts/${id}/detail`, { cache: "no-store" });

  if (!res.ok) {
    return <div>Error: {res.statusText}</div>;
  }

  const post = await res.json();

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <PostDetail post={post} />
    </main>
  );
}
