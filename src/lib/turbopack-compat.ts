/**
 * Turbopack 호환성 유틸리티
 * MSW와 다른 개발 도구들의 Turbopack 호환성을 보장합니다.
 */

// Turbopack 환경 감지
export const isTurbopack = process.env.TURBOPACK === "1" || process.env.NODE_ENV === "development";

// MSW 로딩 지연 (Turbopack의 빠른 HMR과 호환)
export const getMSWSetupDelay = () => {
  return isTurbopack ? 500 : 100;
};

// 개발 도구 설정
export const getDevToolsConfig = () => ({
  enableReactDevTools: true,
  enableReduxDevTools: true,
  hotReload: true,
  // Turbopack에서는 더 빠른 새로고침 허용
  fastRefresh: isTurbopack,
});

// 번들러 정보
export const getBundlerInfo = () => ({
  bundler: isTurbopack ? "turbopack" : "webpack",
  version: process.env.NEXT_VERSION || "unknown",
  mode: process.env.NODE_ENV || "development",
});

// 디버그 정보 출력
export const logBundlerInfo = () => {
  if (process.env.NODE_ENV === "development") {
    const info = getBundlerInfo();
    console.log(`🚀 Using ${info.bundler} in ${info.mode} mode`);
  }
};
