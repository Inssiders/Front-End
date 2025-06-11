import { removeAuthTokens, saveAuthTokens } from "@/lib/auth-actions";
import { NextAuthOptions, Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginWithPassword, refreshAccessToken, register, requestEmailVerification } from "./fetch/auth";
import { fetchProfile } from "./fetch/profile";

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
        grantType: { label: "Grant Type", type: "text" },
        is_register: { label: "Is Register", type: "text" },
      },
      async authorize(credentials) {
        try {
          console.log("=== AUTHORIZE FUNCTION START ===");
          console.log("Received credentials:", {
            email: credentials?.email,
            grantType: credentials?.grantType,
            is_register: credentials?.is_register,
            hasPassword: !!credentials?.password,
          });

          const { email, password, grantType, is_register } = credentials!;

          let authResponse;

          // 회원가입 처리
          if (is_register === "true") {
            console.log("Processing registration for:", email);
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
            console.log("Processing login with grantType:", grantType);
            if (grantType === "AUTHORIZATION_CODE") {
              console.log("Using AUTHORIZATION_CODE flow");
              authResponse = await requestEmailVerification(email);
            } else if (grantType === "PASSWORD") {
              console.log("Using PASSWORD flow for email:", email);
              authResponse = await loginWithPassword(email, password);
            } else {
              console.log("Invalid grantType:", grantType);
              return null;
            }
          }

          if (!authResponse?.data?.access_token) {
            console.log("❌ No access_token found in auth response, returning null");
            return null;
          }

          // 이메일 인증의 경우 토큰이 없을 수 있음
          if (grantType === "AUTHORIZATION_CODE" && !authResponse.data.access_token) {
            return {
              id: "0",
              email,
              grantType: "AUTHORIZATION_CODE",
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
          const { access_token, refresh_token, expires_in } = authResponse.data;
          const accountId = "1"; // JWT의 sub claim에서 추출 필요

          // 토큰을 쿠키에 저장
          try {
            await saveAuthTokens(authResponse.data);
          } catch (error) {
            console.error("Failed to save auth tokens to cookies:", error);
          }

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
            const profileResponse = await fetchProfile(accountId);
            profileData = {
              nickname: profileResponse.data.nickname,
              profileImage: profileResponse.data.profile_url,
              bio: profileResponse.data.bio || "",
              followerCount: profileResponse.data.follower_count || 0,
              postCount: profileResponse.data.post_count || 0,
              accountVisible: profileResponse.data.account_visible ?? true,
              followerVisible: profileResponse.data.follower_visible ?? true,
            };
          } catch (error) {
            console.error("프로필 정보 조회에 실패했습니다:", error);
          }

          return {
            id: accountId,
            email,
            grantType: grantType as "AUTHORIZATION_CODE" | "PASSWORD" | "REFRESH_TOKEN",
            accessToken: access_token,
            refreshToken: refresh_token || "",
            exp: Math.floor(Date.now() / 1000) + expires_in,
            refreshTokenExp: Math.floor(Date.now() / 1000) + expires_in * 24, // 리프레시 토큰은 보통 액세스 토큰의 24배 수명
            iat: Math.floor(Date.now() / 1000),
            jti: "",
            iss: "inssider",
            sub: accountId,
            aud: "inssider-app",
            ...profileData,
          };
        } catch (error) {
          console.error("=== AUTHORIZE FUNCTION ERROR ===");
          console.error("Error details:", error);
          console.error("Error type:", typeof error);
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
          refreshTokenExp: token.refreshTokenExp,
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
          error: token.error,
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
      const currentTime = Math.floor(Date.now() / 1000);

      // 리프레시 토큰 만료 체크 (7일 전부터 경고, 1일 전부터 갱신 시도)
      if (token.refreshTokenExp) {
        const refreshExpiresSoon = token.refreshTokenExp < currentTime + 60; // 1분 전
        const refreshExpired = token.refreshTokenExp < currentTime;

        if (refreshExpired) {
          try {
            await removeAuthTokens();
          } catch (error) {
            console.error("Failed to clear auth cookies:", error);
          }

          return { ...token, error: "RefreshTokenExpired" };
        }

        if (refreshExpiresSoon) {
          // 리프레시 토큰이 만료되기 전에 미리 갱신 시도
          try {
            const response = await refreshAccessToken(token.refreshToken);

            // 새로운 토큰을 쿠키에 저장
            try {
              await saveAuthTokens(response.data);
            } catch (error) {
              console.error("Failed to update auth tokens in cookies:", error);
            }

            // 새로운 리프레시 토큰의 만료 시간 계산 (기존 + 연장)
            const newRefreshTokenExp = token.refreshTokenExp + 7 * 24 * 3600; // 7일 연장

            return {
              ...token,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token || token.refreshToken,
              exp: Math.floor(Date.now() / 1000) + response.data.expires_in,
              refreshTokenExp: newRefreshTokenExp, // 리프레시 토큰 수명 연장
            };
          } catch (error) {
            console.error("사전 리프레시 토큰 갱신에 실패했습니다:", error);
            // 실패해도 기존 토큰이 아직 유효하면 계속 진행
          }
        }
      }

      // 토큰이 이미 완전히 만료된 경우 (버퍼 시간 없이)
      if (token.exp && token.exp < currentTime) {
        // 리프레시 토큰으로 갱신 시도
        if (token.refreshToken) {
          try {
            const response = await refreshAccessToken(token.refreshToken);
            const accountId = token.sub;

            // 새로운 토큰을 쿠키에 저장
            try {
              await saveAuthTokens(response.data);
            } catch (error) {
              console.error("Failed to update auth tokens in cookies:", error);
            }

            // 새로운 토큰으로 프로필 정보 업데이트
            try {
              const profileResponse = await fetchProfile(accountId);
              return {
                ...token,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token || "",
                exp: Math.floor(Date.now() / 1000) + response.data.expires_in,
                refreshTokenExp: response.data.refresh_token
                  ? Math.floor(Date.now() / 1000) + response.data.expires_in * 24 // 새 리프레시 토큰 만료 시간
                  : token.refreshTokenExp, // 새 리프레시 토큰이 없으면 기존 유지
                nickname: profileResponse.data.nickname,
                profileImage: profileResponse.data.profile_url,
                bio: profileResponse.data.bio || "",
                followerCount: profileResponse.data.follower_count || 0,
                postCount: profileResponse.data.post_count || 0,
                accountVisible: profileResponse.data.account_visible ?? true,
                followerVisible: profileResponse.data.follower_visible ?? true,
              };
            } catch (error) {
              console.error("프로필 정보 업데이트에 실패했습니다:", error);
              // 프로필 정보 업데이트 실패해도 토큰 갱신은 성공
              return {
                ...token,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token || "",
                exp: Math.floor(Date.now() / 1000) + response.data.expires_in,
                refreshTokenExp: response.data.refresh_token
                  ? Math.floor(Date.now() / 1000) + response.data.expires_in * 24
                  : token.refreshTokenExp,
              };
            }
          } catch (error) {
            console.error("토큰 갱신에 실패했습니다:", error);

            // 리프레시 토큰도 만료되었을 가능성 체크
            if (error instanceof Error && error.message.includes("refresh_token")) {
              // 마지막으로 한 번 더 시도 (리프레시 토큰 갱신)
              try {
                const finalResponse = await refreshAccessToken(token.refreshToken);

                // 새로운 토큰을 쿠키에 저장
                try {
                  await saveAuthTokens(finalResponse.data);
                } catch (cookieError) {
                  console.error("Failed to update auth tokens in cookies:", cookieError);
                }

                return {
                  ...token,
                  accessToken: finalResponse.data.access_token,
                  refreshToken: finalResponse.data.refresh_token || "",
                  exp: Math.floor(Date.now() / 1000) + finalResponse.data.expires_in,
                };
              } catch (finalError) {
                console.error("최종 토큰 갱신도 실패했습니다:", finalError);
              }
            }
            // 쿠키 삭제
            try {
              await removeAuthTokens();
            } catch (error) {
              console.error("Failed to clear auth cookies:", error);
            }

            // NextAuth에게 로그아웃 신호를 보냄
            return { ...token, error: "RefreshAccessTokenError" };
          }
        } else {
          try {
            await removeAuthTokens();
          } catch (error) {
            console.error("Failed to clear auth cookies:", error);
          }

          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      // 토큰 만료 5분 전에 갱신
      if (token.exp && token.exp < currentTime + 300) {
        try {
          const response = await refreshAccessToken(token.refreshToken);
          const accountId = token.sub;

          // 새로운 토큰을 쿠키에 저장
          try {
            await saveAuthTokens(response.data);
          } catch (error) {
            console.error("Failed to update auth tokens in cookies:", error);
          }

          // 새로운 토큰으로 프로필 정보 업데이트
          try {
            const profileResponse = await fetchProfile(accountId);
            return {
              ...token,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token || "",
              exp: Math.floor(Date.now() / 1000) + response.data.expires_in,
              refreshTokenExp: response.data.refresh_token
                ? Math.floor(Date.now() / 1000) + response.data.expires_in * 24 // 새 리프레시 토큰 만료 시간
                : token.refreshTokenExp, // 새 리프레시 토큰이 없으면 기존 유지
              nickname: profileResponse.data.nickname,
              profileImage: profileResponse.data.profile_url,
              bio: profileResponse.data.bio || "",
              followerCount: profileResponse.data.follower_count || 0,
              postCount: profileResponse.data.post_count || 0,
              accountVisible: profileResponse.data.account_visible ?? true,
              followerVisible: profileResponse.data.follower_visible ?? true,
            };
          } catch (error) {
            console.error("프로필 정보 업데이트에 실패했습니다:", error);
          }

          return {
            ...token,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token || "",
            exp: Math.floor(Date.now() / 1000) + response.data.expires_in,
          };
        } catch (error) {
          console.error("토큰 갱신에 실패했습니다:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
  },
  events: {
    // 로그아웃 시 쿠키 삭제
    async signOut() {
      try {
        await removeAuthTokens();
      } catch (error) {
        console.error("Failed to clear auth cookies:", error);
      }
    },
  },
};
