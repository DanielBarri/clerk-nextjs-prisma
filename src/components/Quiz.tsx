"use client";

import { useState } from "react";
import { startTest, saveAnswers, finishTest } from "@/app/lib/data";

export default function QuizClient({
    userId,
    questions,
}: {
    userId: string;
    questions: { id: string; questionText: string; answerOptions: string[] }[];
}) {
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [testId, setTestId] = useState<string | null>(null);
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const begin = async () => {
        const id = await startTest(userId);
        setTestId(id);
        setStarted(true);
    };

    const handleFinish = async () => {
        if (!testId) return;
        const formatted = Object.entries(answers).map(
            ([questionId, userAnswer]) => ({
                questionId,
                userAnswer,
            })
        );
        await saveAnswers(testId, formatted);
        await finishTest(testId);
        window.location.href = `/quiz/results?testId=${testId}`;
    };

    // Guarda la respuesta en el estado y en la base de datos
    const onAnswerSelected = async (respuesta: string) => {
        const questionId = questions[activeQuestion].id;
        setAnswers((prev) => ({
            ...prev,
            [questionId]: respuesta,
        }));
        if (testId) {
            await saveAnswers(testId, [{ questionId, userAnswer: respuesta }]);
        }
    };

    const nextQuestion = () => {
        if (activeQuestion < questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            handleFinish();
        }
    };

    const prevQuestion = () => {
        if (activeQuestion > 0) {
            setActiveQuestion((prev) => prev - 1);
        }
    };

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen gap-4 p-4 text-center">
                <h1 className="text-2xl font-bold text-blue-600">
                    ¡Bienvenido al test vocacional!
                </h1>
                <p className="text-gray-600 text-lg">
                    Este test te ayudará a descubrir tus vocaciones.
                </p>
                <button
                    onClick={begin}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Start Test
                </button>
            </div>
        );
    }

    const current = questions[activeQuestion];
    const currentAnswer = answers[current.id];

    return (
        <div className="h-fit flex flex-col gap-2 justify-evenly">
            <h1 className="h-[60px] text-xl font-semibold text-gray-400">
                Quiz
            </h1>
            <h1 className="h-[60px] text-center text-xl font-semibold">
                Pregunta {activeQuestion + 1}
            </h1>
            <div className="h-[350px] flex flex-col justify-baseline items-center gap-2">
                <h2 className="text-center font-semibold">
                    {current.questionText}
                </h2>
                {current.answerOptions.map((respuesta, idx) => (
                    <li
                        key={idx}
                        onClick={() => onAnswerSelected(respuesta)}
                        className={`cursor-pointer transition-all duration-150 border border-gray-300 w-[300px] sm:w-[400px] p-2 rounded-md items-center justify-center list-none hover:bg-gray-200 hover:text-gray-500 ${
                            currentAnswer === respuesta
                                ? "bg-blue-600 text-white"
                                : "text-gray-500"
                        }`}>
                        <span className="font-semibold">{respuesta}</span>
                    </li>
                ))}
            </div>
            <div className="h-[60px] flex flex-row relative">
                <button
                    className={`w-[100px] h-[40px] rounded-md border-1 p-2 border-gray-300 text-gray-500 hover:bg-gray-200 absolute bottom-0 left-0 ${
                        activeQuestion === 0 && "hidden"
                    }`}
                    onClick={prevQuestion}>
                    Regresar
                </button>
                <button
                    onClick={nextQuestion}
                    disabled={!currentAnswer}
                    className={`w-[100px] h-[40px] rounded-md border-1 p-2 absolute right-0 bottom-0 ${
                        currentAnswer
                            ? "border-gray-300 text-gray-500 hover:bg-gray-200"
                            : "text-gray-500 bg-gray-100 cursor-not-allowed"
                    }`}>
                    {activeQuestion === questions.length - 1
                        ? "Finalizar"
                        : "Siguiente"}
                </button>
            </div>
        </div>
    );
}
