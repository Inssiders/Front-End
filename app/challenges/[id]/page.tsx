import { ChallengeDetail } from "@/components/challenges/challenge-detail"
import { ChallengeDetailLoading } from "@/components/challenges/challenge-detail-loading"
import { Suspense } from "react"

interface ChallengeDetailPageProps {
  params: {
    id: string
  }
}

export default function ChallengeDetailPage({ params }: ChallengeDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<ChallengeDetailLoading />}>
        <ChallengeDetail id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: ChallengeDetailPageProps) {
  // You would typically fetch the challenge data here
  return {
    title: `Challenge Details | 인싸이더`,
    description: `Learn more about this challenge on 인싸이더.`,
  }
}
