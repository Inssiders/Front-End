import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      grantType: "AUTHORIZATION_CODE" | "PASSWORD" | "REFRESH_TOKEN";
      accessToken: string;
      refreshToken: string;
      exp: number;
      refreshTokenExp?: number; // 리프레시 토큰 만료 시간
      iat: number;
      jti: string;
      iss: string;
      sub: string;
      aud: string;
      nickname: string;
      profileImage: string;
      bio?: string;
      followerCount?: number;
      postCount?: number;
      accountVisible?: boolean;
      followerVisible?: boolean;
      deletedAt?: string;
      error?: string; // 토큰 에러 상태
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
    grantType: "AUTHORIZATION_CODE" | "PASSWORD" | "REFRESH_TOKEN";
    accessToken: string;
    refreshToken: string;
    exp: number;
    refreshTokenExp?: number; // 리프레시 토큰 만료 시간
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    aud: string;
    nickname: string;
    profileImage: string;
    bio?: string;
    followerCount?: number;
    postCount?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
    deletedAt?: string;
    error?: string; // 토큰 에러 상태
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    grantType: "AUTHORIZATION_CODE" | "PASSWORD" | "REFRESH_TOKEN";
    accessToken: string;
    refreshToken: string;
    exp: number;
    refreshTokenExp?: number; // 리프레시 토큰 만료 시간
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    aud: string;
    nickname: string;
    profileImage: string;
    bio?: string;
    followerCount?: number;
    postCount?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
    deletedAt?: string;
    error?: string; // 토큰 에러 상태
  }
}
