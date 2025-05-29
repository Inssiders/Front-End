import { ProfileDetail } from "@/app/profile/_components/profile-detail";
import { ProfileDetailLoading } from "@/app/profile/_components/profile-detail-loading";
import { fetchProfilePosts } from "@/utils/fetch";
import { Suspense } from "react";

// MSW 서버 초기화
if (process.env.NODE_ENV === "development") {
  require("@/mocks/server");
}

interface ProfileDetailPageProps {
  params: {
    id: string;
  };
  searchParams: {
    tab?: string;
  };
}

export const revalidate = 3600; // 1시간 (3600초) ISR 재생성 주기

export default async function ProfileDetailPage({
  params,
  searchParams,
}: ProfileDetailPageProps) {
  // params가 해결되기를 기다립니다
  const { id: userId } = await params;
  const { tab } = await searchParams;

  try {
    // 초기 게시물 데이터 및 좋아요 데이터를 병렬로 가져오기
    const [postsData, likesData] = await Promise.all([
      fetchProfilePosts(userId, {
        profileFilter: "posts",
        size: 20,
      }),
      fetchProfilePosts(userId, {
        profileFilter: "likes",
        size: 12,
      }),
    ]);

    const profile = postsData.data.memes[0];

    if (!profile) {
      throw new Error("프로필을 찾을 수 없습니다");
    }

    return (
      <main className="flex flex-col min-h-screen bg-gray-50">
        <Suspense fallback={<ProfileDetailLoading />}>
          <ProfileDetail
            profile={profile}
            initialTab={tab}
            initialPostsData={postsData}
            initialLikesData={likesData}
          />
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
