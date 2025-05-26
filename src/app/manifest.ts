import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Inssider",
    short_name: "Inssider",
    description: "Inssider - 밈 콘텐츠 공유 플랫폼",
    start_url: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait",
    scope: "/",
    background_color: "#ffffff",
    theme_color: "#000000",
    categories: ["social", "entertainment"],
    prefer_related_applications: false,
    screenshots: [
      // 데스크톱 스크린샷
      {
        src: "/screenshots/desktop-home.png",
        sizes: "1919x955",
        type: "image/png",
        form_factor: "wide",
        label: "홈 화면",
      },
      // 모바일 스크린샷
      {
        src: "/screenshots/mobile-home.png",
        sizes: "387x841",
        type: "image/png",
        label: "모바일 홈 화면",
      },
    ],
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "홈",
        url: "/",
        icons: [{ src: "/icons/icon-192x192.png", sizes: "192x192" }],
      },
    ],
  };
}
