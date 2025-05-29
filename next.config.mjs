import nextPWA from "next-pwa";

const withPWA = nextPWA({
  // PWA 파일들이 생성될 디렉토리
  dest: "public",

  // PWA 비활성화 여부 (development 환경에서는 true로 설정하는 것이 좋습니다)
  disable: process.env.NODE_ENV === "development",

  // 서비스 워커를 자동으로 등록
  register: true,

  // 새로운 서비스 워커가 발견되면 즉시 활성화
  skipWaiting: true,

  // 빌드 제외 파일
  buildExcludes: [/middleware-manifest\.json$/],

  // PWA가 오프라인에서도 작동하도록 하는 설정
  fallbacks: {
    // 이미지 로딩 실패시 대체 이미지
    image: "/public/placeholder.svg",
    // 문서 로딩 실패시 대체 페이지
    document: "/error",
  },

  // 캐시 설정
  runtimeCaching: [
    {
      // 모든 http 요청에 대한 캐시 규칙
      urlPattern: /^https?.*/,
      // NetworkFirst: 네트워크 요청을 먼저 시도하고, 실패시 캐시 사용
      handler: "NetworkFirst",
      options: {
        cacheName: "offlineCache",
        expiration: {
          maxEntries: 200, // 최대 캐시 항목 수
          maxAgeSeconds: 24 * 60 * 60, // 캐시 유효 기간 (24시간)
        },
      },
    },
    {
      // 정적 자산에 대한 캐시 규칙
      urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|ico)$/,
      // CacheFirst: 캐시를 먼저 확인하고, 없으면 네트워크 요청
      handler: "CacheFirst",
      options: {
        cacheName: "static-assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30일
        },
      },
    },
    {
      // API 요청에 대한 캐시 규칙
      urlPattern: /\/api\/.*/,
      // StaleWhileRevalidate: 캐시된 응답을 반환하면서 백그라운드에서 새로운 응답을 가져옴
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5분
        },
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["localhost", "inssider.com"],
  },
  env: {
    NEXT_PUBLIC_API_MOCKING:
      process.env.NODE_ENV === "development" ? "enabled" : "",
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/server/:path*",
  //       destination: `${process.env.SERVER_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default withPWA(nextConfig);
