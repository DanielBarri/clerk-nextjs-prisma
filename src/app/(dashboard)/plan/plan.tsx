import prisma from "@/lib/prisma";
import SaveVideoButton from "@/components/saveVideoButton";

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
            <div className="flex flex-col items-center mb-2">
                {plan?.topics.map((topic) => {
                    return (
                        <div key={topic.id} className="mb-6">
                            <h2 className="text-md font-semibold text-gray-800 ">
                                {topic.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {topic.description}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                                {topic?.subtopics.map((subtopic) => {
                                    return (
                                        <div key={subtopic.id} className="">
                                            <SaveVideoButton
                                                subtopic={subtopic}
                                                query={subtopic.name}
                                            />
                                        </div>
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
