import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = await db.project.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        finalReportUrl: body.pdfUrl,
        coverImageUrl: body.imageUrl,
        userId: body.userId,
      },
    });
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}