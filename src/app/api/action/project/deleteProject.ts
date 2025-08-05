"use server";

import { db } from "@/lib/db";

export async function deleteProject(id: string) {
  try {
    await db.project.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete project" };
  }
}