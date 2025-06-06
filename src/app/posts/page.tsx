import PostsPageClient from "@/components/posts/posts-page-client";
import { PAGE_SIZE } from "@/utils/constant";
import { getCategories, getPosts } from "@/utils/fetch/posts";

interface PostsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category;

  // SSR로 카테고리와 첫 페이지 posts 데이터 가져오기
  const [categories, initialPosts] = await Promise.all([
    getCategories(),
    getPosts({ category, page: 1, size: PAGE_SIZE.POSTS }),
  ]);

  return (
    <PostsPageClient
      categories={categories.data.categories}
      category={category}
      initialPosts={initialPosts.posts}
      hasNextPage={initialPosts.hasNextPage}
    />
  );
}
