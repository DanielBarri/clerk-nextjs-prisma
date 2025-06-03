import { notFound, redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { analyzeProfile } from "@/app/actions/analyzeProfile";
import { generateStudyPlan } from "@/app/actions/generateStudyPlan";
import { SubmitWithModal } from "@/components/LoadingModal";

interface Props {
    testId?: string;
}

export default async function QuizResults({ testId }: Props) {
    if (!testId) return notFound();

    const test = await prisma.test.findUnique({
        where: { id: testId },
        include: {
            vocations: {
                include: {
                    vocation: true,
                },
            },
        },
    });

    if (!test) return notFound();

    const analysis = test.analysis;
    const vocations = test.vocations.map((tv) => ({
        id: tv.vocation.id,
        name: tv.vocation.name,
        justification: tv.justification,
    }));

    async function analyzeAction() {
        "use server";
        await analyzeProfile(testId!);
        redirect(`/quiz/results?testId=${testId}`);
    }

    async function generatePlanAction(formData: FormData) {
        "use server";
        const vocationId = formData.get("vocationId") as string;
        if (!vocationId) return;

        await generateStudyPlan(vocationId);
        const planId = await prisma.plan.findFirst({
            where: { vocationId },
            select: { id: true },
        });
        redirect(`/plan/plans?planId=${planId?.id}`);
    }

    return (
        <div className="h-fit flex flex-col justify-center items-center bg-white p-4 rounded-md">
            <h1 className="text-lg lg:text-2xl font-bold text-blue-600 mb-4">
                Tu Perfil Vocacional
            </h1>

            {!analysis && (
                <form action={analyzeAction} className="mb-6">
                    <SubmitWithModal>Analizar respuestas</SubmitWithModal>
                </form>
            )}

            {analysis && (
                <div className="mb-8 w-full">
                    <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                        Perfil psicológico:
                    </h2>
                    <p className="text-sm lg:text-base text-gray-700 whitespace-pre-line">
                        {analysis}
                    </p>
                </div>
            )}

            <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
                Selecciona una vocación para generar un plan de estudio:
            </h2>

            {vocations.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {vocations.map((vocation) => (
                        <form key={vocation.id} action={generatePlanAction}>
                            <input
                                type="hidden"
                                name="vocationId"
                                value={vocation.id}
                            />
                            <SubmitWithModal>
                                <div className="text-left">
                                    <h3 className="text-base lg:text-lg font-bold text-blue-700">
                                        {vocation.name}
                                    </h3>
                                    <p className="text-sm lg:text-base text-gray-600 mt-2">
                                        {vocation.justification ||
                                            "Sin justificación disponible"}
                                    </p>
                                </div>
                            </SubmitWithModal>
                        </form>
                    ))}
                </div>
            )}
        </div>
    );
}
