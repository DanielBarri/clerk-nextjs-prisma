import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(req: Request) {
    const { userId: clerkId } = await auth();
    // No necesitas leer el body ni esperar un userId externo
    if (!clerkId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const test = await prisma.test.create({
        data: {
            userId: clerkId,
        },
    });

    return NextResponse.json({ id: test.id });
}

export async function GET() {
    const tests = await prisma.test.findMany({
        include: {
            vocations: {
                include: {
                    vocation: true,
                },
            },
        },
        orderBy: {
            timeFinished: "desc",
        },
    });

    const formattedTests = tests.map((test) => ({
        id: test.id,
        timeFinished: test.timeFinished,
        vocations: test.vocations.map((tv) => ({
            id: tv.vocation.id,
            name: tv.vocation.name,
        })),
    }));

    return NextResponse.json({ tests: formattedTests });
}
