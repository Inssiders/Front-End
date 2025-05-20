import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken: string;
      refreshToken: string;
      email?: string;
      exp: number;
      iat: number;
      jti: string;
      iss: string;
      sub: string;
      aud: string | string[];
      nickname: string;
      profileImage: string;
      grantType?: "email" | "password" | "refresh_token";
    };
  }
  interface User {
    id: string;
    accessToken: string;
    refreshToken: string;
    email?: string;
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    aud: string | string[];
    nickname: string;
    profileImage: string;
    grantType?: "email" | "password" | "refresh_token";
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    email?: string;
    exp: number;
    iat: number;
    jti: string;
    iss: string;
    sub: string;
    aud: string | string[];
    nickname: string;
    profileImage: string;
    grantType?: "email" | "password" | "refresh_token";
  }
}
