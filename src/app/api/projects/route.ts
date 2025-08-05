import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
      const projects = await db.project.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              
            }
          }
        }
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
