"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Link {
    id: string;
    title: string;
    thumbnail: string | null;
    videoId: string;
    channelTitle: string;
}

interface Props {
    subtopic: {
        name: string;
        links: Link[];
    };
}

export default function TopicPageClient({ subtopic }: Props) {
    const [selectedVideo, setSelectedVideo] = useState<Link | null>(null);

    return (
        <div className="px-4 py-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
                {subtopic.name}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {subtopic.links.map((link) => (
                    <div
                        key={link.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => setSelectedVideo(link)}>
                        <Image
                            src={link.thumbnail || "/placeholder.png"}
                            alt={link.title}
                            width={400}
                            height={225}
                            className="w-full object-cover"
                        />
                        <div className="p-4">
                            <h2 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                                {link.title}
                            </h2>
                            <p className="text-xs text-gray-500">
                                {link.channelTitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedVideo(null)}>
                        <motion.div
                            className="relative bg-white/10 backdrop-blur-2xl rounded-xl shadow-lg overflow-hidden w-full max-w-6xl aspect-video"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer click dentro del modal
                        >
                            <button
                                className="absolute top-4 right-4 z-10 text-white bg-black/30 hover:bg-black/60 p-2 rounded-full transition"
                                onClick={() => setSelectedVideo(null)}>
                                ✕
                            </button>
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full rounded-xl"></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
