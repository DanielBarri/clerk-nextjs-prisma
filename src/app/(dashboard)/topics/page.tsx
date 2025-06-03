import prisma from "@/lib/prisma";

export default async function TopicPage({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const resolvedParams = await searchParams;
    if (!resolvedParams.topicId) {
        return <div>Error: No se proporcionó un ID de tema.</div>;
    }
    const topic = await prisma.topic.findUnique({
        where: { id: resolvedParams.topicId },
        include: { subtopics: { include: { links: true } } },
    });
    if (!topic) {
        return <div>Error: Tema no encontrado.</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">
                Tema: {topic?.name || "Tema no encontrado"}
            </h1>
            <div className="w-full max-w-2xl p-4 bg-white rounded-md shadow-md">
                {topic?.subtopics.map((subtopic) => (
                    <div key={subtopic.id}>
                        <h2 className="">{subtopic.name}</h2>
                        <div className="text-gray-700 mb-4">
                            {subtopic?.links.map((link) => (
                                <div key={link.id} className="mb-2">
                                    {/* Render link details here, e.g.: */}
                                    {link.url ? (
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            {link.url || link.url}
                                        </a>
                                    ) : (
                                        <span>{link.url}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
