"use client";

import { MSWProvider } from "@/contexts/msw-context";
import ToasterContext from "@/contexts/toaster-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import Footer from "./footer";
import Header from "./header";
import { Web3CubeLoader } from "./loader";

interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const NextProvider = ({ children }: Props) => {
  return (
    <MSWProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Suspense fallback={<Web3CubeLoader />}>{children}</Suspense>
        </SessionProvider>
      </QueryClientProvider>
    </MSWProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col min-h-screen w-full bg-gradient-genz overflow-x-hidden">
      {/* 떠다니는 네온 파티클들 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-[var(--neon-cyan)] rounded-full animate-float-gentle neon-glow-cyan opacity-60"></div>
        <div className="absolute top-[20%] right-[10%] w-3 h-3 bg-[var(--neon-pink)] rounded-full animate-bounce-neon opacity-50"></div>
        <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 bg-[var(--neon-purple)] rounded-full animate-pulse-glow opacity-70"></div>
        <div className="absolute bottom-[30%] right-[15%] w-2.5 h-2.5 bg-[var(--neon-blue)] rounded-full animate-float-gentle opacity-60"></div>
        <div className="absolute top-[40%] right-[5%] w-1 h-1 bg-[var(--neon-green)] rounded-full animate-bounce-neon opacity-80"></div>
        <div className="absolute bottom-[15%] left-[12%] w-2 h-2 bg-[var(--neon-orange)] rounded-full animate-pulse-glow opacity-50"></div>
      </div>

      {/* 글래스모피즘 헤더 */}
      <div className="relative z-40">
        <Header />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className="relative flex-1 pt-16 flex flex-col z-10">
        {children}
      </main>

      {/* 토스터 */}
      <ToasterContext />

      {/* 글래스모피즘 푸터 */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* 애널리틱스 */}
      <Analytics />
    </div>
  );
};
