"use client";

import { useScrollRestoration } from "@/hooks/use-scroll-restoration";
import { useEffect } from "react";

interface ScrollRestorationWrapperProps {
  children: React.ReactNode;
  scrollKey: string;
}

export default function ScrollRestorationWrapper({
  children,
  scrollKey,
}: ScrollRestorationWrapperProps) {
  const { saveScrollPosition, restoreScrollPosition } = useScrollRestoration(scrollKey);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 위치 복원
    restoreScrollPosition();
  }, [restoreScrollPosition]);

  return <>{children}</>;
}
