import { db } from "@/lib/db"; 
import { startOfDay, startOfYear } from "date-fns";

export async function getProjectStats() {
  const now = new Date();

  const [totalProjects, todayProjects, yearlyProjects, lastProjects] = await Promise.all([
    db.project.count(), 
    db.project.count({
      where: {
        createdAt: {
          gte: startOfDay(now),
        },
      },
    }),
    db.project.count({
      where: {
        createdAt: {
          gte: startOfYear(now),
        },
      },
    }),
    db.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        title: true,
        description: true,
        createdAt: true,
        user: {
            select: {
              id: true,
              name: true,
              username: true,
              
            }
          }
      },
    }),
  ]);

  return {
    totalProjects,
    todayProjects,
    yearlyProjects,
    lastProjects: lastProjects.map((project) => ({
      ...project,
      date: project.createdAt.toISOString().split("T")[0], 
    })),
  };
}



