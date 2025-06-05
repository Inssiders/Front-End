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
    <div className="posts-page min-h-screen bg-white relative">
      {/* Header Section - contains all background elements */}
      <PostsHeader />

      {/* Categories Section */}
      <PostCategories categories={categories.data.categories} />

      {/* Main Content Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Content Wrapper with Glassmorphism */}
          <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-2xl p-6 md:p-8 mb-8">
            {/* Grid Section */}
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-sm" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 blur-sm" />

              <PostsGrid
                category={category}
                columns={4}
                layout="grid"
                showAuthor={true}
                showActions={true}
                enableHoverPlay={true}
                className="relative z-10"
              />
            </div>
          </div>

          {/* Bottom Decorative Section */}
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md rounded-full border border-white/80 shadow-lg">
              <span className="text-2xl animate-bounce">🎉</span>
              <span className="text-gray-700 font-semibold text-lg">
                더 많은 밈이 곧 업데이트됩니다!
              </span>
              <span className="text-2xl animate-bounce delay-300">✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <button className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
