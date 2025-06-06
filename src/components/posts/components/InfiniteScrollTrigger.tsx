import { InfiniteScrollTriggerProps } from "@/utils/types/posts";

export default function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  target,
}: InfiniteScrollTriggerProps) {
  // 자연스러운 무한스크롤: 로딩 중이거나 다음 페이지가 있을 때만 표시
  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <div ref={target} className="py-8 mb-24">
      {" "}
      {/* Footer 높이(90px) + 여유공간 고려 */}
      {isFetchingNextPage ? (
        // 로딩 중일 때: 명확한 로딩 표시
        <div className="flex justify-center items-center space-x-2">
          <div className="size-5 animate-spin rounded-full border-2 border-gray-200 border-t-purple-600"></div>
          <span className="text-sm text-gray-500">로딩 중...</span>
        </div>
      ) : hasNextPage ? (
        // 대기 중일 때: 스크롤을 유도하는 트리거 영역
        <div className="h-24 flex items-center justify-center">
          {" "}
          {/* 높이 줄여서 더 자연스럽게 */}
          <div className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
            계속 스크롤하여 더 보기
          </div>
        </div>
      ) : null}
    </div>
  );
}
