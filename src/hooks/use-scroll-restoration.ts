"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

interface ScrollPosition {
  x: number;
  y: number;
}

const scrollPositions = new Map<string, ScrollPosition>();

export function useScrollRestoration(key: string) {
  const router = useRouter();
  const restoreScrollRef = useRef<boolean>(false);

  // 현재 스크롤 위치 저장
  const saveScrollPosition = () => {
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    scrollPositions.set(key, { x: scrollX, y: scrollY });
  };

  // 스크롤 위치 복원
  const restoreScrollPosition = () => {
    const position = scrollPositions.get(key);
    if (position) {
      // 약간의 지연을 두어 DOM이 완전히 렌더링된 후 스크롤 복원
      setTimeout(() => {
        window.scrollTo(position.x, position.y);
      }, 100);
    }
  };

  // 페이지 떠날 때 스크롤 위치 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition();
    };

    const handleScroll = () => {
      if (!restoreScrollRef.current) {
        saveScrollPosition();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [key]);

  // 컴포넌트 마운트 시 스크롤 위치 복원
  useEffect(() => {
    restoreScrollRef.current = true;
    restoreScrollPosition();

    // 복원 후 일정 시간 후 다시 저장 가능하도록 설정
    const timer = setTimeout(() => {
      restoreScrollRef.current = false;
    }, 1000);

    return () => clearTimeout(timer);
  }, [key]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
  };
}

export function useScrollMaintenance() {
  const scrollPositionRef = useRef<ScrollPosition>({ x: 0, y: 0 });

  const saveCurrentScroll = () => {
    scrollPositionRef.current = {
      x: window.pageXOffset || document.documentElement.scrollLeft,
      y: window.pageYOffset || document.documentElement.scrollTop,
    };
  };

  const maintainScroll = () => {
    const position = scrollPositionRef.current;
    setTimeout(() => {
      window.scrollTo(position.x, position.y);
    }, 0);
  };

  return { saveCurrentScroll, maintainScroll };
}
