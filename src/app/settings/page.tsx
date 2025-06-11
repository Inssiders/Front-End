import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import
const SettingsHeader = dynamic(() => import("@/components/settings/settings-header"), {
  loading: () => <div className="h-20 bg-gray-50 animate-pulse rounded-lg" />,
});

const SettingsContent = dynamic(() => import("@/components/settings/settings-content"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />,
});

const SettingsLoading = dynamic(() => import("@/components/settings/settings-loading"));

export default async function SettingsPage() {
  return (
    <div className="pb-10">
      <SettingsHeader />
      <Suspense fallback={<SettingsLoading />}>
        <SettingsContent />
      </Suspense>
    </div>
  );
}
