import type { AuthResponse, DeleteAccountResponse } from "@/utils/types/auth";
import { http, HttpResponse } from "msw";
import { db } from "../db";
import { mockErrors, mockUsers } from "../seed-data";
import {
  AccountCreateRequest,
  AccountCreateResponse,
  EmailChallengeRequest,
  EmailChallengeResponse,
  EmailVerifyRequest,
  EmailVerifyResponse,
} from "../types";

// Mock 데이터 정의
const mockTokens = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
};

// API 기본 URL 설정
const BASE_URL = process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

interface TokenRequest {
  email?: string;
  password?: string;
  grantType: "AUTHORIZATION_CODE" | "PASSWORD" | "REFRESH_TOKEN";
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
    profile_url: string;
    bio?: string;
    follower_count?: number;
    post_count?: number;
    account_visible?: boolean;
    follower_visible?: boolean;
  };
}

// 비밀번호 변경 요청 타입
interface PasswordChangeRequest {
  password: string;
}

interface PasswordChangeResponse {
  message: string;
  data: {
    updated_at: string;
  };
}

// 프로필 수정 요청 타입
interface ProfileUpdateRequest {
  nickname?: string;
  introduction?: string;
  profile_url?: string;
  account_visibility?: boolean;
  follower_visibility?: boolean;
}

interface ProfileUpdateResponse {
  message: string;
  data: {
    nickname?: string;
    bio?: string;
    profileUrl?: string;
    accountVisible?: boolean;
    followerVisible?: boolean;
    updated_at: string;
  };
}

// 이메일 인증 코드 저장을 위한 임시 저장소
const emailVerificationStore = new Map<string, { code: string; expiresAt: number }>();

// 이메일 인증 요청 제한을 위한 저장소
const emailRateLimitStore = new Map<string, number>();

