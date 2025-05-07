import { Suspense } from "react"
import PostsHeader from "@/components/posts/posts-header"
import PostsFilters from "@/components/posts/posts-filters"
import PostsGrid from "@/components/posts/posts-grid"
import PostsLoading from "@/components/posts/posts-loading"

export const metadata = {
  title: "인싸이더 - 게시글",
  description: "인싸이더에서 인기 있는 게시글을 확인하세요.",
}

export default function PostsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <PostsHeader />
      <PostsFilters />
      <Suspense fallback={<PostsLoading />}>
        <PostsGrid />
      </Suspense>
    </main>
  )
}
