import { LiveStream } from "@/components/live/live-stream"
import { LiveDetailLoading } from "@/components/live/live-detail-loading"
import { Suspense } from "react"

interface LiveDetailPageProps {
  params: {
    id: string
  }
}

export default function LiveDetailPage({ params }: LiveDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<LiveDetailLoading />}>
        <LiveStream id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: LiveDetailPageProps) {
  return {
    title: `Live Stream | 인싸이더`,
    description: `Watch live stream on 인싸이더.`,
  }
}
