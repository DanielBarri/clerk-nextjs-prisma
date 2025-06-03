import { Suspense } from "react";

export default async function TopicPage({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const resolvedParams = await searchParams;
    return (
        <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<div>Cargando...</div>}>
                <h1 className="text-2xl font-bold mb-4">
                    Tema: {resolvedParams.topicId}
                </h1>
                <p className="text-lg">
                    Aquí se mostrarán los detalles del tema con ID:{" "}
                    {resolvedParams.topicId}
                </p>
            </Suspense>
        </div>
    );
}
