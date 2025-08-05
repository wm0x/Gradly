import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Required for dynamic data fetching
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Alternative cache control

export async function GET(
  request: Request,
  { params }: { params: { userId: string } } // Destructure directly
) {
  // Build-time protection
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const projects = await db.project.findMany({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
      // Recommended: Limit returned fields
      select: {
        id: true,
        title: true,
        createdAt: true,
        // Add other necessary fields
      }
    });

    // Add cache control headers
    const response = NextResponse.json(projects);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;

  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: "Failed to load projects" }, // More user-friendly message
      { status: 500 }
    );
  }
}