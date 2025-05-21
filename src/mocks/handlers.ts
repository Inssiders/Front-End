import { http, HttpResponse } from "msw";
import { db } from "./db";
import type { CreateCommentBody, CreatePostBody, ErrorResponse } from "./types";

// 캐시 관련 유틸리티
const CACHE_KEY_PREFIX = "msw-cache-";

const saveToCache = async (key: string, data: any) => {
  try {
    localStorage.setItem(
      `${CACHE_KEY_PREFIX}${key}`,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  } catch (error) {
    console.error("Cache save error:", error);
  }
};

const getFromCache = (key: string) => {
  try {
    const cached = localStorage.getItem(`${CACHE_KEY_PREFIX}${key}`);
    if (cached) {
      return JSON.parse(cached).data;
    }
  } catch (error) {
    console.error("Cache read error:", error);
  }
  return null;
};

// 네트워크 상태 확인
const isOnline = () => navigator.onLine;

// 더미 데이터 배열
const titles = [
  "Epic Gaming Moment",
  "When Monday Hits",
  "Programming Life",
  "Social Media Be Like",
  "Weekend Vibes",
  "Study Motivation",
  "Work From Home Reality",
  "Family Group Chat",
  "Dating App Experience",
  "Gym Progress",
];

const contents = [
  "This is too relatable!",
  "Can't stop laughing at this",
  "Story of my life",
  "Who else can relate?",
  "This made my day",
  "Sharing this with my friends",
  "100% accurate",
  "Why is this so true?",
  "Peak comedy right here",
  "I feel personally attacked",
];

const categories = [
  "funny",
  "cute",
  "gaming",
  "tech",
  "lifestyle",
  "food",
  "pets",
  "sports",
  "music",
  "movies",
];

const imageUrls = [
  "https://picsum.photos/300/300?random=1",
  "https://picsum.photos/300/300?random=2",
  "https://picsum.photos/300/300?random=3",
  "https://picsum.photos/300/300?random=4",
  "https://picsum.photos/300/300?random=5",
];

// 배열에서 랜덤 항목 선택
const getRandomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// 범위 내 랜덤 숫자 생성
const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 초기 더미 데이터 생성
const initializeSeedData = async () => {
  try {
    const existingPosts = await db.post.findMany({});

    if (existingPosts.length === 0) {
      const seedData = Array.from({ length: 100 }, (_, index) => ({
        id: index + 1,
        title: getRandomItem(titles),
        content: getRandomItem(contents),
        imageUrl: getRandomItem(imageUrls) + `&id=${index}`,
        category: getRandomItem(categories),
        likes: getRandomNumber(0, 1000),
        comments: [],
      }));

      for (const post of seedData) {
        try {
          await db.post.create(post);
        } catch (error) {
          console.error(
            `[MSW] Failed to create seed post with ID ${post.id}:`,
            error
          );
        }
      }
    }
  } catch (error) {
    console.error("[MSW] Error during seed data initialization:", error);
  }
};

if (typeof window !== "undefined") {
  initializeSeedData().catch((error) => {
    console.error("[MSW] Unhandled error during seed initialization:", error);
  });
}

export const handlers = [
  // 게시물 목록 조회 (검색/필터링 지원)
  http.get("/mock-api/posts", async ({ request }) => {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search") || "";
    const filter = url.searchParams.get("filter") || "";

    const cacheKey = `posts-${searchQuery}-${filter}`;

    if (!isOnline()) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return HttpResponse.json(cachedData);
      }
    }

    try {
      const posts = await db.post.findMany({
        where: searchQuery
          ? {
              title: { contains: searchQuery },
              ...(filter && { category: { equals: filter } }),
            }
          : filter
          ? { category: { equals: filter } }
          : undefined,
      });

      await saveToCache(cacheKey, posts);
      return HttpResponse.json(posts);
    } catch (error) {
      console.error("[MSW] Error handling request:", error);
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return HttpResponse.json(cachedData);
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // 단일 게시물 조회
  http.get("/mock-api/posts/:memeId", async ({ params }) => {
    const { memeId } = params;
    const cacheKey = `post-${memeId}`;

    if (!isOnline()) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return HttpResponse.json(cachedData, { status: 200 });
      }
    }

    try {
      const post = await db.post.findFirst({
        where: { id: { equals: Number(memeId) } },
      });

      if (!post) {
        return new HttpResponse(null, { status: 404 });
      }

      await saveToCache(cacheKey, post);
      return HttpResponse.json(post, { status: 200 });
    } catch (error) {
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        return HttpResponse.json(cachedData, { status: 200 });
      }
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // 게시물 생성
  http.post("/mock-api/posts", async ({ request }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 게시물을 생성할 수 없습니다" },
        { status: 503 }
      );
    }

    const postData = (await request.json()) as CreatePostBody;
    const post = db.post.create({
      ...postData,
      likes: 0,
      comments: [],
    });

    const cachedPosts = getFromCache("posts-") || [];
    await saveToCache("posts-", [post, ...cachedPosts]);

    return HttpResponse.json(post, { status: 201 });
  }),

  // 좋아요 토글
  http.post("/mock-api/posts/:memeId/like", async ({ params }) => {
    const { memeId } = params;
    const cacheKey = `post-${memeId}`;

    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 좋아요를 할 수 없습니다" },
        { status: 503 }
      );
    }

    const post = await db.post.findFirst({
      where: { id: { equals: Number(memeId) } },
    });

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedPost = await db.post.update({
      where: { id: { equals: Number(memeId) } },
      data: { likes: post.likes + 1 },
    });

    await saveToCache(cacheKey, updatedPost);
    return HttpResponse.json(updatedPost, { status: 200 });
  }),

  // 게시물 수정
  http.put("/mock-api/posts/:memeId", async ({ request, params }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 게시물을 수정할 수 없습니다" },
        { status: 503 }
      );
    }

    const { memeId } = params;
    const updateData = (await request.json()) as Partial<CreatePostBody>;

    const post = await db.post.update({
      where: { id: { equals: Number(memeId) } },
      data: updateData,
    });

    await saveToCache(`post-${memeId}`, post);
    return HttpResponse.json(post, { status: 200 });
  }),

  // 게시물 삭제 (댓글이 없는 경우에만)
  http.delete("/mock-api/posts/:memeId", async ({ params }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 게시물을 삭제할 수 없습니다" },
        { status: 503 }
      );
    }

    const { memeId } = params;
    const post = await db.post.findFirst({
      where: { id: { equals: Number(memeId) } },
    });

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    if (post.comments.length > 0) {
      return HttpResponse.json<ErrorResponse>(
        { message: "댓글이 있는 게시물은 삭제할 수 없습니다" },
        { status: 400 }
      );
    }

    await db.post.delete({
      where: { id: { equals: Number(memeId) } },
    });

    return new HttpResponse(null, { status: 204 });
  }),

  // 댓글 생성
  http.post("/mock-api/posts/:memeId/comments", async ({ request, params }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 댓글을 작성할 수 없습니다" },
        { status: 503 }
      );
    }

    const { memeId } = params;
    const commentData = (await request.json()) as CreateCommentBody;

    const comment = await db.comment.create({
      ...commentData,
      postId: Number(memeId),
      replies: [],
    });

    const postCacheKey = `post-${memeId}`;
    const cachedPost = getFromCache(postCacheKey);
    if (cachedPost) {
      cachedPost.comments = [...(cachedPost.comments || []), comment];
      await saveToCache(postCacheKey, cachedPost);
    }

    return HttpResponse.json(comment, { status: 201 });
  }),
];
