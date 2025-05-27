import { db } from "./db";
import { handlers as mockHandlers } from "./handlers/index";
import { seedPosts } from "./seed-data";

// 초기 더미 데이터 생성
const initializeSeedData = async () => {
  try {
    const existingPosts = await db.post.findMany({});

    if (existingPosts.length === 0) {
      // seed-data.ts에서 가져온 데이터를 사용
      for (const post of seedPosts) {
        const { deleted_at, ...postData } = post;
        await db.post.create(postData);
      }
    }
  } catch (error) {
    console.error("Failed to initialize seed data:", error);
  }
};

if (typeof window !== "undefined") {
  initializeSeedData().catch((error) => {
    console.error("[MSW] Unhandled error during seed initialization:", error);
  });
}

// 모든 핸들러를 하나로 합칩니다
export const handlers = [...mockHandlers];
