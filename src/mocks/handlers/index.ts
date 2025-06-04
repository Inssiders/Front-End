import { handlers as authHandlers } from "./auth";
import { handlers as postsHandlers } from "./posts";
import { handlers as detailHandlers } from "./detail";

export const handlers = [...authHandlers, ...postsHandlers, ...detailHandlers];
