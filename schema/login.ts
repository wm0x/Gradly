import * as z from "zod";

export const loginInSchema = z.object({
  identifier: z // in login page we have two way to login with username and with email also for that i make name identify
    .string()
    .min(3, { message: "Enter Username or password" }),
    
  password: z
    .string()
    .min(8, { message: "password must be > 8" }),
});