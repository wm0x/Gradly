import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      createdAt: string | number | Date;
      id: string;
      name: string;
      email: string;
      username: string;

    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    username: string;

  }
}
