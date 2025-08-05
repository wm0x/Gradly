import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("API called");
    const body = await req.json();
    console.log("Request body:", body);

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

    console.log("Project created:", project);

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Project creation error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
