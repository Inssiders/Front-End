import { http, HttpResponse } from "msw";
import { db } from "./db";
import { seedPosts } from "./seed-data";
import type {
  CreateAccountBody,
  CreateCommentBody,
  CreatePostBody,
  CreateProfileBody,
  ErrorResponse,
} from "./types";

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

export const handlers = [
  // 계정 생성
  http.post("/mock-api/accounts", async ({ request }) => {
    const accountData = (await request.json()) as CreateAccountBody;
    const account = await db.account.create({
      ...accountData,
      password_salt: Math.random().toString(36).substring(7),
      is_deleted: false,
    });
    return HttpResponse.json(account, { status: 201 });
  }),

  // 프로필 생성/수정
  http.post("/mock-api/profiles", async ({ request }) => {
    const profileData = (await request.json()) as CreateProfileBody;
    const profile = await db.profile.create({
      ...profileData,
      is_deleted: false,
    });
    return HttpResponse.json(profile, { status: 201 });
  }),

  // 게시물 목록 조회 (검색/필터링 지원) + 무한스크롤
  http.get("/mock-api/posts", async ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "8");
    const category = url.searchParams.get("category") || "";
    const searchQuery = url.searchParams.get("search") || "";

    const allPosts = await db.post.findMany({
      where: {
        ...(category && { category: { equals: category.toLowerCase() } }),
        ...(searchQuery && { title: { contains: searchQuery } }),
        is_deleted: { equals: false },
      },
    });

    const start = page * pageSize;
    const paginated = allPosts.slice(start, start + pageSize);
    const items = paginated.map((post) => ({
      ...post,
      author: {
        name: `User${post.account_id}`, // 임시 이름
        avatar: "/placeholder.svg", // 임시 아바타
      },
      likes: 0,
      comments: 0,
      views: 0,
      youtubeUrl: post.media_url,
      description: post.content,
    }));
    return HttpResponse.json({
      items,
      total: allPosts.length,
      hasNextPage: start + pageSize < allPosts.length,
    });
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
    const post = await db.post.create({
      ...postData,
      is_deleted: false,
    });

    return HttpResponse.json(post, { status: 201 });
  }),

  // 게시물 수정
  http.put("/mock-api/posts/:postId", async ({ request, params }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 게시물을 수정할 수 없습니다" },
        { status: 503 }
      );
    }

    const { postId } = params;
    const updateData = (await request.json()) as Partial<CreatePostBody>;

    const post = await db.post.update({
      where: { id: { equals: Number(postId) } },
      data: updateData,
    });

    await saveToCache(`post-${postId}`, post);
    return HttpResponse.json(post, { status: 200 });
  }),

  // 게시물 삭제
  http.delete("/mock-api/posts/:postId", async ({ params }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 게시물을 삭제할 수 없습니다" },
        { status: 503 }
      );
    }

    const { postId } = params;
    const post = await db.post.findFirst({
      where: { id: { equals: Number(postId) } },
    });

    if (!post) {
      return new HttpResponse(null, { status: 404 });
    }

    // 댓글이 있는지 확인
    const comments = await db.comment.findMany({
      where: { post_id: { equals: Number(postId) } },
    });

    if (comments.length > 0) {
      return HttpResponse.json<ErrorResponse>(
        { message: "댓글이 있는 게시물은 삭제할 수 없습니다" },
        { status: 400 }
      );
    }

    // Soft delete
    await db.post.update({
      where: { id: { equals: Number(postId) } },
      data: {
        is_deleted: true,
        deleted_at: new Date().toISOString(),
      },
    });

    return new HttpResponse(null, { status: 204 });
  }),

  // 댓글 생성
  http.post("/mock-api/posts/:postId/comments", async ({ request, params }) => {
    if (!isOnline()) {
      return HttpResponse.json<ErrorResponse>(
        { message: "오프라인 상태에서는 댓글을 작성할 수 없습니다" },
        { status: 503 }
      );
    }

    const { postId } = params;
    const commentData = (await request.json()) as CreateCommentBody;

    const comment = await db.comment.create({
      ...commentData,
      post_id: Number(postId),
      is_deleted: false,
    });

    return HttpResponse.json(comment, { status: 201 });
  }),
];
