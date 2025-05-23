"use client";
import { useEffect, useState } from "react";

type QuestionFromDB = {
    id: string;
    questionText: string;
    answerOptions: string[];
};

export default function Quiz({ userId }: { userId: string | null }) {
    const [questions, setQuestions] = useState<QuestionFromDB[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<
        number | null
    >(null);
    const [checked, setChecked] = useState(false);
    const [testId, setTestId] = useState<string | null>(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const res = await fetch("/api/questions");
            const data = await res.json();
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    const startTest = async () => {
        if (!userId) return alert("Usuario no autenticado");

        const res = await fetch("/api/tests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
        });

        if (res.ok) {
            const data = await res.json();
            setTestId(data.id);
            setStarted(true);
        } else {
            alert("No se pudo iniciar el test.");
        }
    };

    const finishQuiz = async () => {
        if (!testId) return;

        const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ testId }),
        });

        if (res.ok) {
            window.location.href = `/quiz/results?testId=${testId}`;
        } else {
            alert("Error generando el análisis del test.");
        }
    };

    const saveAnswer = async (questionId: string, userAnswer: string) => {
        if (!testId) return;
        await fetch("/api/test-question", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ testId, questionId, userAnswer }),
        });
    };

    const onAnswerSelected = async (respuesta: string, idx: number) => {
        if (checked && selectedAnswerIndex === idx) {
            setSelectedAnswerIndex(null);
            setChecked(false);
        } else {
            setSelectedAnswerIndex(idx);
            setChecked(true);
            const questionId = questions[activeQuestion].id;
            await saveAnswer(questionId, respuesta);
        }
    };

    const nextQuestion = () => {
        setSelectedAnswerIndex(null);
        setChecked(false);
        if (activeQuestion < questions.length - 1) {
            setActiveQuestion((prev) => prev + 1);
        } else {
            finishQuiz();
        }
    };

    const prevQuestion = () => {
        if (activeQuestion > 0) {
            setActiveQuestion((prev) => prev - 1);
        }
        setSelectedAnswerIndex(null);
        setChecked(false);
    };

    if (!started) {
        return (
            <div className="flex flex-col items-center justify-start min-h-screen gap-4 p-4 text-center">
                <h1 className="text-2xl font-bold text-blue-600">
                    ¡Bienvenido al test vocacional!
                </h1>
                <p className="text-gray-600 text-lg">
                    Este test te ayudará a descubrir tus vocaciones.{" "}
                </p>
                <button
                    onClick={startTest}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Start Test
                </button>
            </div>
        );
    }

    if (questions.length === 0) {
        return <p className="text-center p-4">Cargando preguntas...</p>;
    }

    const current = questions[activeQuestion];

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
                        onClick={() => onAnswerSelected(respuesta, idx)}
                        className={`cursor-pointer transition-all duration-150 border border-gray-300 w-[300px] sm:w-[400px] p-2 rounded-md items-center justify-center list-none hover:bg-gray-200 hover:text-gray-500 ${
                            selectedAnswerIndex === idx
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
                    disabled={!checked}
                    className={`w-[100px] h-[40px] rounded-md border-1 p-2 absolute right-0 bottom-0 ${
                        checked
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
