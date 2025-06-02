import SettingsHeader from "@/components/settings/settings-header";
import SettingsLoading from "@/components/settings/settings-loading";
import SettingsTabs from "@/components/settings/settings-tabs";
import { Suspense } from "react";

export default function SettingsPage() {
  return (
    <div>
      <SettingsHeader />
      <Suspense fallback={<SettingsLoading />}>
        <SettingsTabs />
      </Suspense>
    </div>
  );
}
