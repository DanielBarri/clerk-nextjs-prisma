import { fetchTopics } from "@/app/lib/data";
import SaveVideoButton from "./saveVideoButton";

type Subtopic = {
    id: string;
    name: string;
    description: string | null;
    position?: number;
    createdAt?: string | Date;
};

type Topic = {
    id: string;
    name: string;
    description: string | null;
    createdAt?: string | Date;
    subtopics: Subtopic[];
};

async function TopicsList() {
    const rawTopics = await fetchTopics();
    const topics: Topic[] = rawTopics.map((topic: Topic) => ({
        ...topic,
        subtopics: topic.subtopics.map((subtopic: Subtopic, idx: number) => ({
            ...subtopic,
            position: idx,
        })),
    }));

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    Planes de estudios creados
                </h1>
                <span className="text-xm text-gray-400">Ver todos</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    {topics.map((topic) => (
                        <div
                            className="bg-white rounded-md shadow p-4 mb-4"
                            key={topic.id}>
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-semibold text-base text-gray-600">
                                    {topic.name}
                                </h2>
                                <span className="text-xs text-gray-400 rounded-full px-3 py-1">
                                    {topic.createdAt
                                        ? new Date(
                                              topic.createdAt
                                          ).toLocaleDateString("es-MX", {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                          })
                                        : "Fecha no disponible"}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                                {topic.subtopics.map((subtopic, idx) => (
                                    <SaveVideoButton
                                        subtopic={{
                                            ...subtopic,
                                            description:
                                                subtopic.description ?? "",
                                            position: idx,
                                        }}
                                        query={subtopic.name}
                                        key={subtopic.id}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopicsList;
