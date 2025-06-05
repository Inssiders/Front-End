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
import styles from "./provider.module.css";

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
        <SessionProvider
          refetchInterval={5 * 60} // 5분마다 세션 체크
          refetchOnWindowFocus={true} // 윈도우 포커스 시 세션 갱신
          refetchWhenOffline={false} // 오프라인 상태에서 세션 갱신 방지
        >
          <Suspense fallback={<Web3CubeLoader />}>{children}</Suspense>
        </SessionProvider>
      </QueryClientProvider>
    </MSWProvider>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainer}>
      {/* 떠다니는 네온 파티클들 */}
      <div className={styles.particlesContainer}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      {/* 글래스모피즘 헤더 */}
      <div className={styles.headerContainer}>
        <Header />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <main className={styles.mainContent}>{children}</main>

      {/* 토스터 */}
      <ToasterContext />

      {/* 글래스모피즘 푸터 */}
      <div className={styles.footerContainer}>
        <Footer />
      </div>

      {/* 애널리틱스 */}
      <Analytics />
    </div>
  );
};
