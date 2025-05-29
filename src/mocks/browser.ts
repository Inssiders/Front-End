import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// MSW 워커 인스턴스 생성
const worker = setupWorker(...handlers);

export { worker };
