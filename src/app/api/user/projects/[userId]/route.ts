// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET(
//   request: Request,
//   context: { params: Promise<{ userId: string }> }
// ) {
//   const params = await context.params;  
//   const userId = params.userId;

//   try {
//     const projects = await db.project.findMany({
//       where: { userId },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json(projects);
//   } catch {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
