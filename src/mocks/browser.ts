import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// MSW 워커 인스턴스 생성
export const worker = setupWorker(...handlers);

// 워커 설정 후 시작
export const startWorker = async () => {
  try {
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
        options: {
          scope: "/",
        },
      },
    });

    console.log("[MSW] Mock Service Worker started");
  } catch (error) {
    console.error("[MSW] Failed to start:", error);
  }
};
