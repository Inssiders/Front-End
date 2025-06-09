import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import로 큰 컴포넌트를 로드
const SignInClient = dynamic(() => import("../_components/SignInClient"), {
  loading: () => (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <div className="h-96 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse rounded-2xl shadow-lg" />
      </div>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "로그인 | inSSider",
  description: "MZ세대 밈 큐레이션 플랫폼 Inssider의 로그인 페이지. 최신 트렌드 밈과 함께 쉽고 빠르게 로그인하세요!",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="w-full max-w-md mx-auto">
            <div className="h-96 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse rounded-2xl shadow-lg" />
          </div>
        </div>
      }
    >
      <SignInClient />
    </Suspense>
  );
}
