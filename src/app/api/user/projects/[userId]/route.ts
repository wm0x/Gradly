import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic'; // Required for dynamic routes
export const runtime = 'nodejs'; // Specify the runtime environment

export async function GET(
  request: Request,
  { params }: { params: { userId: string } } // Correct parameter type
) {
  try {
    // No need to await params - they're automatically resolved in Next.js 15
    const { userId } = params;

    // Optional: Add input validation
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const projects = await db.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      // Recommended to select specific fields for better performance
      select: {
        id: true,
        title: true,
        createdAt: true,
        status: true,
      }
    });

    // Add proper cache headers
    const response = NextResponse.json(projects);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;

  } catch (error) {
    console.error(`Failed to fetch projects for user ${params.userId}:`, error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}