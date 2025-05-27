import type {
  AuthResponse,
  DeleteAccountResponse,
  RegisterResponse,
} from "@/utils/type/auth";
import { http, HttpResponse } from "msw";
import { mockErrors, mockTokens, mockUsers } from "../seed-data";

interface TokenRequest {
  email?: string;
  password?: string;
  grant_type: "authorization_code" | "password" | "refresh_token";
  uuid?: string;
  refresh_token?: string;
  client_id?: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  register_type: "password";
}

interface ProfileResponse {
  message: string;
  data: {
    nickname: string;
    profileUrl: string;
    bio?: string;
    follower_count?: number;
    post_count?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
  };
}

// Auth handlers
const handlers = [
  // 토큰 발급/갱신
  http.post(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL
    }/api/auth/token`,
    async ({ request }) => {
      const body = (await request.json()) as TokenRequest;
      const { email, password, grant_type, uuid, refresh_token, client_id } =
        body;

      // authorization_code 방식
      if (grant_type === "authorization_code" && uuid) {
        return HttpResponse.json({
          message: "토큰 발급에 성공했습니다.",
          data: {
            grant_type: "authorization_code",
            token: {
              access_token: "",
              token_type: "Bearer",
              expires_in: 300, // 5분
            },
          },
        } as AuthResponse);
      }

      // password 방식
      if (grant_type === "password" && email && password) {
        const user = mockUsers.find((u) => u.email === email);
        if (!user || user.password !== password) {
          return HttpResponse.json(mockErrors.unauthorized, { status: 401 });
        }

        if (user.deleted_at) {
          return HttpResponse.json(mockErrors.forbidden, { status: 403 });
        }

        return HttpResponse.json({
          message: "토큰 발급에 성공했습니다.",
          data: {
            grant_type: "password",
            token: {
              access_token: mockTokens.access_token,
              token_type: "Bearer",
              expires_in: mockTokens.expires_in,
              refresh_token: mockTokens.refresh_token,
            },
          },
        } as AuthResponse);
      }

      // refresh_token 방식
      if (
        grant_type === "refresh_token" &&
        refresh_token &&
        client_id === "inssider-app"
      ) {
        return HttpResponse.json({
          message: "토큰 발급에 성공했습니다.",
          data: {
            grant_type: "refresh_token",
            token: {
              access_token: mockTokens.access_token,
              token_type: "Bearer",
              expires_in: mockTokens.expires_in,
              refresh_token: mockTokens.refresh_token,
            },
          },
        } as AuthResponse);
      }

      return HttpResponse.json(mockErrors.unauthorized, { status: 401 });
    }
  ),

  // 프로필 조회
  http.get(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL
    }/api/profiles/:id`,
    async ({ params, request }) => {
      const { id } = params;
      const authHeader = request.headers.get("Authorization");
      const user = mockUsers.find((u) => u.id === id);

      if (!user) {
        return HttpResponse.json(
          {
            type: "https://api.inssider.com/problems/not-found",
            title: "존재하지 않는 계정",
            status: 404,
            detail: "해당 계정은 존재하지 않습니다.",
            instance: `/api/profiles/${id}`,
          },
          { status: 404 }
        );
      }

      // 본인 프로필 조회
      if (authHeader?.includes(mockTokens.access_token)) {
        return HttpResponse.json({
          message: "조회에 성공했습니다.",
          data: {
            nickname: user.nickname,
            profileUrl: user.profileUrl,
            bio: user.bio,
            follower_count: user.follower_count,
            post_count: user.post_count,
            accountVisible: user.accountVisible,
            followerVisible: user.followerVisible,
          },
        } as ProfileResponse);
      }

      // 타인 프로필 조회 (공개 계정)
      if (user.accountVisible) {
        return HttpResponse.json({
          message: "조회에 성공했습니다.",
          data: {
            nickname: user.nickname,
            profileUrl: user.profileUrl,
            bio: user.bio,
            follower_count: user.follower_count,
            post_count: user.post_count,
          },
        } as ProfileResponse);
      }

      // 타인 프로필 조회 (비공개 계정)
      return HttpResponse.json({
        message: "조회에 성공했습니다.",
        data: {
          nickname: user.nickname,
          profileUrl: user.profileUrl,
        },
      } as ProfileResponse);
    }
  ),

  // 회원가입
  http.post(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL
    }/api/accounts`,
    async ({ request }) => {
      const body = (await request.json()) as RegisterRequest;
      const { email, password } = body;

      // 이메일 중복 체크
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        return HttpResponse.json(mockErrors.emailConflict, { status: 409 });
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return HttpResponse.json(mockErrors.invalidRequest, { status: 422 });
      }

      return HttpResponse.json(
        {
          message: "회원가입이 완료되었습니다.",
          data: {
            email,
          },
        } as RegisterResponse,
        { status: 201 }
      );
    }
  ),

  // 회원탈퇴
  http.delete(
    `${
      process.env.NEXT_PUBLIC_SERVER_URL || process.env.SERVER_URL
    }/api/accounts/me`,
    async ({ request }) => {
      const authHeader = request.headers.get("Authorization");

      if (!authHeader?.includes(mockTokens.access_token)) {
        return HttpResponse.json(mockErrors.unauthorized, { status: 401 });
      }

      return HttpResponse.json({
        message: "회원 탈퇴가 완료되었습니다.",
        data: {
          deleted_at: new Date().toISOString(),
        },
      } as DeleteAccountResponse);
    }
  ),
];
export { handlers };
