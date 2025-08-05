import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(request: NextRequest) {
  // يجب استخراج الـ id من الـ URL يدوياً
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  try {
    await db.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
