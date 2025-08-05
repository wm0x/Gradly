 
import { db } from "@/lib/db";

// there we need to get info about user like his name ex... في هذا الملف هو المرجع لنا عند البحث عن اي مستخدك فالنضام
export const getUserById = async (id: string) => {
  try {
    console.log("Fetching user with ID:", id);

    const user = await db.user.findUnique({

      where: { id },
      select: {
          id: true,
          username: true,
          email: true,
          name: true,
          createdAt: true,
         
      },
    });
    if (!user) {
      console.warn(`User not found with ID: ${id}`);
      return null;
    }

    return user;
  } catch (error: any) {
    console.error("Error fetching user by ID:", error);
    if (error.code) {
      console.error(`Prisma Error Code: ${error.code}`);
    }
    throw new Error(`Database query failed: ${error.message}`);
  }
};
  

// i think there is error must be change it to findUnique but i will do check if i want create user if in db i have same username
export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: { username },
    });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    return user;
  } catch (error) {
    return null; // ✅ لا ترجع سترينق
  }
};


//! must add get permission by user id or username or anything
