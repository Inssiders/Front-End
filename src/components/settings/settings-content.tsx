"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// 새로운 통합 설정 컴포넌트 로드
const SettingsUnified = dynamic(() => import("./settings-unified"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

export default function SettingsContent() {
  return (
    <div className="w-full">
      <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse rounded-lg" />}>
        <SettingsUnified />
      </Suspense>
    </div>
  );
}
