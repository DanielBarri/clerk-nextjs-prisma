"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const QuizResults = () => {
    const params = useSearchParams();
    const testId = params.get("testId");
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            if (!testId) return;

            const res = await fetch(`/api/tests/${testId}`);
            const data = await res.json();

            if (res.ok) {
                setAnalysis(data.analysis);
            } else {
                setAnalysis("No se pudo cargar el análisis.");
            }

            setLoading(false);
        };

        fetchAnalysis();
    }, [testId]);

    return (
        <div className="p-6 max-w-3xl mx-auto min-h-screen flex flex-col items-center justify-start">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">
                Tu Perfil Vocacional
            </h1>
            {loading ? (
                <p className="text-gray-500">Cargando análisis...</p>
            ) : (
                <p className="text-gray-700 whitespace-pre-line">{analysis}</p>
            )}
        </div>
    );
};

export default QuizResults;
