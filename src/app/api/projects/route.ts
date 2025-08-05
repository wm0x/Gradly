import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Essential for dynamic data fetching
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Alternative to force-dynamic for some setups

export async function GET() {
  try {
    // Add build-time protection
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json([], { status: 200 });
    }

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

    // Add cache control headers
    const response = NextResponse.json(projects);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}