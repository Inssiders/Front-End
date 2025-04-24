import { ProfileDetail } from "@/components/profile/profile-detail"
import { ProfileDetailLoading } from "@/components/profile/profile-detail-loading"
import { Suspense } from "react"

interface ProfileDetailPageProps {
  params: {
    id: string
  }
}

export default function ProfileDetailPage({ params }: ProfileDetailPageProps) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<ProfileDetailLoading />}>
        <ProfileDetail id={params.id} />
      </Suspense>
    </main>
  )
}

export async function generateMetadata({ params }: ProfileDetailPageProps) {
  return {
    title: `User Profile | 인싸이더`,
    description: `View user profile on 인싸이더.`,
  }
}
