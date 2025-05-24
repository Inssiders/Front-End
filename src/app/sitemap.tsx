import { MetadataRoute } from "next";

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 웹사이트 기본 URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://inssider.kr";

  // 정적 라우트 설정
  const staticRoutes = [
    "",
    "/about",
    "/terms",
    "/privacy",
    "/faq",
    "/search",
    "/settings",
    "/empathy-meme",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8, // 메인 페이지는 우선순위 1, 나머지는 0.8
  }));

  // TODO: 밈 콘텐츠, 공유밈 프로필을 위한 동적 라우트 추가
  // 데이터베이스에서 동적 라우트를 가져오는 예시:

  // TODO: 게시물 데이터 조회

  // TODO: 게시물 URL 생성

  // TODO: 프로필 데이터 조회

  // TODO: 프로필 URL 생성

  return [...staticRoutes];
}

export default sitemap;
