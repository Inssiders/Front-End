import { Suspense } from "react"
import { notFound } from "next/navigation"
import PostDetail from "@/components/posts/post-detail"
import PostDetailLoading from "@/components/posts/post-detail-loading"
import CommentSection from "@/components/posts/comment-section"
import RelatedPosts from "@/components/posts/related-posts"

export const generateMetadata = async ({ params }: { params: { id: string } }) => {
  // In a real app, fetch the post data here
  // For now, we'll use a placeholder
  return {
    title: `인싸이더 - 게시글 #${params.id}`,
    description: `인싸이더 게시글 #${params.id}의 상세 내용을 확인하세요.`,
  }
}

export default function PostPage({ params }: { params: { id: string } }) {
  // In a real app, check if the post exists
  // For now, we'll just check if the ID is a number
  if (isNaN(Number(params.id))) {
    notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<PostDetailLoading />}>
        <PostDetail id={params.id} />
      </Suspense>
      <CommentSection postId={params.id} />
      <RelatedPosts postId={params.id} />
    </main>
  )
}
