"use client";

import { useEffect } from "react";

export function usePageCache() {
  useEffect(() => {
    // 페이지가 bfcache에서 복원될 때 이벤트 리스너
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        // bfcache에서 복원된 경우
        console.log("Page restored from bfcache");

        // 스크롤 위치 즉시 복원 시도
        const savedScrollY = sessionStorage.getItem("scrollY");
        if (savedScrollY) {
          window.scrollTo(0, parseInt(savedScrollY, 10));
        }
      }
    };

    // 페이지가 캐시될 때 스크롤 위치 저장
    const handlePageHide = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        // 페이지가 완전히 언로드되는 경우
        sessionStorage.setItem("scrollY", window.pageYOffset.toString());
      }
    };

    // 일반적인 스크롤 위치 저장
    const handleScroll = () => {
      sessionStorage.setItem("scrollY", window.pageYOffset.toString());
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 페이지 로드 시 스크롤 위치 복원
    const savedScrollY = sessionStorage.getItem("scrollY");
    if (savedScrollY) {
      // DOM이 완전히 로드된 후 스크롤 복원
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScrollY, 10));
      }, 100);
    }

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

export function useBfCacheOptimization() {
  useEffect(() => {
    // bfcache 최적화를 위한 설정

    // 1. unload 이벤트 리스너 최소화 (bfcache 방해 요소)
    // 2. beforeunload 이벤트 리스너 피하기
    // 3. 페이지 언로드 시 필요한 작업만 수행

    const handleBeforeUnload = () => {
      // 스크롤 위치만 저장하고 다른 무거운 작업은 피함
      sessionStorage.setItem("scrollY", window.pageYOffset.toString());
    };

    // beforeunload 대신 pagehide 사용 (bfcache 친화적)
    window.addEventListener("pagehide", handleBeforeUnload);

    return () => {
      window.removeEventListener("pagehide", handleBeforeUnload);
    };
  }, []);
}
