import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { testId, questionId, userAnswer } = body;

        if (!testId || !questionId || !userAnswer) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const saved = await prisma.testQuestion.upsert({
            where: {
                testId_questionId: {
                    testId,
                    questionId,
                },
            },
            update: {
                userAnswer,
            },
            create: {
                testId,
                questionId,
                userAnswer,
            },
        });

        return NextResponse.json(saved);
    } catch (error) {
        console.error("Error saving test answer:", error);
        return NextResponse.json(
            { error: "Failed to save answer" },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const testId = req.nextUrl.searchParams.get("testId");

    if (!testId) {
        return NextResponse.json({ error: "Missing testId" }, { status: 400 });
    }

    try {
        const answers = await prisma.testQuestion.findMany({
            where: { testId },
            select: {
                questionId: true,
                userAnswer: true,
            },
        });

        return NextResponse.json(answers);
    } catch (error) {
        console.error("Error fetching test answers:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
