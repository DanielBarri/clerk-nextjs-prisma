import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    req: Request,
    context: { params: { testId: string } }
) {
    const { params } = context;
    const { testId } = await params;

    const test = await prisma.test.findUnique({
        where: { id: testId },
        select: {
            analysis: true,
            vocations: {
                include: {
                    vocation: true,
                },
            },
        },
    });

    if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const profile = test.analysis;

    const vocations = test.vocations.map((tv) => ({
        id: tv.vocation.id,
        name: tv.vocation.name,
        TestVocation: {
            profile: tv.profile,
            justification: tv.justification,
        },
    }));

    return NextResponse.json({ profile, vocations });
}
