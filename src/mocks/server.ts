import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// 환경변수에서 baseUrl 가져오기
const baseUrl =
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL || "";

// MSW 서버 설정
const server = setupServer(...handlers);

let isServerStarted = false;

// 서버 시작
const startServer = async () => {
  // 이미 시작된 경우 중복 실행 방지
  if (isServerStarted) {
    return;
  }

  try {
    server.listen({
      onUnhandledRequest: (req) => {
        // baseUrl로 시작하는 요청만 처리하고 나머지는 무시
        if (baseUrl && req.url.toString().startsWith(baseUrl)) {
          console.warn(`[MSW] Unhandled: ${req.method} ${req.url}`);
        }
      },
    });
    isServerStarted = true;
    console.log("[MSW] Server started");
  } catch (error) {
    console.error("[MSW] Failed to start server:", error);
    throw error;
  }
};

// 서버 종료
const stopServer = () => {
  if (isServerStarted) {
    server.close();
    isServerStarted = false;
    console.log("[MSW] Server stopped");
  }
};

// 핸들러 초기화
const resetHandlers = () => {
  server.resetHandlers();
  console.log("[MSW] Handlers reset");
};

// instrumentation.ts에서 관리하므로 자동 시작 제거
// if (process.env.NODE_ENV === "development") {
//   startServer();
// }

export { resetHandlers, server, startServer, stopServer };
