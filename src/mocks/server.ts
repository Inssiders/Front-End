import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// MSW 서버 인스턴스 생성
export const server = setupServer(...handlers);

// Log registered handlers
console.log(
  "[MSW] Available handlers:",
  handlers.map((h) => h.info.path)
);

export const startServer = () => {
  server.listen({ onUnhandledRequest: "bypass" });
  console.log("[MSW] Server started");
};

export const stopServer = () => {
  server.close();
  console.log("[MSW] Server stopped");
};

// 테스트용 핸들러 초기화
export const resetHandlers = () => server.resetHandlers();
