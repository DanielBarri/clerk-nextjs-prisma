import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    const questions = await prisma.question.findMany({
        orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(questions);
}
