import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  loginWithPassword,
  refreshAccessToken,
  requestEmailVerification,
} from "./fetch";

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
      },
      async authorize(credentials) {
        try {
          const { email, password, grant_type } = credentials!;

          let authResponse;
          if (grant_type === "email") {
            authResponse = await requestEmailVerification(email);
          } else if (grant_type === "password") {
            authResponse = await loginWithPassword(email, password);
          } else {
            return null;
          }

          if (!authResponse?.data) return null;

          // 이메일 인증의 경우 토큰이 없을 수 있음
          if (grant_type === "email" && !authResponse.data.access_token) {
            return {
              id: "0",
              email,
              grantType: "email",
              accessToken: "",
              refreshToken: "",
              exp: Math.floor(Date.now() / 1000) + 300, // 5분
              iat: Math.floor(Date.now() / 1000),
              jti: "",
              iss: "inssider",
              sub: "0",
              aud: "inssider",
              nickname: "",
              profileImage: "",
            };
          }

          // 비밀번호 로그인의 경우
          return {
            id: "1", // API 응답에서 받아와야 함
            email,
            grantType: grant_type,
            accessToken: authResponse.data.access_token!,
            refreshToken: authResponse.data.refresh_token!,
            exp:
              Math.floor(Date.now() / 1000) +
              (authResponse.data.expires_in || 3600),
            iat: Math.floor(Date.now() / 1000),
            jti: "", // API 응답에서 받아와야 함
            iss: "inssider",
            sub: "1",
            aud: "inssider",
            nickname: "", // API 응답에서 받아와야 함
            profileImage: "", // API 응답에서 받아와야 함
          };
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return !!user;
    },
    session: ({ session, token }) => {
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
          grantType: token.grantType,
        },
      };
    },
    jwt: async ({ user, token }) => {
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
          return {
            ...token,
            accessToken: response.data.access_token!,
            refreshToken: response.data.refresh_token!,
            exp:
              Math.floor(Date.now() / 1000) +
              (response.data.expires_in || 3600),
          };
        } catch (error) {
          console.error("Token refresh error:", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }

      return token;
    },
  },
};
