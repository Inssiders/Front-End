"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MSWContextType {
  isMSWReady: boolean;
}

const MSWContext = createContext<MSWContextType>({ isMSWReady: false });

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isMSWReady, setIsMSWReady] = useState(false);

  useEffect(() => {
    async function initMSW() {
      // 프로덕션 환경에서는 MSW를 비활성화
      if (process.env.NODE_ENV === "production") {
        setIsMSWReady(true);
        return;
      }

      try {
        // MSW 브라우저 워커 초기화
        const { worker } = await import("../mocks/browser");

        // 워커가 이미 시작되었는지 확인
        if (!worker) {
          throw new Error("MSW worker is not initialized");
        }

        // 워커 시작
        await worker.start({
          onUnhandledRequest: "bypass", // 처리되지 않은 요청은 무시
          serviceWorker: {
            url: "/mockServiceWorker.js",
            options: {
              scope: "/",
            },
          },
        });

        console.log("[MSW] 초기화가 완료되었습니다");
        setIsMSWReady(true);
      } catch (error) {
        console.error("[MSW] 초기화 실패:", error);
        // 에러가 발생해도 앱이 동작할 수 있도록 합니다
        setIsMSWReady(true);
      }
    }

    initMSW();

    // 컴포넌트 언마운트 시 클린업
    return () => {
      if (process.env.NODE_ENV === "development") {
        import("../mocks/browser").then(({ worker }) => {
          worker?.stop();
        });
      }
    };
  }, []);

  if (!isMSWReady) {
    return null; // MSW가 준비되지 않았을 때는 아무것도 렌더링하지 않습니다
  }

  return (
    <MSWContext.Provider value={{ isMSWReady }}>{children}</MSWContext.Provider>
  );
}

export function useMSW() {
  return useContext(MSWContext);
}
