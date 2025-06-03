import prisma from "@/lib/prisma";
import Link from "next/link";

interface Props {
    planId?: string;
}

export default async function PlanCreated({ planId }: Props) {
    if (!planId) {
        return (
            <div className="p-4 text-red-600">
                No se proporcionó un ID de plan válido.
            </div>
        );
    }
    const plan = await prisma.plan.findUnique({
        where: { id: planId },
        include: {
            vocation: true,
            topics: {
                include: {
                    subtopics: true,
                },
            },
        },
    });

    return (
        <div className="flex flex-col justify-start items-left bg-white p-4 rounded-md">
            <h1 className="text-lg lg:text-2xl font-bold text-blue-600 mb-4">
                {plan?.name ?? "Plan de estudios creado"}
            </h1>
            <p className="text-gray-700 mb-4">
                {plan?.description ?? "Sin descripción"}
            </p>
            <div className="flex flex-col items-center gap-2 mb-4">
                {plan?.topics.map((topic) => {
                    return (
                        <div key={topic.id} className="mb-4">
                            <h2 className="text-md font-semibold text-gray-800 mb-2">
                                {topic.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {topic.description}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
                                {topic?.subtopics.map((subtopic) => {
                                    return (
                                        <Link
                                            href={`/topics?topicId=${topic.id}`}
                                            key={subtopic.id}
                                            className="flex flex-col gap-2 w-[100%]lg:w-3/10 text-gray-500 border border-gray-200 rounded-md py-2 px-4 m-2 hover:bg-gray-200 transition-colors">
                                            <h3 className="font-bold text-xs">
                                                {subtopic.name}
                                            </h3>
                                            <p className="text-xs font-normal">
                                                {subtopic.description}
                                            </p>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
