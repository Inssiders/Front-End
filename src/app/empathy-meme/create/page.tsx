import PostContainer from "@/components/posts/post-container";
import { Category, CATEGORY_LABELS, CategoryOption } from "@/types/posts";
import { getCategories } from "@/utils/fetch/posts";

export default async function CreateMemePage() {
  const categoriesResponse = await getCategories();

  if (!categoriesResponse.data) {
    throw new Error("카테고리 데이터를 불러올 수 없습니다.");
  }

  const categories: CategoryOption[] = categoriesResponse.data.map((type) => ({
    value: Number(type) as Category,
    label: CATEGORY_LABELS[type as keyof typeof CATEGORY_LABELS],
  }));

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PostContainer categories={categories} />
    </main>
  );
}
