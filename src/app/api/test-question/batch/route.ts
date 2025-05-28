import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const { testId, answers } = body;

    try {
        await Promise.all(
            answers.map((ans: { questionId: string; userAnswer: string }) =>
                prisma.testQuestion.upsert({
                    where: {
                        testId_questionId: {
                            testId,
                            questionId: ans.questionId,
                        },
                    },
                    update: {
                        userAnswer: ans.userAnswer,
                    },
                    create: {
                        testId,
                        questionId: ans.questionId,
                        userAnswer: ans.userAnswer,
                    },
                })
            )
        );
        return Response.json({ message: "Respuestas guardadas" });
    } catch (error) {
        console.error("Error guardando respuestas", error);
        return Response.json(
            { error: "Error guardando respuestas" },
            { status: 500 }
        );
    }
}
