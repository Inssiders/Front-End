"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface MSWContextType {
  isReady: boolean;
  error: string | null;
}

const MSWContext = createContext<MSWContextType>({
  isReady: false,
  error: null,
});

export const useMSW = () => useContext(MSWContext);

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMSW = async () => {
      if (
        typeof window === "undefined" ||
        process.env.NEXT_PUBLIC_API_MOCKING !== "enabled"
      ) {
        console.log("[MSW Context] Skipping MSW initialization");
        setIsReady(true);
        return;
      }

      try {
        console.log("[MSW Context] Starting MSW initialization...");

        const { startWorker } = await import("../mocks/browser");

        const workerStarted = await startWorker();

        if (!workerStarted) {
          setError("MSW is not properly intercepting network requests");
          console.error(
            "[MSW Context] Worker started but interception test failed"
          );
        } else {
          console.log("[MSW Context] MSW initialized successfully");
          setError(null);
        }

        setIsReady(true);
      } catch (initError) {
        const errorMessage = `MSW initialization failed: ${
          (initError as Error).message
        }`;
        console.error("[MSW Context] Failed to initialize MSW:", initError);
        setError(errorMessage);
        setIsReady(true); // 에러가 있어도 앱은 계속 실행
      }
    };

    initMSW();
  }, []);

  // 에러가 있으면 콘솔에 경고 표시
  useEffect(() => {
    if (error) {
      console.error("[MSW Context] Error:", error);

      // 브라우저 알림 (개발 환경에서만)
      if (process.env.NODE_ENV === "development") {
        setTimeout(() => {
          console.warn(
            `%c[MSW ERROR] ${error}`,
            "color: red; font-weight: bold; font-size: 14px;"
          );
          console.warn(
            "%cTry: 1. Hard refresh (Ctrl+Shift+R) 2. Clear browser cache 3. Check Application → Service Workers tab",
            "color: orange; font-weight: bold;"
          );
        }, 1000);
      }
    }
  }, [error]);

  return (
    <MSWContext.Provider value={{ isReady, error }}>
      {children}
    </MSWContext.Provider>
  );
}
