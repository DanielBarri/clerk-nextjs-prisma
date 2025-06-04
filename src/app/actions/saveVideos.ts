"use server";

import prisma from "@/lib/prisma";
import { getYouTubeVideos } from "./fetchVideos";

interface SaveVideoOptions {
    subtopicId: string;
    query: string;
}

export async function saveVideos({
    subtopicId,
    query,
}: SaveVideoOptions): Promise<string[]> {
    // 1. Obtener videos existentes para evitar duplicados
    const existingLinks = await prisma.link.findMany({
        where: { subtopicId },
        select: { videoId: true },
    });
    const existingIds = new Set(existingLinks.map((link) => link.videoId));

    // 2. Obtener videos desde YouTube
    const response = await getYouTubeVideos(query);
    const items = response.items ?? [];

    if (items.length === 0) {
        throw new Error("No videos found for the given query.");
    }

    // 3. Filtrar y mapear videos válidos
    const newVideos = items
        .filter((item) => {
            const videoId = item?.id?.videoId;
            const snippet = item?.snippet;
            const thumbnail =
                snippet?.thumbnails?.high?.url ||
                snippet?.thumbnails?.default?.url;

            // Validaciones
            if (!videoId || !snippet || existingIds.has(videoId)) return false;
            if (
                !thumbnail ||
                (!thumbnail.startsWith("https://img.youtube.com") &&
                    !thumbnail.startsWith("https://i.ytimg.com"))
            ) {
                return false;
            }

            return true;
        })
        .map((item) => {
            const snippet = item.snippet;
            return {
                subtopicId,
                videoId: item.id.videoId,
                title: snippet.title,
                thumbnail:
                    snippet.thumbnails.high?.url ??
                    snippet.thumbnails.default.url,
                channelTitle: snippet.channelTitle,
            };
        });

    if (newVideos.length === 0) {
        return [];
    }

    // 4. Guardar todos los nuevos links
    await prisma.link.createMany({
        data: newVideos,
        skipDuplicates: true,
    });

    // 5. Devolver IDs de los links guardados
    const saved = await prisma.link.findMany({
        where: {
            subtopicId,
            videoId: { in: newVideos.map((v) => v.videoId) },
        },
        select: { id: true },
    });

    return saved.map((link) => link.id);
}
