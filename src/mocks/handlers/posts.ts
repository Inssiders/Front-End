import { http, HttpResponse } from "msw";
import { memesData } from "../seed-data/memes";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;

// Helper function to generate pagination links
const generateLinks = (
  baseUrl: string,
  params: URLSearchParams,
  page?: number,
  cursor?: string
) => {
  const links: Record<string, { href: string }> = {
    self: {
      href: `${baseUrl}?${params.toString()}`,
    },
  };

  if (page !== undefined) {
    const totalPages = Math.ceil(
      memesData.length / Number(params.get("size") || 10)
    );
    if (page > 1) {
      const prevParams = new URLSearchParams(params);
      prevParams.set("page", String(page - 1));
      links.prev = {
        href: `${baseUrl}?${prevParams.toString()}`,
      };
    }
    if (page < totalPages) {
      const nextParams = new URLSearchParams(params);
      nextParams.set("page", String(page + 1));
      links.next = {
        href: `${baseUrl}?${nextParams.toString()}`,
      };
    }
  } else if (cursor !== undefined) {
    const nextParams = new URLSearchParams(params);
    nextParams.set("cursor", cursor);
    links.next = {
      href: `${baseUrl}?${nextParams.toString()}`,
    };
  }

  return links;
};

// Helper function to filter memes based on search criteria
const filterMemes = (searchParams: URLSearchParams, data = memesData) => {
  let filteredData = [...data];

  const keyword = searchParams.get("keyword");
  const categoryId = searchParams.get("category_id");
  const sort = searchParams.get("sort");
  const profileFilter = searchParams.get("profile_filter");
  const userId = searchParams.get("user_id");

  if (keyword) {
    filteredData = filteredData.filter(
      (meme) =>
        meme.title.toLowerCase().includes(keyword.toLowerCase()) ||
        meme.content.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (categoryId) {
    filteredData = filteredData.filter(
      (meme) => meme.category_id === Number(categoryId)
    );
  }

  if (sort === "created_at") {
    filteredData.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  if (userId) {
    filteredData = filteredData.filter(
      (meme) => meme.user_id === Number(userId)
    );
  }

  if (profileFilter === "posts") {
    return filteredData;
  } else if (profileFilter === "likes") {
    // Simulate liked posts - in real app this would check against a likes table
    filteredData = filteredData.filter((_, index) => index % 3 === 0);
  }

  return filteredData;
};

export const handlers = [
  // GET - 게시물 목록 조회
  http.get(`${BASE_URL}/api/posts`, ({ request }) => {
    console.log("[MSW] Intercepted GET request to (BASE_URL):", request.url);

    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const page = Number(searchParams.get("page") || 1);
    const size = Number(searchParams.get("size") || 10);
    const profileFilter = searchParams.get("profile_filter");
    const cursor = searchParams.get("cursor");

    const filteredData = filterMemes(searchParams);

    if (profileFilter) {
      const startIndex = cursor
        ? filteredData.findIndex((item) => btoa(item.created_at) === cursor) + 1
        : 0;

      const items = filteredData.slice(startIndex, startIndex + size);
      const nextCursor =
        items.length === size
          ? btoa(items[items.length - 1].created_at)
          : undefined;

      return HttpResponse.json({
        message: "콘텐츠 조회에 성공했습니다",
        data: {
          memes: items,
          pageInfo: {
            limit: size,
            next: !!nextCursor,
            nextCursor: nextCursor,
          },
        },
        _links: generateLinks(
          "/api/posts",
          searchParams,
          undefined,
          nextCursor
        ),
      });
    }

    const startIndex = (page - 1) * size;
    const items = filteredData.slice(startIndex, startIndex + size);

    return HttpResponse.json({
      message: "콘텐츠 조회에 성공했습니다",
      data: {
        memes: items,
        pageInfo: {
          page,
          limit: size,
          totalElements: filteredData.length,
          totalPages: Math.ceil(filteredData.length / size),
        },
      },
      _links: generateLinks(`${BASE_URL}/api/posts`, searchParams, page),
    });
  }),

  // POST - 새 게시물 작성
  http.post(`${BASE_URL}/api/posts`, async ({ request }) => {
    console.log("[MSW] Intercepted POST request to (BASE_URL):", request.url);

    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.includes("Bearer")) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/unauthorized",
          title: "인증 실패",
          status: 401,
          detail: "인증이 필요합니다.",
          instance: "/api/posts",
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      message: "게시물이 작성되었습니다.",
      data: {
        id: Math.floor(Math.random() * 1000) + 1,
        created_at: new Date().toISOString(),
      },
    });
  }),

  // GET - 단일 게시물 조회
  http.get(`${BASE_URL}/api/posts/:id`, ({ params, request }) => {
    console.log("[MSW] Intercepted GET request to (BASE_URL):", request.url);

    const { id } = params;
    const post = memesData[Number(id) - 1];

    if (!post) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/not-found",
          title: "게시물을 찾을 수 없음",
          status: 404,
          detail: "해당 게시물이 존재하지 않습니다.",
          instance: `/api/posts/${id}`,
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      message: "게시물 조회에 성공했습니다.",
      data: { ...post, id: Number(id) },
    });
  }),

  // DELETE - 게시물 삭제
  http.delete(`${BASE_URL}/api/posts/:id`, ({ params, request }) => {
    console.log("[MSW] Intercepted DELETE request to (BASE_URL):", request.url);

    const { id } = params;
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.includes("Bearer")) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/unauthorized",
          title: "인증 실패",
          status: 401,
          detail: "인증이 필요합니다.",
          instance: `/api/posts/${id}`,
        },
        { status: 401 }
      );
    }

    return HttpResponse.json({
      message: "게시물이 삭제되었습니다.",
    });
  }),
];
