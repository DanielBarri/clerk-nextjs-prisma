"use server";

import prisma from "@/lib/prisma";
import { OpenAI } from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const AnalyzeSchema = z.object({
    profile: z.string(),
    vocations: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
        })
    ),
});

export async function analyzeProfile(testId: string) {
    const test = await prisma.test.findUnique({
        where: { id: testId },
        include: { testQuestions: { include: { question: true } } },
    });

    if (!test || !test.prompt)
        throw new Error("Test no encontrado o sin prompt");

    const formattedAnswers = test.testQuestions
        .map(
            (tq, i) =>
                `Pregunta ${i + 1}: ${tq.question.questionText}\nRespuesta: ${
                    tq.userAnswer
                }`
        )
        .join("\n\n");

    try {
        const response = await openai.responses.parse({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content:
                        "Actúa como un experto en psicología infantil y orientación vocacional, sé claro, empático y motivador.",
                },
                {
                    role: "user",
                    content: `Analiza las siguientes respuestas y elabora un perfil psicológico con rasgos de personalidad, intereses dominantes y habilidades. Sugiere 5 vocaciones explicadas:\n\n${formattedAnswers}`,
                },
            ],
            text: { format: zodTextFormat(AnalyzeSchema, "analyzed_response") },
        });

        const result = AnalyzeSchema.safeParse(response.output_parsed);

        if (!result.success) {
            console.error("Zod validation failed:", result.error);
            throw new Error("Respuesta de OpenAI no válida");
        }

        const { profile, vocations } = result.data;

        await prisma.test.update({
            where: { id: testId },
            data: {
                analysis: profile,
                timeFinished: new Date(),
            },
        });

        // Obtener vocaciones existentes de una sola vez
        const existingVocations = await prisma.vocation.findMany({
            where: {
                name: {
                    in: vocations.map((v) => v.name),
                },
            },
        });

        const existingMap = new Map(
            existingVocations.map((v) => [v.name, v.id])
        );

        for (const vocation of vocations) {
            let vocationId = existingMap.get(vocation.name);

            if (!vocationId) {
                const created = await prisma.vocation.create({
                    data: { name: vocation.name },
                });
                vocationId = created.id;
            }

            await prisma.testVocation.create({
                data: {
                    testId,
                    vocationId,
                    profile,
                    justification: vocation.description,
                },
            });
        }
    } catch (err) {
        console.error("Error analizando test:", err);
        throw err;
    }
}
