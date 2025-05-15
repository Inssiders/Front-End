"use client";

import { useState, useEffect } from "react";

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 체크
    checkIfMobile();

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener("resize", checkIfMobile);

    // 클린업 함수
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return isMobile;
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatches = () => setMatches(media.matches);

    // 초기 값 설정
    updateMatches();

    // 변경 이벤트 리스너 추가
    media.addEventListener("change", updateMatches);

    // 클린업 함수
    return () => {
      media.removeEventListener("change", updateMatches);
    };
  }, [query]);

  return matches;
}
