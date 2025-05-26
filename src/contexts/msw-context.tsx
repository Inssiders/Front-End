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
      if (process.env.NODE_ENV !== "development") {
        setIsMSWReady(true);
        return;
      }

      try {
        const { worker } = await import("../mocks/browser");
        await worker.start({
          onUnhandledRequest: "warn",
          serviceWorker: {
            url: "/mockServiceWorker.js",
            options: { scope: "/" },
          },
        });
        console.log("[MSW] Initialization complete");
        setIsMSWReady(true);
      } catch (error) {
        console.error("[MSW] Failed to initialize:", error);
        setIsMSWReady(true); // Set to true even on error to not block the app
      }
    }

    initMSW();
  }, []);

  return (
    <MSWContext.Provider value={{ isMSWReady }}>{children}</MSWContext.Provider>
  );
}

export function useMSW() {
  return useContext(MSWContext);
}
