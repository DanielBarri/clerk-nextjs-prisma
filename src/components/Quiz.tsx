"use client";
import { useEffect, useState } from "react";

type QuestionFromDB = {
    id: string;
    questionText: string;
    answerOptions: string[];
};

type TempAnswerMap = Record<string, string>;

export default function Quiz({ userId }: { userId: string | null }) {
    const [questions, setQuestions] = useState<QuestionFromDB[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const [testId, setTestId] = useState<string | null>(null);
    const [started, setStarted] = useState(false);
    const [answers, setAnswers] = useState<TempAnswerMap>({});

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

        const payload = {
            testId,
            answers: Object.entries(answers).map(
                ([questionId, userAnswer]) => ({
                    questionId,
                    userAnswer,
                })
            ),
        };

        const saveRes = await fetch("/api/test-question/batch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!saveRes.ok) {
            return alert("Error al guardar respuestas.");
        }

        // Finaliza test y guarda timeFinished y el prompt
        const finishRes = await fetch("/api/tests/finish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ testId }),
        });

        if (finishRes.ok) {
            window.location.href = `/quiz/results?testId=${testId}`;
        } else {
            alert("Error al finalizar el test.");
        }
    };

    const onAnswerSelected = (respuesta: string) => {
        const questionId = questions[activeQuestion].id;
        setAnswers((prev) => ({
            ...prev,
            [questionId]: respuesta,
        }));
    };

    const nextQuestion = () => {
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
