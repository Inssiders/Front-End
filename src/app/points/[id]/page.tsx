import { PointsDetail } from "@/components/points/points-detail"
import { PointsDetailLoading } from "@/components/points/points-detail-loading"
import { Suspense } from "react"

interface PointsDetailPageProps {
  params: {
    id: string
  }
}

export default function PointsDetailPage({ params }: PointsDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<PointsDetailLoading />}>
        <PointsDetail id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: PointsDetailPageProps) {
  return {
    title: `Points Details | 인싸이더`,
    description: `View your points details on 인싸이더.`,
  }
}
