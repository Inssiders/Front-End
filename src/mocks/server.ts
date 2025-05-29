import { setupServer } from "msw/node";
import { handlers } from "./handlers";

const server = setupServer(...handlers);

// 서버 시작
const startServer = async () => {
  server.listen({
    onUnhandledRequest: "warn",
  });
  console.log("[MSW] Server started");

  // 핸들러 정보를 더 명확하게 출력
  const registeredHandlers = handlers.map((handler) => {
    const { method, path } = handler.info;
    return `${method} ${path}`;
  });

  console.log("[MSW] Registered handlers:", registeredHandlers);
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

if (process.env.NODE_ENV === "development") {
  startServer();
}

export { resetHandlers, server, startServer, stopServer };
