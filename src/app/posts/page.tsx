import PostCategories from "@/components/posts/post-categories";
import PostsGrid from "@/components/posts/post-grid";
import PostsHeader from "@/components/posts/post-header";
import { getCategories } from "@/utils/fetch/posts";

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  // SSR로 카테고리 데이터 가져오기
  const categories = await getCategories();

  return (
    <div className="pb-10">
      <div className="container mx-auto px-4">
        <PostsHeader />
        <PostCategories categories={categories.data.categories} />
        <PostsGrid
          category={category}
          columns={4}
          layout="grid"
          showAuthor={true}
          showActions={true}
          enableHoverPlay={true}
          className="mt-8"
        />
      </div>
    </div>
  );
}
