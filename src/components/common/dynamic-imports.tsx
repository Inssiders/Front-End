"use client";

import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <Loader2 className="w-6 h-6 animate-spin" />
  </div>
);

// 큰 컴포넌트들을 동적 import
export const DynamicSearchContainer = dynamic(() => import("@/components/search/search-container"), {
  loading: LoadingSpinner,
  ssr: false, // 검색은 클라이언트에서만
});

export const DynamicPostsGrid = dynamic(() => import("@/components/posts/post-grid"), {
  loading: LoadingSpinner,
});

export const DynamicSettings = dynamic(() => import("@/components/settings/settings-unified"), {
  loading: LoadingSpinner,
  ssr: false, // 설정은 클라이언트에서만
});

export const DynamicEmpathyMemeContainer = dynamic(
  () => import("@/app/empathy-meme/_components/empathy-meme-container"),
  {
    loading: LoadingSpinner,
  }
);

// 애니메이션 관련 컴포넌트들 (클라이언트에서만 필요)
export const DynamicMotionDiv = dynamic(() => import("framer-motion").then((mod) => ({ default: mod.motion.div })), {
  ssr: false,
  loading: () => <div style={{ opacity: 0 }} />,
});

export const DynamicAnimatePresence = dynamic(
  () => import("framer-motion").then((mod) => ({ default: mod.AnimatePresence })),
  {
    ssr: false,
    loading: () => null,
  }
);

// Auth 관련 컴포넌트들
export const DynamicSignInForm = dynamic(() => import("@/app/auth/_components/SignInForm"), {
  loading: LoadingSpinner,
  ssr: false,
});

export const DynamicMemeCard = dynamic(() => import("@/app/auth/_components/MemeCard"), {
  loading: LoadingSpinner,
  ssr: false,
});
