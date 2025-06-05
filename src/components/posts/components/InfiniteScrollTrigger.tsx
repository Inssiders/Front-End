import { InfiniteScrollTriggerProps } from "@/utils/types/posts";

export default function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  target,
}: InfiniteScrollTriggerProps) {
  if (!hasNextPage) return null;

  return (
    <div ref={target} className="py-8 text-center">
      {isFetchingNextPage ? (
        <div className="flex flex-col items-center">
          <div className="size-6 animate-spin rounded-full border-b-2 border-purple-600"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            더 많은 게시물을 불러오는 중...
          </p>
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">스크롤하여 더 보기</p>
      )}
    </div>
  );
}
