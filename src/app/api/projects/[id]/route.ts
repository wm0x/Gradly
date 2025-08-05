import { NextResponse } from "next/server";
import { db } from "@/lib/db";



export async function DELETE(
  _req: Request,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;

    await db.project.delete({ where: { id } });

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
