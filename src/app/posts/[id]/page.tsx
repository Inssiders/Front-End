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
  const resolvedParams = await params;

  const { id } = resolvedParams;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const url = `${baseUrl}/server/posts/${id}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    
    if (!response.ok) {
      if (response.status === 404) {
        try {
          const error = await response.json();
          return <div>{error.detail || "해당 콘텐츠는 존재하지 않습니다."}</div>;
        } catch {
          return <div>해당 콘텐츠는 존재하지 않습니다.</div>;
        }
      }
      return <div>Error: {response.statusText}</div>;
    }
    const json = await response.json();
  
    const post = json.post;
    if (!post) {
      return <div>해당 콘텐츠는 존재하지 않습니다.</div>;
    }
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
  } catch (error) {
    return <div>상세 페이지를 불러오는데 실패했습니다.</div>;
  }
}
