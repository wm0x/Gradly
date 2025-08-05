import { db } from "@/lib/db";


export async function getUserProjects(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Project: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user.Project;
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
}
