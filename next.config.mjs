import nextPWA from "next-pwa";

const withPWA = nextPWA({
  // PWA 파일들이 생성될 디렉토리
  dest: "public",

  // PWA 비활성화 여부 (development 환경에서는 true로 설정하여 MSW와 충돌 방지)
  disable: process.env.NODE_ENV === "development",

  // 개발 환경에서는 서비스 워커 등록 비활성화
  register: process.env.NODE_ENV !== "development",

  // 새로운 서비스 워커가 발견되면 즉시 활성화
  skipWaiting: process.env.NODE_ENV !== "development",

  // 빌드 제외 파일 (MSW 서비스 워커 제외)
  buildExcludes: [/middleware-manifest\.json$/, /mockServiceWorker\.js$/],

  // PWA가 오프라인에서도 작동하도록 하는 설정
  fallbacks: {
    // 이미지 로딩 실패시 대체 이미지
    image: "/public/placeholder.svg",
    // 문서 로딩 실패시 대체 페이지
    document: "/error",
  },

  // 캐시 설정 (개발 환경에서는 API 캐시 비활성화)
  runtimeCaching:
    process.env.NODE_ENV === "development"
      ? []
      : [
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
    // ESLint 에러를 경고로 처리하여 빌드 중단 방지
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com https://youtube.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https://*.youtube.com https://*.ytimg.com https://img.youtube.com https://*.vimeocdn.com",
              "media-src 'self' https://*.youtube.com https://*.googlevideo.com https://vimeo.com https://*.vimeo.com",
              "frame-src 'self' https://www.youtube.com https://youtube.com https://player.vimeo.com https://*.dailymotion.com https://player.twitch.tv",
              "connect-src 'self' https://www.youtube.com https://youtube.com https://vimeo.com",
              "font-src 'self' data:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async rewrites() {
    // 개발 환경에서만 API 프록시 설정
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/server/:path*",
          destination: `${process.env.SERVER_URL}/api/:path*`,
        },
      ];
    }
    return [];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      "localhost",
      "inssider.com",
      // YouTube 도메인들
      "img.youtube.com",
      "i.ytimg.com",
      "yt3.ggpht.com",
      // Vimeo 도메인들
      "i.vimeocdn.com",
      "f.vimeocdn.com",
      // 기타 비디오 플랫폼들
      "s1.dmcdn.net", // Dailymotion
      "static-cdn.jtvnw.net", // Twitch
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.youtube.com",
      },
      {
        protocol: "https",
        hostname: "*.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "*.vimeocdn.com",
      },
      {
        protocol: "https",
        hostname: "*.dmcdn.net",
      },
      {
        protocol: "https",
        hostname: "*.jtvnw.net",
      },
    ],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },
  env: {
    NEXT_PUBLIC_API_MOCKING: process.env.NODE_ENV === "development" ? "enabled" : "",
  },

  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "lucide-react",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-select",
      "@radix-ui/react-toast",
    ],
  },

  // 컴파일러 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // MSW를 위한 웹팩 설정
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // 개발 환경에서 클라이언트 사이드에서만 MSW 관련 설정
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default withPWA(nextConfig);
