import IntroClient from "@/components/intro/intro-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "inSSider - 밈 트렌드의 중심",
  description:
    "지금 가장 인기있는 밈을 확인하세요! 밈과 유행의 중심, INSSIDER(인싸이더)는 지금 가장 뜨거운 트렌드를 한눈에 즐길 수 있는 밈 큐레이션 플랫폼입니다.",
  keywords: [
    "밈",
    "트렌드",
    "인싸이더",
    "meme",
    "trend",
    "viral",
    "social media",
  ],
  openGraph: {
    title: "inSSider - 밈 트렌드의 중심",
    description: "지금 가장 인기있는 밈을 확인하세요!",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "inSSider - 밈 트렌드의 중심",
    description: "지금 가장 인기있는 밈을 확인하세요!",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return <IntroClient />;
}
