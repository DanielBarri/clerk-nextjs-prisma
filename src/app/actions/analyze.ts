// app/actions/analyze.ts
"use server";

import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { OpenAI } from "openai";
import { auth } from "@clerk/nextjs/server";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const subtopicSchema = z.object({
    userId: z.string(),
    name: z.string(),
    description: z.string(),
});

const topicSchema = z.object({
    userId: z.string(),
    name: z.string(),
    description: z.string(),
    subtopics: z.array(subtopicSchema),
});

const planSchema = z.object({
    userId: z.string(),
    description: z.string(),
    topics: z.array(topicSchema),
});

const vocationSchema = z.object({
    userId: z.string(),
    name: z.string(),
    description: z.string(),
    plans: z.array(planSchema),
});

const AnalyzeSchema = z.object({
    profile: z.string(),
    vocations: z.array(vocationSchema),
});

export async function analyzeProfile(testId: string) {
    const test = await prisma.test.findUnique({
        where: { id: testId },
        include: { testQuestions: { include: { question: true } } },
    });

    if (!test || !test.prompt) return notFound();

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
                    content: `Analiza las siguientes respuestas y elabora un perfil psicológico con rasgos de personalidad, intereses dominantes y habilidades. Sugiere 5 vocaciones explicadas:\n\n${test.testQuestions
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
            throw new Error("Respuesta de OpenAI inválida");
        }

        const { profile, vocations } = parsed;

        await prisma.test.update({
            where: { id: testId },
            data: {
                analysis: profile,
                timeFinished: new Date(),
            },
        });

        for (const { name, description } of vocations) {
            let vocation = await prisma.vocation.findUnique({
                where: { name },
            });

            if (!vocation) {
                vocation = await prisma.vocation.create({ data: { name } });
            }

            await prisma.testVocation.create({
                data: {
                    testId,
                    vocationId: vocation.id,
                    profile,
                    justification: description,
                },
            });
        }
    } catch (err) {
        console.error("Error analizando test:", err);
        throw err;
    }
}

export async function generateStudyPlan(vocationId: string) {
    const { userId } = await auth();

    const vocation = await prisma.vocation.findUnique({
        where: { id: vocationId },
        include: {
            plans: {
                include: {
                    topics: {
                        include: {
                            subtopics: true,
                        },
                    },
                },
            },
        },
    });

    if (!vocation) return notFound();

    const existingPlan = await prisma.plan.findFirst({
        where: {
            vocationId,
        },
    });
    if (existingPlan) {
        return existingPlan.id;
    }

    try {
        const response = await openai.responses.parse({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content:
                        "Actúa como un experto en orientación vocacional y planificación de estudios, se claro, detallado y profesional.",
                },
                {
                    role: "user",
                    content: `Genera un plan de estudio profesional detallado para la vocación "${vocation.name}", el plan de estudio debe incluir el nombre de cada tema principal con una breve descripción, nombres de subtemas (los nombres de los subtemas deben ser breves pero suficientemente descriptivos y detallado para que pueda buscar un video de youtube con el.) y una breve descripción de cada subtema.`,
                },
            ],
            text: {
                format: zodTextFormat(planSchema, "study_plan"),
            },
        });

        const parsed = response.output_parsed;

        if (!parsed || !parsed.topics) {
            console.error("Parsed response missing expected fields:", parsed);
            throw new Error("Respuesta de OpenAI inválida");
        }

        await prisma.plan.create({
            data: {
                name: `Plan de estudio para ${vocation.name}`,
                userId: userId,
                description: parsed.description || "",
                vocationId: vocationId,
                topics: {
                    create: parsed.topics.map((topic) => ({
                        userId: userId,
                        name: topic.name,
                        description: topic.description,
                        subtopics: {
                            create:
                                topic.subtopics?.map((sub) => ({
                                    userId: userId,
                                    name: sub.name,
                                    description: sub.description,
                                })) || [],
                        },
                    })),
                },
            },
        });
    } catch (err) {
        console.error("Error generando plan de estudio:", err);
        throw err;
    }
}
