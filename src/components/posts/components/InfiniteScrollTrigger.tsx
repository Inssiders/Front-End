import { InfiniteScrollTriggerProps } from "@/utils/types/posts";

export default function InfiniteScrollTrigger({ hasNextPage, isFetchingNextPage, target }: InfiniteScrollTriggerProps) {
  return (
    <div ref={target} className="py-8 mb-24">
      {/* 여기는 UI만 조건부 렌더링 */}
      {isFetchingNextPage ? (
        <div className="flex justify-center items-center space-x-2">
          <div className="size-5 animate-spin rounded-full border-2 border-gray-200 border-t-purple-600"></div>
          <span className="text-sm text-gray-500">로딩 중...</span>
        </div>
      ) : hasNextPage ? (
        <div className="h-24 flex items-center justify-center">
          <div className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full">계속 스크롤하여 더 보기</div>
        </div>
      ) : null}
    </div>
  );
}
