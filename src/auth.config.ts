import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail, getUserByUsername } from "../data/user";
import bcrypt from "bcryptjs";
import { loginInSchema } from "../schema/login";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginInSchema.safeParse(credentials);
        
        if (!validatedFields.success) {
          return null;
        }

        const { identifier, password } = validatedFields.data;
        const user = (await getUserByUsername(identifier) || await getUserByEmail(identifier)) ;

        if (!user || !user.password_hash) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (passwordMatch) {
          return {
            id: user.id,
            name: user.name ?? "", 
            email: user.email,
            username: user.username,
            
          };
          
          
        }
        
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;



