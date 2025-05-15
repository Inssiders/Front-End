import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const mockUsers = [
  {
    id: "1",
    email: "test1@example.com",
    password: "password1",
    name: "테스트유저1",
    role: "user",
  },
  {
    id: "2",
    email: "test2@example.com",
    password: "password2",
    name: "테스트유저2",
    role: "admin",
  },
];

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
    signOut: "/",
    error: "/error",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 60 * 60, // 1시간
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (!user) return null;
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
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
          ...session.user,
          id: token.sub,
          role: token.role,
        },
      };
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
  },
};
