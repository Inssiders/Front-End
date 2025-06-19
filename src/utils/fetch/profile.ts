import { ProfileResponse, ProfileUpdateRequest } from "@/types/profile";

// Helper function to construct URL based on environment
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
}

// 프로필 정보 조회 (오버로드)
export async function fetchProfile(userId: string): Promise<ProfileResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/profiles/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

// 프로필 수정
export async function updateProfile(userId: string, data: ProfileUpdateRequest): Promise<ProfileResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/profiles/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update profile");
  }

  return res.json();
}

// ISR 재검증 트리거 함수
export async function triggerRevalidation(options: { userId?: string; path?: string; tag?: string }) {
  const { userId, path, tag } = options;

  try {
    const response = await fetch("/api/revalidate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REVALIDATE_TOKEN}`,
      },
      body: JSON.stringify({ userId, path, tag }),
    });

    if (!response.ok) {
      throw new Error("Failed to trigger revalidation");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("[ISR] Failed to trigger revalidation:", error);
    throw error;
  }
}
