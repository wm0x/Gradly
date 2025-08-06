"use server";

import { db } from "@/lib/db";

export async function deleteProject(id: string) {
  try {
    await db.project.delete({ where: { id } });
    return { success: true };
  } catch  {
    return { error: "Failed to delete project" };
  }  
}