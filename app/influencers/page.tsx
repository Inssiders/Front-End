import { Suspense } from "react"
import InfluencersHeader from "@/components/influencers/influencers-header"
import InfluencersCategories from "@/components/influencers/influencers-categories"
import InfluencersGrid from "@/components/influencers/influencers-grid"
import InfluencersLoading from "@/components/influencers/influencers-loading"

export default function InfluencersPage() {
  return (
    <div className="pt-20 pb-16">
      <InfluencersHeader />
      <InfluencersCategories />
      <Suspense fallback={<InfluencersLoading />}>
        <InfluencersGrid />
      </Suspense>
    </div>
  )
}
