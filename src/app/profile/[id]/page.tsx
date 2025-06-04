import { ProfileDetail } from "@/app/profile/_components/profile-detail";
import { ProfileDetailLoading } from "@/app/profile/_components/profile-detail-loading";
import { fetchProfilePosts } from "@/utils/fetch";
import { ProfileData } from "@/utils/types/profile";
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

// Meme 데이터에서 ProfileData로 변환하는 유틸리티 함수
function transformMemeToProfileData(meme: any, userId: string): ProfileData {
  return {
    user_id: userId,
    user_detail_username: meme.user?.nickname || `사용자${userId}`,
    user_detail_profile_url:
      meme.user?.profileUrl || "/placeholder.svg?height=150&width=150&text=U",
    user_detail_introduction:
      meme.user?.bio || "안녕하세요! 인싸이더에서 활동중입니다.",
    user_created_at: meme.created_at,
    posts: 0, // 실제 게시물 수는 별도로 계산 필요
    followers: 0, // 실제 팔로워 수는 별도 API 필요
    following: 0, // 실제 팔로잉 수는 별도 API 필요
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

    // 첫 번째 meme에서 사용자 정보 추출 (또는 기본값 사용)
    const firstMeme = postsData.data.memes[0];

    // ProfileData 형태로 변환
    const profile: ProfileData = firstMeme
      ? transformMemeToProfileData(firstMeme, userId)
      : {
          user_id: userId,
          user_detail_username: `사용자${userId}`,
          user_detail_profile_url:
            "/placeholder.svg?height=150&width=150&text=U",
          user_detail_introduction: "안녕하세요! 인싸이더에서 활동중입니다.",
          user_created_at: new Date().toISOString(),
          posts: postsData.data.memes.length,
          followers: 0,
          following: 0,
        };

    // 실제 게시물 수 업데이트
    profile.posts = postsData.data.memes.length;

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
  const { id: userId } = await params;

  return {
    title: `${userId} 프로필 | 인싸이더`,
    description: `인싸이더에서 ${userId}님의 프로필을 확인해보세요.`,
  };
}
