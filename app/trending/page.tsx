import { Suspense } from "react"
import TrendingHeader from "@/components/trending/trending-header"
import TrendingFilters from "@/components/trending/trending-filters"
import TrendingGrid from "@/components/trending/trending-grid"
import TrendingLoading from "@/components/trending/trending-loading"

export default function TrendingPage() {
  return (
    <div className="pt-20 pb-16">
      <TrendingHeader />
      <TrendingFilters />
      <Suspense fallback={<TrendingLoading />}>
        <TrendingGrid />
      </Suspense>
    </div>
  )
}
