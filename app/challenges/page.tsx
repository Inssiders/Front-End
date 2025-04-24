import { Suspense } from "react"
import ChallengesHeader from "@/components/challenges/challenges-header"
import ChallengesFilters from "@/components/challenges/challenges-filters"
import ChallengesGrid from "@/components/challenges/challenges-grid"
import ChallengesLoading from "@/components/challenges/challenges-loading"

export default function ChallengesPage() {
  return (
    <div className="pt-20 pb-16">
      <ChallengesHeader />
      <ChallengesFilters />
      <Suspense fallback={<ChallengesLoading />}>
        <ChallengesGrid />
      </Suspense>
    </div>
  )
}
