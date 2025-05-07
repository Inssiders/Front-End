import { MemeDetail } from "@/components/memes/meme-detail"
import { MemeDetailLoading } from "@/components/memes/meme-detail-loading"
import { Suspense } from "react"

interface MemeDetailPageProps {
  params: {
    id: string
  }
}

export default function MemeDetailPage({ params }: MemeDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<MemeDetailLoading />}>
        <MemeDetail id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: MemeDetailPageProps) {
  return {
    title: `Meme Details | 인싸이더`,
    description: `View this meme on 인싸이더.`,
  }
}
