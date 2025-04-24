import { Suspense } from "react"
import MemesHeader from "@/components/memes/memes-header"
import MemesCategories from "@/components/memes/memes-categories"
import MemesGrid from "@/components/memes/memes-grid"
import MemesLoading from "@/components/memes/memes-loading"

export default function MemesPage() {
  return (
    <div className="pt-20 pb-16">
      <MemesHeader />
      <MemesCategories />
      <Suspense fallback={<MemesLoading />}>
        <MemesGrid />
      </Suspense>
    </div>
  )
}
