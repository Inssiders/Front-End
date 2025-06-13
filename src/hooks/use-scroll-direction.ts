"use client";

import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10; // 스크롤 감도 조정

      // 페이지 최상단에 있으면 항상 표시
      if (currentScrollY <= scrollThreshold) {
        setIsVisible(true);
      } else {
        // 스크롤 방향에 따라 헤더 표시/숨김
        const isScrollingUp = currentScrollY < lastScrollY - scrollThreshold;
        const isScrollingDown = currentScrollY > lastScrollY + scrollThreshold;

        if (isScrollingUp) {
          setIsVisible(true);
        } else if (isScrollingDown) {
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    // 디바운스를 위한 throttle 적용
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [lastScrollY]);

  return isVisible;
}
