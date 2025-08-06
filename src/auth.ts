import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "../data/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Extend the default session types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      username?: string | null;
      createdAt?: string | null;
    };
  }
  interface User {
    username?: string | null;
    createdAt?: string | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 60 * 5 },
  ...authConfig,
  callbacks: {
    async signIn({ user: _user }) {
      return true;
    },    
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.name && session.user) {
        session.user.name = token.name;
      }
      if (token.username && session.user) {
        session.user.username = token.username as string;
      }
      if (token.email && session.user) {
        session.user.email = token.email;
      }
      if (token.createdAt && session.user) {
        session.user.createdAt = token.createdAt as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      return {
        ...token,
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        name: existingUser.name,
        createdAt: existingUser.createdAt.toISOString()
      };
    },
  },
});