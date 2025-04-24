import { CreatorStudioDetail } from "@/components/creator-studio/creator-studio-detail"
import { CreatorStudioDetailLoading } from "@/components/creator-studio/creator-studio-detail-loading"
import { Suspense } from "react"

interface CreatorStudioDetailPageProps {
  params: {
    id: string
  }
}

export default function CreatorStudioDetailPage({ params }: CreatorStudioDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<CreatorStudioDetailLoading />}>
        <CreatorStudioDetail id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: CreatorStudioDetailPageProps) {
  return {
    title: `Creator Studio | 인싸이더`,
    description: `Manage your content on 인싸이더.`,
  }
}
