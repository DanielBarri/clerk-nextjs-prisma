import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    const { testId } = body;
    if (!testId) {
        return Response.json({ error: "Falta testId" }, { status: 400 });
    }

    try {
        const test = await prisma.test.findUnique({
            where: { id: testId },
            include: {
                testQuestions: {
                    include: {
                        question: true,
                    },
                },
            },
        });

        if (!test) {
            return Response.json(
                { error: "Test no encontrado" },
                { status: 404 }
            );
        }

        const prompt =
            `Actúa como un experto en psicología infantil y orientación vocacional. Analiza las siguientes respuestas de un niño o niña y devuelve el resultado exclusivamente en formato JSON, con las siguientes claves:

                {
                "profile": "Perfil psicológico con rasgos de personalidad, intereses e inclinaciones dominantes.",
                "vocations": [
                    {
                    "name": "Nombre de la vocación sugerida",
                    "description": "Justificación clara y motivadora de por qué esta vocación es adecuada"
                    },
                    {
                    "name": "Nombre de otra vocación",
                    "description": "Justificación clara y motivadora"
                    },
                    ...
                ]
                }

                Evita cualquier texto fuera del JSON. Este es el análisis:\n\n` +
            test.testQuestions
                .map(
                    (tq, i) =>
                        `Pregunta ${i + 1}: ${
                            tq.question.questionText
                        }\nRespuesta: ${tq.userAnswer}`
                )
                .join("\n\n");

        await prisma.test.update({
            where: { id: testId },
            data: {
                timeFinished: new Date(),
                prompt,
            },
        });

        return Response.json({ success: true });
    } catch (error) {
        console.error("Error al finalizar test:", error);
        return Response.json(
            { error: "Error interno al finalizar test" },
            { status: 500 }
        );
    }
}
