import { QueryParams } from "@/app/profile/_components/profile-detail";
import { ProfileDetailLoading } from "@/app/profile/_components/profile-detail-loading";
import { apiFetch } from "@/utils/fetch/auth";
import { fetchProfilePosts } from "@/utils/fetch/profile";
import { ProfileData } from "@/utils/types/profile";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 동적 import로 ProfileDetail 컴포넌트를 로드
const ProfileDetail = dynamic(
  () => import("@/app/profile/_components/profile-detail").then((mod) => ({ default: mod.ProfileDetail })),
  {
    loading: () => <ProfileDetailLoading />,
  }
);

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
    category?: string;
    sort?: "latest" | "popular";
    keyword?: string;
    size?: string;
  };
}

interface ProfileResponse {
  message: string;
  data: {
    nickname: string;
    profile_url: string;
    bio: string;
    created_at: string;
    follower_count: number;
    following_count: number;
  };
}

export const revalidate = 3600; // 1시간 (3600초) ISR 재생성 주기

export default async function ProfileDetailPage({ params, searchParams }: ProfileDetailPageProps) {
  const { id: userId } = params;
  const { tab, category: categoryId, sort = "latest", keyword, size = "20" } = searchParams;

  try {
    // 프로필 정보와 게시물 데이터를 병렬로 가져오기
    const [profileResponse, postsData, likesData] = await Promise.all([
      apiFetch(`/profiles/${userId}`).then((res) => res.json() as Promise<ProfileResponse>),
      fetchProfilePosts(userId, {
        profileFilter: "post",
        size: parseInt(size),
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        keyword,
      }),
      fetchProfilePosts(userId, {
        profileFilter: "like",
        size: parseInt(size),
        categoryId: categoryId ? parseInt(categoryId) : undefined,
        keyword,
      }),
    ]);
    console.log(profileResponse);
    console.log(postsData);
    console.log(likesData);
    // ProfileData 형태로 변환
    const profile: ProfileData = {
      user_id: userId,
      user_detail_username: profileResponse.data.nickname || `사용자${userId}`,
      user_detail_profile_url: profileResponse.data.profile_url || "/placeholder.svg?height=150&width=150&text=U",
      user_detail_introduction: profileResponse.data.bio || "비어있음",
      user_created_at: profileResponse.data.created_at || new Date().toISOString(),
      posts: postsData?.data?.content?.length || 0,
      followers: profileResponse.data.follower_count || 0,
      following: profileResponse.data.following_count || 0,
    };

    const queryParams: QueryParams = {
      categoryId: categoryId ? parseInt(categoryId) : undefined,
      keyword,
      size: parseInt(size),
    };

    return (
      <main className="flex min-h-screen flex-col bg-gray-50">
        <Suspense fallback={<ProfileDetailLoading />}>
          <ProfileDetail
            profile={profile}
            initialTab={tab}
            initialPostsData={postsData}
            initialLikesData={likesData}
            queryParams={queryParams}
          />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error("프로필 조회 오류:", error);
    return (
      <main className="flex min-h-screen flex-col bg-gray-50">
        <div className="py-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900">프로필을 불러오는데 실패했습니다.</h1>
          <p className="mt-2 text-gray-600">잠시 후 다시 시도해주세요.</p>
        </div>
      </main>
    );
  }
}

export async function generateMetadata({ params }: ProfileDetailPageProps) {
  const { id: userId } = params;

  return {
    title: `${userId} 프로필 | 인싸이더`,
    description: `인싸이더에서 ${userId}님의 프로필을 확인해보세요.`,
  };
}
