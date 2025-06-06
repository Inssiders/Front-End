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

  // 일반 조회 (offset 기반 페이지네이션)
  if (page !== undefined) {
    const totalPages = Math.ceil(seedPosts.length / Number(params.get("size") || 10));

    // 이전 페이지 링크
    if (page > 1) {
      const prevParams = new URLSearchParams(params);
      prevParams.set("page", String(page - 1));
      links.prev = {
        href: `${baseUrl}?${prevParams.toString()}`,
      };
    }

    // 다음 페이지 링크
    if (page < totalPages) {
      const nextParams = new URLSearchParams(params);
      nextParams.set("page", String(page + 1));
      links.next = {
        href: `${baseUrl}?${nextParams.toString()}`,
      };
    }
  }
  // 프로필 조회 (cursor 기반 페이지네이션)
  else if (cursor !== undefined) {
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
  const categoryId = searchParams.get("category");
  const sort = searchParams.get("sort") || "created_at";
  const profileFilter = searchParams.get("profile_filter");
  const userId = searchParams.get("user_id");

  // 키워드 검색 (제목/내용에서 검색)
  if (keyword) {
    filteredData = filteredData.filter(
      (meme) =>
        meme.title.toLowerCase().includes(keyword.toLowerCase()) ||
        meme.content?.toLowerCase().includes(keyword.toLowerCase())
    );
  }

  // 카테고리 필터링
  if (categoryId) {
    filteredData = filteredData.filter((meme) => meme.category_id === Number(categoryId));
  }

  // 사용자 ID 필터링
  if (userId) {
    filteredData = filteredData.filter((meme) => meme.account_id === Number(userId));
  }

  // 프로필 필터링
  if (profileFilter === "posts") {
    // 사용자가 작성한 공감밈 콘텐츠 (userId 기반으로 필터링)
    // 이미 위에서 userId로 필터링했으므로 추가 처리 불필요
  } else if (profileFilter === "likes") {
    // 사용자가 좋아요 누른 콘텐츠 (시뮬레이션)
    // 실제로는 likes 테이블과 조인해야 함
    filteredData = filteredData.filter((_, index) => index % 3 === 0);
  }

  // 정렬 처리
  if (sort === "created_at") {
    filteredData.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } else if (sort === "likes") {
    filteredData.sort((a, b) => (b.likes || 0) - (a.likes || 0));
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

    // API 명세에 맞게 응답 데이터 변환
    const transformPost = (post: Post) => ({
      title: post.title,
      content: post.content,
      media_url: post.media_url,
      media_upload_time: post.created_at, // created_at를 upload_time으로 사용
      user_id: post.account_id, // account_id를 user_id로 매핑
      category_id: post.category_id,
      created_at: post.created_at,
      updated_at: post.updated_at,
    });

    // 프로필 조회 (cursor 기반 페이지네이션)
    if (profileFilter) {
      const startIndex = cursor
        ? filteredData.findIndex((item) => btoa(item.created_at) === cursor) + 1
        : 0;

      const items = filteredData.slice(startIndex, startIndex + size);
      const nextCursor =
        items.length === size ? btoa(items[items.length - 1].created_at) : undefined;

      // _links에서 올바른 baseURL 사용
      const linkBaseUrl = profileFilter === "likes" ? "/api/likes" : "/api/posts";

      return HttpResponse.json({
        message: "콘텐츠 조회에 성공했습니다",
        data: {
          memes: items.map(transformPost),
          pageInfo: {
            limit: size,
            next: !!nextCursor,
            nextCursor: nextCursor,
          },
        },
        _links: generateLinks(linkBaseUrl, searchParams, undefined, nextCursor),
      });
    }

    // 일반 조회 (offset 기반 페이지네이션)
    const startIndex = (page - 1) * size;
    const items = filteredData.slice(startIndex, startIndex + size);

    return HttpResponse.json({
      message: "콘텐츠 조회에 성공했습니다",
      data: {
        memes: items.map(transformPost),
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
