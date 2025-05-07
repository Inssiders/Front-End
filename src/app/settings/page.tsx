import { Suspense } from "react"
import SettingsHeader from "@/components/settings/settings-header"
import SettingsTabs from "@/components/settings/settings-tabs"
import SettingsLoading from "@/components/settings/settings-loading"

export default function SettingsPage() {
  return (
    <div className="pt-20 pb-16">
      <SettingsHeader />
      <Suspense fallback={<SettingsLoading />}>
        <SettingsTabs />
      </Suspense>
    </div>
  )
}
