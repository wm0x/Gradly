"use server";

import { db } from "@/lib/db";
import * as z from "zod";

import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { NewUser } from "../../../../../schema/register";
import { getUserByEmail, getUserByUsername } from "../../../../../data/user";

export const register = async (values: z.infer<typeof NewUser>) => {
  const validated = NewUser.safeParse(values);
  if (!validated.success) {
    return { error: "There is error with data" };
  }

  const { username, email, password, name } = validated.data;

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return { error: "username is found " };
  }

  const existingEmail = await getUserByEmail(email);
  if (existingEmail) {
    return { error: "Email is found"};
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      username,
      email,
      name,
      password_hash: hashedPassword,
    },
  });

  return { success: true, redirectUrl: DEFAULT_LOGIN_REDIRECT };
};
