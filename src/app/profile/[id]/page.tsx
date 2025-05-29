import { ProfileDetail } from "@/app/profile/_components/profile-detail";
import { ProfileDetailLoading } from "@/app/profile/_components/profile-detail-loading";
import { Suspense } from "react";

// MSW 서버 초기화
if (process.env.NODE_ENV === "development") {
  require("@/mocks/server");
}

interface ProfileDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProfileDetailPage({
  params,
}: ProfileDetailPageProps) {
  // params가 해결되기를 기다립니다
  const { id: userId } = await params;

  try {
    // MSW가 처리할 API 엔드포인트로 요청
    const baseUrl =
      process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL;
    const res = await fetch(
      `${baseUrl}/api/posts?profile_filter=posts&size=10&user_id=${userId}`,
      {
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("프로필 데이터를 가져오는데 실패했습니다");
    }

    const data = await res.json();
    const profile = data.data.memes[0];

    if (!profile) {
      throw new Error("프로필을 찾을 수 없습니다");
    }

    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Suspense fallback={<ProfileDetailLoading />}>
          <ProfileDetail profile={profile} />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("프로필 조회 오류:", error);
    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <div className="text-center py-10">
          <h1 className="text-2xl font-bold text-gray-900">
            프로필을 불러오는데 실패했습니다.
          </h1>
          <p className="mt-2 text-gray-600">잠시 후 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }
}

export async function generateMetadata({ params }: ProfileDetailPageProps) {
  return {
    title: `User Profile | 인싸이더`,
    description: `View user profile on 인싸이더.`,
  };
}
