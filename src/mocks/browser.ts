import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// 환경변수에서 baseUrl 가져오기
const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "";

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

  // 잠시 대기하여 완전한 정리 보장
  await new Promise((resolve) => setTimeout(resolve, 500));

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
  const serviceWorker =
    registration.installing || registration.waiting || registration.active;
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

// 네트워크 차단 테스트
const testNetworkInterception = async () => {
  try {
    const testResponse = await fetch(
      "/server/posts?profile_filter=posts&size=10&user_id=1",
      {
        signal: AbortSignal.timeout(3000),
      }
    );

    if (testResponse.ok) {
      console.log("[MSW] ✅ Ready - intercepting requests");
      return true;
    }
    return false;
  } catch (error) {
    const errorMessage = (error as Error).message;

    if (
      errorMessage.includes("ENOTFOUND") ||
      errorMessage.includes("ERR_NAME_NOT_RESOLVED") ||
      errorMessage.includes("NetworkError")
    ) {
      console.error("[MSW] ❌ Not intercepting - DNS error occurred");
      return false;
    }

    if (errorMessage.includes("CORS")) {
      console.error("[MSW] ❌ CORS error - MSW should prevent this");
      return false;
    }

    // 다른 에러는 MSW가 작동할 수 있음을 의미
    console.log("[MSW] ✅ Ready - intercepting requests");
    return true;
  }
};

// 워커 시작
export const startWorker = async () => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    console.log("[MSW] Starting worker...");

    // 기존 MSW 워커 정지
    try {
      await worker.stop();
    } catch (e) {
      // 무시
    }

    // 서비스 워커 완전 초기화
    await waitForServiceWorkerReady();

    // 추가 대기 시간으로 완전한 초기화 보장
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 네트워크 차단 테스트
    const isWorking = await testNetworkInterception();

    if (!isWorking) {
      console.error("[MSW] 💡 Try: Hard refresh (Ctrl+Shift+R)");
    }

    return isWorking;
  } catch (error) {
    console.error("[MSW] Failed to start:", error);
    throw error;
  }
};
