import { startServer } from "@/mocks/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import로 PostDetail 컴포넌트를 로드
const PostDetail = dynamic(
  () => import("@/components/posts/post-detail").then((mod) => ({ default: mod.PostDetail })),
  {
    loading: () => (
      <div className="flex min-h-screen flex-col bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="h-8 bg-gray-200 animate-pulse rounded" />
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-20 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>
    ),
  }
);

interface PostDetailPageProps {
  params: { id: string };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  // MSW 서버가 켜져 있지 않다면 켜기
  if (process.env.NODE_ENV === "development") {
    await startServer();
  }

  const { id } = await params;

  const baseUrl = process.env.SERVER_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/posts/${id}/detail`, { cache: "no-store" });

  if (!res.ok) {
    return <div>Error: {res.statusText}</div>;
  }

  const post = await res.json();

  return (
    <main className="flex min-h-screen flex-col bg-gray-50">
      <Suspense
        fallback={
          <div className="flex min-h-screen flex-col bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="h-8 bg-gray-200 animate-pulse rounded" />
              <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-20 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        }
      >
        <PostDetail post={post} />
      </Suspense>
    </main>
  );
}
