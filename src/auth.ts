import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "../data/user";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt", maxAge: 60 * 5 },
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
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
        (session.user as any).username = token.username;
      }
      if (token.email && session.user) {
        session.user.email = token.email;
      }
      if (token.createdAt && session.user) {
        (session.user as any).createdAt = token.createdAt;
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

      token.id = existingUser.id;
      token.username = existingUser.username;
      token.email = existingUser.email;
      token.name = existingUser.name;
      token.createdAt = existingUser.createdAt.toISOString(); // ✅ add this

      return token;
    },
  },
});
