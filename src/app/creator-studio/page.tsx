import { Suspense } from "react"
import CreatorStudioHeader from "@/components/creator-studio/creator-studio-header"
import CreatorStudioTabs from "@/components/creator-studio/creator-studio-tabs"
import CreatorStudioLoading from "@/components/creator-studio/creator-studio-loading"

export default function CreatorStudioPage() {
  return (
    <div className="pt-20 pb-16">
      <CreatorStudioHeader />
      <Suspense fallback={<CreatorStudioLoading />}>
        <CreatorStudioTabs />
      </Suspense>
    </div>
  )
}
