import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  // Build-time protection
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const projects = await db.project.findMany({
      where: { userId: params.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        createdAt: true,
        status: true,
      }
    });

    const response = NextResponse.json(projects);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    return response;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return NextResponse.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}