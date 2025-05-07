import { Suspense } from "react"
import ProfileHeader from "@/components/profile/profile-header"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import ProfileLoading from "@/components/profile/profile-loading"

export default function ProfilePage() {
  return (
    <div className="pt-20 pb-16">
      <ProfileHeader />
      <Suspense fallback={<ProfileLoading />}>
        <ProfileTabs />
      </Suspense>
    </div>
  )
}
