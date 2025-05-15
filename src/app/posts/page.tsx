import PostCategories from "@/components/posts/post-categories";
import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import PostsLoading from "@/components/posts/post-loading";
import { Suspense } from "react";

export default function PostsPage() {
  return (
    <div className="pt-20 pb-16">
      <PostsHeader />
      <PostCategories />
      <Suspense fallback={<PostsLoading />}>
        <PostsGrid />
      </Suspense>
    </div>
  );
}
