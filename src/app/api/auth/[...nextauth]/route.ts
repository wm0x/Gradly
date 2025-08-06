// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // Add this line
export const runtime = 'nodejs'; // Optional but recommended

export const { GET, POST } = handlers;