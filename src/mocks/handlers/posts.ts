import { Post } from "@/utils/types/posts";
import { http, HttpResponse } from "msw";
import { seedPosts } from "../seed-data/posts";

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
    const totalPages = Math.ceil(seedPosts.length / Number(params.get("size") || 10));
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
const filterMemes = (searchParams: URLSearchParams, data: Post[]) => {
  let filteredData = [...data];

  const keyword = searchParams.get("keyword");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const profileFilter = searchParams.get("profile_filter");
  const userId = searchParams.get("user_id");

  if (keyword) {
    filteredData = filteredData.filter(
      (meme) =>
        meme.title.toLowerCase().includes(keyword.toLowerCase()) ||
        meme.content?.toLowerCase().includes(keyword.toLowerCase()) ||
        meme.media_url?.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  if (category) {
    filteredData = filteredData.filter((meme) => meme.category_id === Number(category));
  }

  if (sort === "created_at") {
    filteredData.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  if (userId) {
    filteredData = filteredData.filter((meme) => meme.account_id === Number(userId));
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
  // GET - 카테고리 목록 조회
  http.get(`${BASE_URL}/api/categories`, () => {
    const categories = [
      { id: 1, name: "KPOP", label: "K-POP", count: 45 },
      { id: 2, name: "ENTERTAINMENT", label: "연예인", count: 38 },
      { id: 3, name: "DRAMA", label: "드라마", count: 22 },
      { id: 4, name: "INFLUENCER", label: "인플루언서", count: 31 },
      { id: 5, name: "NEWS", label: "뉴스", count: 15 },
      { id: 6, name: "MOVIE", label: "영화", count: 27 },
      { id: 7, name: "ANIMATION", label: "애니메이션", count: 19 },
      { id: 8, name: "CHALLENGE", label: "챌린지", count: 42 },
      { id: 9, name: "NEW_SLANG", label: "신조어", count: 33 },
      { id: 10, name: "TRENDING", label: "트렌딩", count: 67 },
      { id: 99, name: "ETC", label: "기타", count: 8 },
      { id: 999, name: "USER_CONTENTS", label: "사용자 콘텐츠", count: 12 },
    ];

    return HttpResponse.json({
      message: "카테고리 조회에 성공했습니다",
      data: {
        categories: categories,
      },
    });
  }),

  // GET - 게시물 목록 조회
  http.get(`${BASE_URL}/api/posts`, ({ request }) => {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const page = Number(searchParams.get("page") || 1);
    const size = Number(searchParams.get("size") || 10);
    const profileFilter = searchParams.get("profile_filter");
    const cursor = searchParams.get("cursor");

    const filteredData = filterMemes(searchParams, seedPosts);

    if (profileFilter) {
      const startIndex = cursor
        ? filteredData.findIndex((item) => btoa(item.created_at) === cursor) + 1
        : 0;

      const items = filteredData.slice(startIndex, startIndex + size);
      const nextCursor =
        items.length === size ? btoa(items[items.length - 1].created_at) : undefined;

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
        _links: generateLinks("/api/posts", searchParams, undefined, nextCursor),
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
    const { id } = params;
    const post = seedPosts[Number(id) - 1];

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
