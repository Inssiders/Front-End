import { setupWorker } from "msw/browser";
import { getMSWSetupDelay, logBundlerInfo } from "../lib/turbopack-compat";
import { handlers } from "./handlers";

// 환경변수에서 baseUrl 가져오기
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "";

// MSW 워커 인스턴스 생성
export const worker = setupWorker(...handlers);

// 모든 서비스 워커 완전 제거 (MSW 제외)
const clearExistingServiceWorkers = async () => {
  if ("serviceWorker" in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();

    for (const registration of registrations) {
      // MSW 서비스 워커가 아닌 것만 제거
      if (!registration.scope.includes("mockServiceWorker")) {
        await registration.unregister();
      }
    }

    // 기존 MSW 서비스 워커도 제거하고 새로 시작
    for (const registration of registrations) {
      if (
        registration.scope.includes("mockServiceWorker") ||
        registration.active?.scriptURL?.includes("mockServiceWorker")
      ) {
        await registration.unregister();
      }
    }
  }
};

// 서비스 워커가 완전히 활성화될 때까지 대기
const waitForServiceWorkerReady = async () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("Service Worker not supported");
  }

  // 기존 모든 서비스 워커 제거
  await clearExistingServiceWorkers();

  // Turbopack 호환성을 위한 지연시간 적용
  const delay = getMSWSetupDelay();
  await new Promise((resolve) => setTimeout(resolve, delay));

  // MSW 워커 시작
  await worker.start({
    onUnhandledRequest(request, print) {
      // 로컬호스트 요청은 무시, 외부 도메인 요청만 로그
      const url = new URL(request.url);
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return;
      }
      // 간략한 경고만 출력
      console.warn(`[MSW] Unhandled: ${request.method} ${request.url}`);
    },
    serviceWorker: {
      url: "/mockServiceWorker.js",
      options: {
        scope: "/",
      },
    },
  });

  // 서비스 워커 등록 대기
  let registration = await navigator.serviceWorker.getRegistration("/");
  let attempts = 0;
  const maxAttempts = 10;

  while (!registration && attempts < maxAttempts) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    registration = await navigator.serviceWorker.getRegistration("/");
    attempts++;
  }

  if (!registration) {
    throw new Error("Service worker registration failed");
  }

  // 서비스 워커 활성화 대기
  const serviceWorker = registration.installing || registration.waiting || registration.active;
  if (serviceWorker && serviceWorker.state !== "activated") {
    await new Promise<void>((resolve) => {
      serviceWorker.addEventListener("statechange", () => {
        if (serviceWorker.state === "activated") {
          resolve();
        }
      });
    });
  }

  return registration;
};

// 워커 시작
export const startWorker = async () => {
  if (typeof window === "undefined") {
    return;
  }

  // 번들러 정보 로그
  logBundlerInfo();

  try {
    // 기존 MSW 워커 정지
    try {
      await worker.stop();
    } catch (e) {
      // 무시
    }

    // 서비스 워커 완전 초기화
    await waitForServiceWorkerReady();

    // Turbopack 호환성을 위한 추가 대기시간
    const finalDelay = getMSWSetupDelay() * 2;
    await new Promise((resolve) => setTimeout(resolve, finalDelay));

    console.log("✅ MSW initialized with Turbopack compatibility");
    return true;
  } catch (error) {
    console.error("[MSW] Failed to start:", error);
    throw error;
  }
};
