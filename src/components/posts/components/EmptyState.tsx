import { EmptyStateProps } from "@/utils/types/posts";

export default function EmptyState({ isLoading }: EmptyStateProps) {
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-purple-600"></div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="py-12 text-center">
      <div className="mb-4 text-gray-400">
        <svg className="mx-auto size-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">게시물이 없습니다</h3>
      <p className="text-gray-500 dark:text-gray-400">아직 게시물이 없습니다.</p>
    </div>
  );
}
