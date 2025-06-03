"use server";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function fetchTests() {
    const { userId } = await auth();
    try {
        if (!userId) {
            throw new Error("User not authenticated");
        }
        const tests = await prisma.test.findMany({
            where: { userId: userId },
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

        return tests.map((test) => ({
            id: test.id,
            timeFinished: test.timeFinished,
            vocations: test.vocations.map((vocation) => ({
                id: vocation.vocation.id,
                name: vocation.vocation.name,
            })),
        }));
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch test data");
    }
}

export async function fetchPlans() {
    try {
        const plans = await prisma.plan.findMany({
            include: {
                topics: {
                    include: {
                        subtopics: true,
                    },
                },
            },
        });
        return plans.map((plan) => ({
            id: plan.id,
            name: plan.name,
            description: plan.description,
            createdAt: plan.createdAt,
            topics: plan.topics.map((topic) => ({
                id: topic.id,
                name: topic.name,
                subtopics: topic.subtopics.map((subtopic) => ({
                    id: subtopic.id,
                    name: subtopic.name,
                })),
            })),
        }));
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch plan data");
    }
}

export async function fetchTopics() {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                subtopics: true,
            },
            orderBy: {
                name: "asc",
            },
        });
        return topics.map((topic) => ({
            id: topic.id,
            name: topic.name,
            description: topic.description,
            subtopics: topic.subtopics.map((subtopic) => ({
                id: subtopic.id,
                name: subtopic.name,
                description: subtopic.description,
            })),
        }));
    } catch (error) {
        console.error("Database error: ", error);
        throw new Error("Failed to fetch topic data");
    }
}

export async function getQuestions() {
    const questions = await prisma.question.findMany({
        select: {
            id: true,
            questionText: true,
            answerOptions: true,
        },
        orderBy: { id: "asc" },
    });
    return questions;
}

export async function startTest(userId: string) {
    const test = await prisma.test.create({
        data: {
            userId,
        },
    });
    return test.id;
}

export async function startPlan(vocationId: string) {
    const existingPlan = await prisma.plan.findFirst({
        where: {
            vocationId,
        },
    });
    if (existingPlan) {
        return existingPlan.id;
    }
    const plan = await prisma.plan.create({
        data: {
            vocationId,
            name: "New Plan",
        },
    });
    return plan.id;
}

export async function saveAnswers(
    testId: string,
    answers: { questionId: string; userAnswer: string }[]
) {
    await Promise.all(
        answers.map(({ questionId, userAnswer }) =>
            prisma.testQuestion.upsert({
                where: {
                    testId_questionId: { testId, questionId },
                },
                update: {
                    userAnswer,
                },
                create: {
                    testId,
                    questionId,
                    userAnswer,
                },
            })
        )
    );
}

export async function finishTest(testId: string) {
    const time = new Date();
    await prisma.test.update({
        where: { id: testId },
        data: {
            timeFinished: time,
            prompt: "Pendiente de generar prompt",
        },
    });
}
