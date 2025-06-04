// "use server"
import prisma from "@/lib/prisma";
import TopicPageClient from "@/components/topicPageClient";

interface TopicPageProps {
    searchParams: {
        subtopicId: string;
        [key: string]: string | undefined;
    };
}

export default async function TopicPage({ searchParams }: TopicPageProps) {
    const resolvedParams = await searchParams;
    const subtopicId = resolvedParams.subtopicId;

    if (!subtopicId) {
        return <div>No se proporcionó subtopicId.</div>;
    }

    const subtopic = await prisma.subtopic.findUnique({
        where: { id: subtopicId },
        include: { links: true },
    });

    if (!subtopic) return <div>Subtema no encontrado.</div>;

    return <TopicPageClient subtopic={subtopic} />;
}
