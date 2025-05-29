import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, userId } = body;

    // 인증 토큰 검증 (선택사항)
    const token = request.headers.get("authorization");
    if (!token || token !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 특정 경로 재검증
    if (path) {
      revalidatePath(path);
      console.log(`[ISR] Revalidated path: ${path}`);
    }

    // 특정 태그 재검증
    if (tag) {
      revalidateTag(tag);
      console.log(`[ISR] Revalidated tag: ${tag}`);
    }

    // 프로필 페이지 재검증
    if (userId) {
      revalidatePath(`/profile/${userId}`);
      revalidateTag(`profile-${userId}`);
      revalidateTag(`posts-${userId}`);
      revalidateTag(`likes-${userId}`);
      console.log(`[ISR] Revalidated profile: ${userId}`);
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: "Revalidation successful",
    });
  } catch (error) {
    console.error("[ISR] Revalidation error:", error);
    return NextResponse.json(
      {
        message: "Error revalidating",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
