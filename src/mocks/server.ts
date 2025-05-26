import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// MSW 서버 인스턴스 생성
const server = setupServer(...handlers);

// 서버 시작
const startServer = () => {
  server.listen({
    onUnhandledRequest: "warn",
  });
  console.log("[MSW] Server started");
  console.log(
    "[MSW] Registered handlers:",
    handlers.map((h) => `${h.info.method} ${h.info.path}`)
  );
};

// 서버 종료
const stopServer = () => {
  server.close();
  console.log("[MSW] Server stopped");
};

// 핸들러 초기화
const resetHandlers = () => {
  server.resetHandlers();
  console.log("[MSW] Handlers reset");
};

export { resetHandlers, server, startServer, stopServer };
