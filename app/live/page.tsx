import { Suspense } from "react"
import LiveHeader from "@/components/live/live-header"
import LiveCategories from "@/components/live/live-categories"
import LiveGrid from "@/components/live/live-grid"
import LiveLoading from "@/components/live/live-loading"
import LiveFeatured from "@/components/live/live-featured"

export default function LivePage() {
  return (
    <div className="pt-20 pb-16">
      <LiveHeader />
      <LiveFeatured />
      <LiveCategories />
      <Suspense fallback={<LiveLoading />}>
        <LiveGrid />
      </Suspense>
    </div>
  )
}
