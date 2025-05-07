import { Suspense } from "react"
import CelebritiesHeader from "@/components/celebrities/celebrities-header"
import CelebritiesCategories from "@/components/celebrities/celebrities-categories"
import CelebritiesGrid from "@/components/celebrities/celebrities-grid"
import CelebritiesLoading from "@/components/celebrities/celebrities-loading"

export default function CelebritiesPage() {
  return (
    <div className="pt-20 pb-16">
      <CelebritiesHeader />
      <CelebritiesCategories />
      <Suspense fallback={<CelebritiesLoading />}>
        <CelebritiesGrid />
      </Suspense>
    </div>
  )
}
