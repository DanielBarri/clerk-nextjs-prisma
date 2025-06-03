import Link from "next/link";
import { fetchTopics } from "@/app/lib/data";

type Subtopic = {
    id: string;
    name: string;
    description: string | null;
};

type Topic = {
    id: string;
    name: string;
    description: string | null;
    createdAt?: string | Date;
    subtopics: Subtopic[];
};

async function TopicsList() {
    const topics: Topic[] = await fetchTopics();

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
                        <Link
                            href={`/topics?topicId=${topic.id}`}
                            key={topic.id}>
                            <div className="bg-white rounded-md shadow p-4 mb-4">
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
                                <div className="flex flex-wrap w-full text-sm text-gray-400 mt-1">
                                    {topic.subtopics.map((subtopic) => (
                                        <span
                                            key={subtopic.id}
                                            className="flex bg-blue-500 text-white font-light text-xs rounded-full px-3 py-1 mr-2 mb-2">
                                            {subtopic.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopicsList;
