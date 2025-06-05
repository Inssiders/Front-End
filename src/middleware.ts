import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // API 요청인 경우 쿠키를 Authorization 헤더로 변환
  if (request.nextUrl.pathname.startsWith("/server/")) {
    const accessToken = request.cookies.get("access_token")?.value;

    if (accessToken) {
      // 새로운 요청 헤더 생성
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("Authorization", `Bearer ${accessToken}`);

      // 수정된 헤더로 요청 전달
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  const token = await getToken({ req: request });

  // /settings에 로그인하지 않은 사용자가 접근하면 리다이렉트
  if (request.nextUrl.pathname.startsWith("/settings") && !token) {
    // 접근 불가 페이지로 리다이렉트 (예: /not-found?code=401)
    return NextResponse.redirect(new URL("/not-found?code=401", request.url));
  }

  // 모든 조건을 통과한 경우 접근 허용
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 지정
export const config = {
  matcher: [
    "/settings",
    "/server/:path*", // API 요청에 대해서도 미들웨어 적용
  ],
};
