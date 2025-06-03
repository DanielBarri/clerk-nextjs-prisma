import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { OpenAI } from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const planSchema = z.object({
    description: z.string(),
    topics: z.array(
        z.object({
            name: z.string(),
            description: z.string(),
            subtopics: z.array(
                z.object({
                    name: z.string(),
                    description: z.string(),
                    links: z.array(
                        z.object({
                            url: z.string(),
                        })
                    ),
                })
            ),
        })
    ),
});

export async function generateStudyPlan(vocationId: string) {
    const { userId } = await auth();
    if (!userId) throw new Error("Usuario no autenticado");

    const vocation = await prisma.vocation.findUnique({
        where: { id: vocationId },
        include: { plans: true },
    });

    if (!vocation) throw new Error("Vocación no encontrada");

    const existingPlan = await prisma.plan.findFirst({
        where: { vocationId },
        select: { id: true },
    });

    if (existingPlan) return existingPlan.id;

    try {
        const response = await openai.responses.parse({
            model: "gpt-4o-mini",
            input: [
                {
                    role: "system",
                    content:
                        "Actúa como un experto en orientación vocacional y planificación de estudios, sé claro, detallado y profesional.",
                },
                {
                    role: "user",
                    content: `Genera un plan de estudio profesional detallado para la vocación "${vocation.name}". El plan debe incluir temas principales con descripción, subtemas (con nombres buscables en YouTube) y breve descripción.`,
                },
            ],
            text: { format: zodTextFormat(planSchema, "study_plan") },
        });

        const result = planSchema.safeParse(response.output_parsed);

        if (!result.success) {
            console.error("Zod validation failed:", result.error);
            throw new Error("Respuesta de OpenAI no válida");
        }

        const parsed = result.data;

        const plan = await prisma.plan.create({
            data: {
                name: `Plan de estudio para ${vocation.name}`,
                description: parsed.description,
                vocationId,
                topics: {
                    create: parsed.topics.map((topic) => ({
                        name: topic.name,
                        description: topic.description,
                        subtopics: {
                            create:
                                topic.subtopics?.map((sub) => ({
                                    name: sub.name,
                                    description: sub.description,
                                    links: {
                                        create:
                                            sub.links?.map((link) => ({
                                                url: link.url,
                                            })) ?? [],
                                    },
                                })) ?? [],
                        },
                    })),
                },
            },
        });

        return plan.id;
    } catch (err) {
        console.error("Error generando plan de estudio:", err);
        throw err;
    }
}
