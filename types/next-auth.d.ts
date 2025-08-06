import NextAuth from "next-auth";

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
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
    createdAt?: Date | null;
  }
}
