import { setupWorker } from "msw/browser";
import { handlers } from "./handlers/auth";

// MSW 워커 인스턴스 생성
export const worker = setupWorker(...handlers);

// 워커 설정 후 시작
const initMocks = async () => {
  // 개발 환경에서만 MSW 활성화
  if (process.env.NODE_ENV === "development") {
    await worker
      .start({
        onUnhandledRequest: "bypass", // 처리되지 않은 요청에 대해 경고
        serviceWorker: {
          url: "/mockServiceWorker.js",
        },
      })
      .catch((error) => {
        console.error("[MSW] Failed to initialize:", error);
      });

    // 디버깅을 위한 로그
    console.log("[MSW] Handlers registered:", handlers);
    console.log("[MSW] Mocking enabled");
  }
};

// MSW 초기화
if (typeof window !== "undefined") {
  initMocks();
}
