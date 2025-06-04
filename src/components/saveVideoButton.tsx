// components/SaveVideoButton.tsx
"use client";

import { saveVideos } from "@/app/actions/saveVideos";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SaveVideoButton({
    subtopic,
    query,
}: {
    subtopic: {
        id: string;
        name: string;
        description: string;
        position: number;
    };
    query: string;
}) {
    const router = useRouter();

    const handleClick = async () => {
        try {
            const videoId = await saveVideos({
                subtopicId: subtopic.id,
                query,
            });
            console.log("Video guardado exitosamente:", videoId);
            router.refresh();
        } catch (error) {
            console.error("Error guardando video:", error);
        }
    };

    return (
        <Link
            href={`/topics?subtopicId=${subtopic.id}`}
            onClick={handleClick}
            className="grid border border-gray-300 p-4 rounded-md shadow-sm hover:bg-gray-100 transition-colors text-gray-600">
            <h3 className="font-bold text-sm">{subtopic.name}</h3>
            <p className="text-xs font-normal">{subtopic.description}</p>
        </Link>
    );
}
