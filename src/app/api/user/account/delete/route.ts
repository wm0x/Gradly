import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Add these exports to prevent static optimization
export const dynamic = 'force-dynamic'; // Always run at runtime
export const revalidate = 0; // No caching

export async function DELETE(request: Request) {
  try {
    // Build-time mock response
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return NextResponse.json({ message: 'Build-time mock response' }, { status: 200 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}