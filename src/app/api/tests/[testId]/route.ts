import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    context: { params: { testId: string } }
) {
    const { params } = context;
    const { testId } = await params;

    if (!testId) {
        return NextResponse.json({ error: "Missing testId" }, { status: 400 });
    }

    const test = await prisma.test.findUnique({
        where: { id: testId },
        select: {
            analysis: true,
        },
    });

    if (!test || !test.analysis) {
        return NextResponse.json(
            { error: "Analysis not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ analysis: test.analysis });
}
