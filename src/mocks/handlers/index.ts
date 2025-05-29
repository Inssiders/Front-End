import { handlers as authHandlers } from "./auth";
import { handlers as postsHandlers } from "./posts";

export const handlers = [...authHandlers, ...postsHandlers];
