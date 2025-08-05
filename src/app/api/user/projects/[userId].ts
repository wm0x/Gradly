import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Essential configuration
export const dynamic = 'force-dynamic'; // Always execute at runtime
export const revalidate = 0; // Ensure no caching
export const runtime = 'nodejs'; // Explicit runtime environment

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  // Build-time mock response
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const { userId } = params;

    const projects = await db.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      // Recommended: Select specific fields for security/performance
      select: {
        id: true,
        title: true,
        createdAt: true,
        status: true,
        // Include other necessary fields
      }
    });

    // Set proper cache headers
    const response = NextResponse.json(projects);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;

  } catch (error) {
    console.error(`Failed to fetch projects for user ${params.userId}:`, error);
    return NextResponse.json(
      { error: "Failed to load projects. Please try again later." },
      { status: 500 }
    );
  }
}