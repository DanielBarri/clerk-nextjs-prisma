// /app/api/analyze/route.ts
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import prisma from "@/lib/prisma";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    const { testId } = await req.json();

    const test = await prisma.test.findUnique({
        where: { id: testId },
        include: {
            testQuestions: {
                include: { question: true },
                orderBy: { question: { createdAt: "asc" } },
            },
        },
    });

    if (!test) {
        return NextResponse.json({ error: "Test not found" }, { status: 404 });
    }

    const prompt =
        "Actúa como un experto en psicología infantil y orientación vocacional. Analiza mis respuestas:\n\n" +
        test.testQuestions
            .map(
                (tq, i) =>
                    `Pregunta ${i + 1}: ${
                        tq.question.questionText
                    }\nRespuesta: ${tq.userAnswer}`
            )
            .join("\n\n") +
        `\n\nCon base en esto, elabora un perfil psicológico detallado con rasgos de personalidad, intereses dominantes y habilidades. Luego, sugiéreme 5 posibles vocaciones, explicando brevemente cada una. Sé claro, empático y motivador.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
    });

    const analysis = completion.choices[0].message.content;

    await prisma.test.update({
        where: { id: testId },
        data: {
            prompt,
            analysis,
            timeFinished: new Date().toLocaleString("en-US"),
        },
    });

    return NextResponse.json({ success: true });
}