// Auth handlers
const handlers = [
  // 토큰 발급/갱신
  http.post(`${BASE_URL}/api/auth/token`, async ({ request }) => {
    const body = (await request.json()) as TokenRequest;
    const { email, password, grantType, uuid, refresh_token, client_id } = body;

    // authorization_code 방식
    if (grantType === "AUTHORIZATION_CODE" && uuid) {
      return HttpResponse.json({
        message: "토큰 발급에 성공했습니다.",
        data: {
          access_token: "ba6c81d0-6f98-4707-b2c0-f83585527026",
          token_type: "Bearer",
          expires_in: 300, // 5분
        },
      } as AuthResponse);
    }

    // password 방식
    if (grantType === "PASSWORD" && email && password) {
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
          access_token: mockTokens.access_token,
          token_type: "Bearer",
          expires_in: mockTokens.expires_in,
          refresh_token: mockTokens.refresh_token,
        },
      } as AuthResponse);
    }

    // refresh_token 방식
    if (grantType === "REFRESH_TOKEN" && refresh_token && client_id === "inssider-app") {
      return HttpResponse.json({
        message: "토큰 발급에 성공했습니다.",
        data: {
          access_token: mockTokens.access_token,
          token_type: "Bearer",
          expires_in: mockTokens.expires_in,
          refresh_token: mockTokens.refresh_token,
        },
      } as AuthResponse);
    }

    return HttpResponse.json(mockErrors.unauthorized, { status: 401 });
  }),

  // 프로필 조회
  http.get(`${BASE_URL}/api/profiles/:id`, async ({ params, request }) => {
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
          profile_url: user.profileUrl,
          bio: user.bio,
          follower_count: user.follower_count,
          post_count: user.post_count,
          account_visible: user.accountVisible,
          follower_visible: user.followerVisible,
        },
      } as ProfileResponse);
    }

    // 타인 프로필 조회 (공개 계정)
    if (user.accountVisible) {
      return HttpResponse.json({
        message: "조회에 성공했습니다.",
        data: {
          nickname: user.nickname,
          profile_url: user.profileUrl,
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
        profile_url: user.profileUrl,
      },
    } as ProfileResponse);
  }),

  // 이메일 인증 코드 발송
  http.post(`${BASE_URL}/api/auth/email/challenge`, async ({ request }) => {
    const { email } = (await request.json()) as EmailChallengeRequest;

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/email-invalid-request",
          title: "이메일 검증 실패",
          status: 422,
          detail: "유효한 이메일 형식이 아닙니다. 다시 확인해주세요.",
          instance: "/api/auth/email/challenge",
          errors: [
            {
              field: "email",
              code: "REGEX_FAILED",
              message: "이메일 표현식 검증에 실패했습니다.",
            },
          ],
        },
        { status: 422 }
      );
    }

    // 재요청 제한 확인
    const lastRequestTime = emailRateLimitStore.get(email);
    if (lastRequestTime && Date.now() - lastRequestTime < 60000) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/rate-limit-exceeded",
          title: "너무 많은 요청",
          status: 429,
          detail: "최근 1분 내 재요청은 허용되지 않습니다. 잠시 뒤에 다시 시도하세요.",
          instance: "/api/auth/email/challenge",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }

    // 6자리 인증 코드 생성
    const verificationCode = "000000";

    // 인증 코드 저장 (5분 유효)
    emailVerificationStore.set(email, {
      code: verificationCode,
      expiresAt: Date.now() + 300000, // 5분
    });

    // 재요청 제한을 위한 시간 저장
    emailRateLimitStore.set(email, Date.now());

    return HttpResponse.json({
      message: "인증 코드가 이메일로 전송되었습니다.",
      data: {
        email,
        expires_in: 300,
      },
    } as EmailChallengeResponse);
  }),

  // 이메일 인증 코드 확인
  http.post(`${BASE_URL}/api/auth/email/verify`, async ({ request }) => {
    const { email, otp } = (await request.json()) as EmailVerifyRequest;

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/email-invalid-request",
          title: "이메일 검증 실패",
          status: 422,
          detail: "유효한 이메일 형식이 아닙니다. 다시 확인해주세요.",
          instance: "/api/auth/email/verify",
          errors: [
            {
              field: "email",
              code: "REGEX_FAILED",
              message: "이메일 표현식 검증에 실패했습니다.",
            },
          ],
        },
        { status: 422 }
      );
    }
    console.log(otp);
    // Mock 환경에서는 "000000"만 허용
    if (otp !== "000000") {
      return HttpResponse.json(
        {
          type: "https://api.example.com/problems/invalid-request",
          title: "이메일 인증 실패",
          status: 401,
          detail: "인증 정보가 올바르지 않습니다.",
          instance: "/api/auth/email/verify",
        },
        { status: 401 }
      );
    }

    // 인증 성공 시 authorization_code 발급
    const authorizationCode = crypto.randomUUID();

    return HttpResponse.json({
      message: "이메일 인증에 성공했습니다.",
      data: {
        authorization_code: authorizationCode,
        expires_in: 300,
      },
    } as EmailVerifyResponse);
  }),

  // 회원가입
  http.post(`${BASE_URL}/api/accounts`, async ({ request }) => {
    const { register_type, email, password } = (await request.json()) as AccountCreateRequest;

    // Authorization 헤더 확인
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return HttpResponse.json(
        {
          type: "https://api.example.com/problems/invalid-requests",
          title: "인가되지 않은 접근입니다.",
          status: 401,
          detail: "인가 토큰이 제공되지 않았거나, 이미 삭제되어 유효하지 않은 상태입니다.",
          instance: "/api/accounts",
        },
        { status: 401 }
      );
    }

    // 이메일 중복 확인
    const existingUser = db.user.findFirst({
      where: { email: { equals: email } },
    });

    if (existingUser) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/email-already-exists",
          title: "이메일 중복",
          status: 409,
          detail: "해당 이메일은 이미 사용 중입니다.",
          instance: "/api/accounts",
        },
        { status: 409 }
      );
    }

    // 새 사용자 생성
    const newUser = db.user.create({
      email,
      password, // 실제로는 해시화된 비밀번호를 저장해야 합니다
      registerType: register_type,
    });

    return HttpResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        data: {
          email: newUser.email,
        },
      } as AccountCreateResponse,
      { status: 201 }
    );
  }),

  // 회원탈퇴
  http.delete(`${BASE_URL}/api/accounts/me`, async ({ request }) => {
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
  }),

  // 비밀번호 변경
  http.patch(`${BASE_URL}/api/accounts/me/password`, async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.includes(mockTokens.access_token)) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/authentication-failed",
          title: "유효하지 않은 인증 정보",
          status: 401,
          detail: "인증 정보가 누락되었거나 유효하지 않습니다.",
          instance: "/api/accounts/me/password",
        },
        { status: 401 }
      );
    }

    const { password } = (await request.json()) as PasswordChangeRequest;

    // 비밀번호 유효성 검사 (예시: 최소 8자, 영문+숫자+특수문자)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/invalid-format",
          title: "유효하지 않은 암호",
          status: 422,
          detail: "유효하지 않은 암호입니다. 정규식 검증을 통과해야합니다.",
          instance: "/api/accounts/me/password",
        },
        { status: 422 }
      );
    }

    // 실제로는 데이터베이스에서 사용자를 찾아서 비밀번호를 업데이트해야 합니다
    return HttpResponse.json({
      message: "암호가 재설정되었습니다.",
      data: {
        updated_at: new Date().toISOString(),
      },
    } as PasswordChangeResponse);
  }),

  // 프로필 수정
  http.patch(`${BASE_URL}/api/profiles/me`, async ({ request }) => {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader?.includes(mockTokens.access_token)) {
      return HttpResponse.json(
        {
          type: "https://api.inssider.com/problems/authentication-failed",
          title: "유효하지 않은 인증 정보",
          status: 401,
          detail: "인증 정보가 누락되었거나 유효하지 않습니다.",
          instance: "/api/profiles/me",
        },
        { status: 401 }
      );
    }

    const updateData = (await request.json()) as ProfileUpdateRequest;

    // 닉네임 중복 검사 (만약 닉네임이 제공된 경우)
    if (updateData.nickname) {
      const existingUser = mockUsers.find(
        (u) => u.nickname === updateData.nickname && u.id !== "1" // 현재 사용자는 제외
      );
      if (existingUser) {
        return HttpResponse.json(
          {
            type: "https://api.inssider.com/problems/unique-constraint-failed",
            title: "닉네임 중복",
            status: 409,
            detail: "닉네임이 중복되었습니다.",
            instance: "/api/profiles/me",
          },
          { status: 409 }
        );
      }
    }

    // 응답 데이터 구성 (수정된 필드만 반환)
    const responseData: any = {
      updated_at: new Date().toISOString(),
    };

    if (updateData.nickname) {
      responseData.nickname = updateData.nickname;
    }
    if (updateData.introduction !== undefined) {
      responseData.bio = updateData.introduction;
    }
    if (updateData.profile_url) {
      responseData.profileUrl = updateData.profile_url;
    }
    if (updateData.account_visibility !== undefined) {
      responseData.accountVisible = updateData.account_visibility;
    }
    if (updateData.follower_visibility !== undefined) {
      responseData.followerVisible = updateData.follower_visibility;
    }

    return HttpResponse.json({
      message: "프로필이 수정되었습니다.",
      data: responseData,
    } as ProfileUpdateResponse);
  }),
];

export { handlers };
