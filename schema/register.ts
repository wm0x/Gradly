import * as z from "zod";

export const NewUser = z.object({
    name: z.string().min(3 , {message: "your name must be more than 3 character"}),
    username: z.string().min(3 , {message: "your username must be more than 3 character"}),
    email: z.string().email({
        message:"email is not valid"
      }),
    password: z.string().min(8, { message: "password must be more than 8 character" }),

})