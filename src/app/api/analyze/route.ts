import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const vocationSchema = z.object({
    name: z.string(),
    description: z.string(),
});

const AnalyzeSchema = z.object({
    profile: z.string(),
    vocations: z.array(vocationSchema),
});

export async function POST(req: Request) {
    const { testId } = await req.json();

    const test = await prisma.test.findUnique({
        where: { id: testId },
        include: { testQuestions: { include: { question: true } } },
    });

    if (!test || !test.prompt) {
        return NextResponse.json(
            { error: "Test not found or no prompt" },
            { status: 404 }
        );
    }

    try {
        const response = await openai.responses.parse({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content:
                        "Actúa como un experto en psicología infantil y orientación vocacional, se claro, empático y motivador",
                },
                {
                    role: "user",
                    content: `Analiza las siguientes: respuestas del niño o niña y elabora un perfil psicológico detallado con rasgos de personalidad, intereses dominantes y habilidades. Luego, sugiere 5 posibles vocaciones, explicando brevemente cada una. ${test.testQuestions
                        .map(
                            (tq, i) =>
                                `Pregunta ${i + 1}: ${
                                    tq.question.questionText
                                }\nRespuesta: ${tq.userAnswer}`
                        )
                        .join("\n\n")}`,
                },
            ],
            text: {
                format: zodTextFormat(AnalyzeSchema, "analyzed_response"),
            },
        });

        const parsed = response.output_parsed;

        if (!parsed || !parsed.profile || !parsed.vocations) {
            console.error("Parsed response missing expected fields:", parsed);
            return NextResponse.json(
                { error: "OpenAI response did not match expected format." },
                { status: 500 }
            );
        }

        const { profile, vocations } = parsed;

        // Guardar analysis y timeFinished en el Test
        await prisma.test.update({
            where: { id: testId },
            data: {
                analysis: profile,
                timeFinished: new Date(),
            },
        });

        // Procesar y guardar vocaciones y relaciones
        for (const vocationData of vocations) {
            const { name, description } = vocationData;

            let vocation = await prisma.vocation.findUnique({
                where: { name },
            });

            if (!vocation) {
                vocation = await prisma.vocation.create({
                    data: { name },
                });
            }

            await prisma.testVocation.create({
                data: {
                    testId: testId,
                    vocationId: vocation.id,
                    profile: profile,
                    justification: description,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Error analyzing test:", err);
        return NextResponse.json(
            { error: "Failed to parse JSON response from OpenAI." },
            { status: 500 }
        );
    }
}
