import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // /settings에 로그인하지 않은 사용자가 접근하면 리다이렉트
  if (!token) {
    // 접근 불가 페이지로 리다이렉트 (예: /not-found?code=401)
    return NextResponse.redirect(new URL("/not-found?code=401", request.url));
  }

  // 모든 조건을 통과한 경우 접근 허용
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 지정
export const config = {
  matcher: ["/settings"],
};
