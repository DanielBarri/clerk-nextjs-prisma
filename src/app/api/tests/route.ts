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
