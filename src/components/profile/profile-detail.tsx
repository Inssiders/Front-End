"use client";

import { useEffect, useState } from "react";
import ProfileActivity from "./profile-activity";
import ProfileChallenges from "./profile-challenges";
import ProfileLikes from "./profile-likes";
import ProfilePosts from "./profile-posts";
import ProfileSaved from "./profile-saved";
import { ProfileTabs } from "./profile-tabs";

interface ProfileDetailProps {
  id: string;
}

export function ProfileDetail({ id }: ProfileDetailProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    // Simulate fetching profile data
    const fetchProfile = async () => {
      try {
        // In a real app, you would fetch from an API
        // const response = await fetch(`/api/profile/${id}`)
        // const data = await response.json()

        // Simulated data
        const data = {
          id,
          username: "인싸이더유저",
          displayName: "인싸이더 사용자",
          avatar: "/placeholder.svg?height=150&width=150",
          bio: "인싸이더 플랫폼에서 활동하는 사용자입니다. 다양한 콘텐츠를 공유하고 있습니다.",
          followers: 1243,
          following: 567,
          posts: 89,
          level: 7,
          points: 12500,
          joinDate: "2023-01-15",
          badges: [
            { id: "badge-1", name: "콘텐츠 크리에이터", icon: "🏆" },
            { id: "badge-2", name: "인기 멤버", icon: "⭐" },
            { id: "badge-3", name: "챌린지 우승자", icon: "🥇" },
          ],
          isFollowing: false,
          isCurrentUser: false,
        };

        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">로딩 중...</div>;
  }

  if (!profile) {
    return <div className="p-8 text-center">프로필을 찾을 수 없습니다.</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <ProfilePosts id={id} />;
      case "challenges":
        return <ProfileChallenges id={id} />;
      case "saved":
        return <ProfileSaved id={id} />;
      case "likes":
        return <ProfileLikes id={id} />;
      case "activity":
        return <ProfileActivity id={id} />;
      default:
        return <ProfilePosts id={id} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-48"></div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex flex-col items-center md:items-start">
              <img
                src={profile.avatar || "/placeholder.svg"}
                alt={profile.displayName}
                className="w-32 h-32 rounded-full border-4 border-white -mt-20 mb-4"
              />
              <h1 className="text-2xl font-bold mb-1">{profile.displayName}</h1>
              <p className="text-gray-500 mb-4">@{profile.username}</p>

              <div className="flex gap-4 mb-6">
                <div className="text-center">
                  <p className="font-bold">
                    {profile.followers.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">팔로워</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">
                    {profile.following.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm">팔로잉</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{profile.posts.toLocaleString()}</p>
                  <p className="text-gray-500 text-sm">게시물</p>
                </div>
              </div>

              {profile.isCurrentUser ? (
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-medium mb-6 w-full md:w-auto">
                  프로필 편집
                </button>
              ) : (
                <button
                  className={`${
                    profile.isFollowing
                      ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  } px-6 py-2 rounded-full font-medium mb-6 w-full md:w-auto`}
                >
                  {profile.isFollowing ? "팔로잉" : "팔로우"}
                </button>
              )}

              <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                <h2 className="font-bold mb-2">소개</h2>
                <p className="text-gray-700 mb-4">{profile.bio}</p>
                <p className="text-gray-500 text-sm">
                  가입일: {profile.joinDate}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg w-full mb-6">
                <h2 className="font-bold mb-3">배지</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge: any) => (
                    <div
                      key={badge.id}
                      className="flex items-center bg-white p-2 rounded-full"
                    >
                      <span className="mr-1">{badge.icon}</span>
                      <span className="text-sm">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg w-full">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-bold">포인트</h2>
                  <p className="font-bold text-blue-500">
                    {profile.points.toLocaleString()}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">레벨</p>
                  <p className="font-medium">{profile.level}</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 mt-8 md:mt-0 md:pl-8">
              <ProfileTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isCurrentUser={profile.isCurrentUser}
              />

              <div className="mt-6">{renderTabContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
