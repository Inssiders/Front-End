import { CelebrityDetail } from "@/components/celebrities/celebrity-detail"
import { CelebrityDetailLoading } from "@/components/celebrities/celebrity-detail-loading"
import { Suspense } from "react"

interface CelebrityDetailPageProps {
  params: {
    id: string
  }
}

export default function CelebrityDetailPage({ params }: CelebrityDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<CelebrityDetailLoading />}>
        <CelebrityDetail id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: CelebrityDetailPageProps) {
  // You would typically fetch the celebrity data here
  return {
    title: `Celebrity Details | 인싸이더`,
    description: `Learn more about this celebrity on 인싸이더.`,
  }
}
