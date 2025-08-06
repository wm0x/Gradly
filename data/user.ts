import { db } from "@/lib/db";

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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching user by ID:", error.message);
      throw new Error(`Database query failed: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching user");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({
      where: { username },
    });
    return user;
  } catch  {
    return null;
  }
};

// ✅ get user by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({
      where: { email },
    });
    return user;
  } catch  {
    return null;
  }
};
