import { RefObject } from "react";

interface InfiniteScrollTriggerProps {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  target: RefObject<HTMLDivElement>;
}

export default function InfiniteScrollTrigger({ hasNextPage, isFetchingNextPage, target }: InfiniteScrollTriggerProps) {
  // 자연스러운 무한스크롤: 로딩 중이거나 다음 페이지가 있을 때만 표시
  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <div ref={target} className="flex w-full items-center justify-center py-4">
      {isFetchingNextPage && (
        <div className="size-5 animate-spin rounded-full border-2 border-gray-200 border-t-purple-600" />
      )}
    </div>
  );
}
