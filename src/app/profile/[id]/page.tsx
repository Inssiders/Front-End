import { ProfileDetail } from "@/app/profile/_components/profile-detail";
import { ProfileDetailLoading } from "@/app/profile/_components/profile-detail-loading";
import { Suspense } from "react";

interface ProfileDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProfileDetailPage({
  params,
}: ProfileDetailPageProps) {
  // 서버에서 fetch로 데이터 가져오기
  const res = await fetch(
    `${process.env.SERVER_URL || ""}/mock-data/all-mock-data.json`,
    { cache: "no-store" }
  );
  const allData = await res.json();
  const profile = allData.find(
    (p: any) => String(p.user_id) === String(params.id)
  );
  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <Suspense fallback={<ProfileDetailLoading />}>
        <ProfileDetail profile={profile} />
      </Suspense>
    </main>
  );
}

export async function generateMetadata({ params }: ProfileDetailPageProps) {
  return {
    title: `User Profile | 인싸이더`,
    description: `View user profile on 인싸이더.`,
  };
}
