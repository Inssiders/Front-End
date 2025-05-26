import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      grantType: "authorization_code" | "password" | "refresh_token";
      accessToken: string;
      refreshToken: string;
      exp: number;
      iat: number;
      jti: string;
      iss: string;
      sub: string;
      aud: string | string[];
      nickname: string;
      profileImage: string;
      bio?: string;
      followerCount?: number;
      postCount?: number;
      accountVisible?: boolean;
      followerVisible?: boolean;
      deletedAt?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    grantType: "authorization_code" | "password" | "refresh_token";
    accessToken: string;
    refreshToken: string;
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    aud: string | string[];
    nickname: string;
    profileImage: string;
    bio?: string;
    followerCount?: number;
    postCount?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
    deletedAt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    grantType: "authorization_code" | "password" | "refresh_token";
    accessToken: string;
    refreshToken: string;
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    aud: string | string[];
    nickname: string;
    profileImage: string;
    bio?: string;
    followerCount?: number;
    postCount?: number;
    accountVisible?: boolean;
    followerVisible?: boolean;
    deletedAt?: string;
  }
}
