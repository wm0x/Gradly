"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail, getUserByUsername } from "../../../../../data/user";
import { signIn } from "@/auth";

const LoginSchema = z.object({
  identifier: z.string().min(1, "Enter email and username"),
  password: z.string().min(1, "Enter password"),
});

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validated = LoginSchema.safeParse(values);
  if (!validated.success) {
    return { error: "Error in values"};
  }

  const { identifier, password } = validated.data;

  const user =
    (await getUserByUsername(identifier)) || (await getUserByEmail(identifier));

  if (!user) {
    return { error: "Error login" };
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordCorrect) {
    return { error: "Error login"};
  }

  const result = await signIn("credentials", {
    identifier,
    password,
    redirect: false,
    callbackUrl: DEFAULT_LOGIN_REDIRECT,
  });
  if (result?.error) {
    return { error: "Error to try login , again"};
  }

  console.log(user);
  return { success: true, redirectUrl: DEFAULT_LOGIN_REDIRECT };
};
