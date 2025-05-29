import { setupServer } from "msw/node";
import { handlers } from "./handlers";

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
        console.warn(`[MSW] Unhandled: ${req.method} ${req.url}`);
      },
    });
    isServerStarted = true;
    console.log("[MSW] Server started");

    // 등록된 핸들러 리스트 출력
    const registeredHandlers = handlers.map((handler) => {
      const { method, path } = handler.info;
      return `${method} ${path}`;
    });
    console.log("[MSW] Registered handlers:", registeredHandlers);
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
