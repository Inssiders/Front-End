"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// 로딩 컴포넌트
const DefaultLoading = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// 애니메이션이 포함된 컴포넌트들 (클라이언트에서만 로드)
export const LazyMotionComponents = {
  MotionDiv: dynamic(() => import("framer-motion").then((mod) => ({ default: mod.motion.div })), {
    ssr: false,
    loading: () => <div style={{ opacity: 0 }} />,
  }),
  AnimatePresence: dynamic(() => import("framer-motion").then((mod) => ({ default: mod.AnimatePresence })), {
    ssr: false,
    loading: () => null,
  }),
};

// 큰 UI 컴포넌트들
export const LazyUIComponents = {
  Settings: dynamic(() => import("@/components/settings/settings-unified"), {
    loading: DefaultLoading,
    ssr: false,
  }),

  SearchContainer: dynamic(() => import("@/components/search/search-container"), {
    loading: DefaultLoading,
    ssr: false,
  }),

  PostsGrid: dynamic(() => import("@/components/posts/post-grid"), {
    loading: DefaultLoading,
  }),

  AuthSignInForm: dynamic(() => import("@/app/auth/_components/SignInForm"), {
    loading: DefaultLoading,
    ssr: false,
  }),

  EmpathyMemeContainer: dynamic(() => import("@/app/empathy-meme/_components/empathy-meme-container"), {
    loading: DefaultLoading,
  }),
};

// Chart/통계 관련 컴포넌트들 (데이터가 있을 때만 로드)
export const LazyChartComponents = {
  SearchStats: dynamic(() => import("@/components/search/search-stats"), {
    loading: DefaultLoading,
  }),
};

// 조건부 동적 로딩 훅
export function useConditionalLoad<T>(
  condition: boolean,
  importFn: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ComponentType<T>
) {
  const LazyComponent = dynamic(importFn, {
    loading: DefaultLoading,
    ssr: false,
  });

  return condition ? LazyComponent : fallback || (() => null);
}
