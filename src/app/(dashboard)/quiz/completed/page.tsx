// app/(dashboard)/quiz/completed/page.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const QuizCompleted = () => {
    const router = useRouter();
    const params = useSearchParams();
    const testId = params.get("testId");

    useEffect(() => {
        if (!testId) {
            router.push("/quiz");
        }
    }, [testId, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 text-center">
            <h1 className="text-2xl font-bold text-blue-600">¡Felicidades!</h1>
            <p className="text-gray-600 text-lg">
                Has completado tu test vocacional.
            </p>
            <button
                onClick={() => router.push(`/quiz/results?testId=${testId}`)}
                className="bg-blue-600 text-white hover:bg-blue-700">
                Descubre tus vocaciones
            </button>
        </div>
    );
};

export default QuizCompleted;
