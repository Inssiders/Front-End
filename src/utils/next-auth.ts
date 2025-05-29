import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  fetchProfile,
  loginWithPassword,
  refreshAccessToken,
  register,
  requestEmailVerification,
} from "./fetch";

// 타입 확장

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1시간
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        grant_type: { label: "Grant Type", type: "text" },
        is_register: { label: "Is Register", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { email, password, grant_type, is_register } = credentials!;

          let authResponse;

          // 회원가입 처리
          if (is_register === "true") {
            try {
              await register({ email, password, nickname: "" });
              // 회원가입 성공 후 자동 로그인
              authResponse = await loginWithPassword(email, password);
            } catch (error: any) {
              console.error("Registration error:", error);
              throw new Error(error.message || "회원가입에 실패했습니다.");
            }
          } else {
            // 기존 로그인 로직
            if (grant_type === "authorization_code") {
              authResponse = await requestEmailVerification(email);
            } else if (grant_type === "password") {
              authResponse = await loginWithPassword(email, password);
            } else {
              return null;
            }
          }

          if (!authResponse?.data?.token) return null;

          // 이메일 인증의 경우 토큰이 없을 수 있음
          if (
            grant_type === "authorization_code" &&
            !authResponse.data.token.access_token
          ) {
            return {
              id: "0",
              email,
              grantType: "authorization_code",
              accessToken: "",
              refreshToken: "",
              exp: Math.floor(Date.now() / 1000) + 300, // 5분
              iat: Math.floor(Date.now() / 1000),
              jti: "",
              iss: "inssider",
              sub: "0",
              aud: "inssider-app",
              nickname: "",
              profileImage: "",
            };
          }

          // 토큰 정보 저장
          const { access_token, refresh_token, expires_in } =
            authResponse.data.token;
          const accountId = "1"; // JWT의 sub claim에서 추출 필요

          // 프로필 정보 가져오기
          let profileData = {
            nickname: "",
            profileImage: "",
            bio: "",
            followerCount: 0,
            postCount: 0,
            accountVisible: true,
            followerVisible: true,
          };

          try {
            const profileResponse = await fetchProfile(accountId, access_token);
            profileData = {
              nickname: profileResponse.data.nickname,
              profileImage: profileResponse.data.profileUrl,
              bio: profileResponse.data.bio || "",
              followerCount: profileResponse.data.follower_count || 0,
              postCount: profileResponse.data.post_count || 0,
              accountVisible: profileResponse.data.accountVisible ?? true,
              followerVisible: profileResponse.data.followerVisible ?? true,
            };
          } catch (error) {
            console.error("프로필 정보 조회에 실패했습니다:", error);
          }

          return {
            id: accountId,
            email,
            grantType: authResponse.data.grant_type,
            accessToken: access_token,
            refreshToken: refresh_token || "",
            exp: Math.floor(Date.now() / 1000) + expires_in,
            iat: Math.floor(Date.now() / 1000),
            jti: "",
            iss: "inssider",
            sub: accountId,
            aud: "inssider-app",
            ...profileData,
          };
        } catch (error) {
          console.error("로그인에 실패했습니다:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: User }) {
      if (user.deletedAt) {
        return false;
      }
      return !!user;
    },
    session: ({ session, token }: { session: Session; token: JWT }) => {
      return {
        ...session,
        user: {
          ...token,
          id: token.id,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          email: token.email,
          exp: token.exp,
          iat: token.iat,
          jti: token.jti,
          iss: token.iss,
          sub: token.sub,
          aud: token.aud,
          nickname: token.nickname,
          profileImage: token.profileImage,
          bio: token.bio,
          followerCount: token.followerCount,
          postCount: token.postCount,
          accountVisible: token.accountVisible,
          followerVisible: token.followerVisible,
          grantType: token.grantType,
          deletedAt: token.deletedAt,
        },
      };
    },
    jwt: async ({ user, token }: { user: User | null; token: JWT }) => {
      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      // 토큰 만료 체크 및 리프레시
      if (token.exp && token.exp < Math.floor(Date.now() / 1000) + 300) {
        // 만료 5분 전
        try {
          const response = await refreshAccessToken(token.refreshToken);
          const accountId = token.sub;

          // 새로운 토큰으로 프로필 정보 업데이트
          try {
            const profileResponse = await fetchProfile(
              accountId,
              response.data.token.access_token
            );
            return {
              ...token,
              accessToken: response.data.token.access_token,
              refreshToken: response.data.token.refresh_token || "",
              exp:
                Math.floor(Date.now() / 1000) + response.data.token.expires_in,
              nickname: profileResponse.data.nickname,
              profileImage: profileResponse.data.profileUrl,
              bio: profileResponse.data.bio || "",
              followerCount: profileResponse.data.follower_count || 0,
              postCount: profileResponse.data.post_count || 0,
              accountVisible: profileResponse.data.accountVisible ?? true,
              followerVisible: profileResponse.data.followerVisible ?? true,
            };
          } catch (error) {
            console.error("프로필 정보 업데이트에 실패했습니다:", error);
          }

          return {
            ...token,
            accessToken: response.data.token.access_token,
            refreshToken: response.data.token.refresh_token || "",
            exp: Math.floor(Date.now() / 1000) + response.data.token.expires_in,
          };
        } catch (error) {
          console.error("토큰 갱신에 실패했습니다:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
  },
};
