/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Announcements from "@/components/Announcements";

interface Vocation {
    id: string;
    name: string;
    TestVocation?: {
        profile: string;
        justification: string;
    };
}

const QuizResults = () => {
    const params = useSearchParams();
    const testId = params.get("testId");

    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState<string | null>(null);
    const [vocations, setVocations] = useState<Vocation[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchResults = async () => {
        if (!testId) return;
        setLoading(true);

        try {
            const res = await fetch(`/api/tests/${testId}`);
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "No se pudo cargar el análisis.");
            }

            setProfile(data.profile);
            setVocations(data.vocations || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeClick = async () => {
        if (!testId) return;
        setLoading(true);

        try {
            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ testId }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al analizar el test.");
            }

            await fetchResults();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleCreatePlan = () => {
        // Aquí puedes implementar la lógica para crear un plan de acción
        // o redirigir a otra página si es necesario.
        console.log("Crear plan de acción");
    };

    useEffect(() => {
        if (testId) fetchResults();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [testId]);

    return (
        <div className="h-screen p-4 flex gap-4 flex-col xl:flex-row">
            <div className="h-fit xl:w-2/3 bg-white p-4 rounded-md">
                <h1 className="text-lg lg:text-2xl font-bold text-blue-600 mb-4">
                    Tu Perfil Vocacional
                </h1>

                {loading && <p className="text-gray-500 mb-4">Cargando...</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {!profile && (
                    <button
                        onClick={handleAnalyzeClick}
                        className="mb-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                        Analizar respuestas
                    </button>
                )}

                {profile && (
                    <div className="mb-8 w-full">
                        <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">
                            Perfil psicológico:
                        </h2>
                        <p className="text-sm lg:text-base text-gray-700 whitespace-pre-line">
                            {profile}
                        </p>
                    </div>
                )}

                <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
                    Selecciona una vocación para generar un plan de estudio:
                </h2>

                {vocations.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        {vocations.map((vocation) => (
                            <button
                                onClick={handleCreatePlan}
                                key={vocation.id}
                                className="bg-white rounded-xl shadow p-5 border cursor-pointer">
                                <h3 className="text-base lg:text-lg font-bold text-blue-700">
                                    {vocation.name}
                                </h3>
                                <p className="text-sm lg:text-base text-gray-600 mt-2">
                                    {vocation.TestVocation?.justification ||
                                        "Sin justificación disponible"}
                                </p>
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};

export default QuizResults;
