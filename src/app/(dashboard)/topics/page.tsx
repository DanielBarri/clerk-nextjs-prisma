// "use server"
import prisma from "@/lib/prisma";
import TopicPageClient from "@/components/topicPageClient";

export default async function TopicPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const subtopicId = searchParams.subtopicId;

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
