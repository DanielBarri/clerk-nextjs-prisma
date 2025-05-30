"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Test = {
    id: string;
    timeFinished: Date;
    vocations: Vocations[];
};

type Vocations = {
    id: string;
    name: string;
};

const TestsList = () => {
    const [tests, setTests] = useState<Test[]>([]); // ✅ Nuevo estado

    const fetchAllTests = async () => {
        try {
            const res = await fetch("/api/tests");
            const data = await res.json();

            if (!res.ok) {
                throw new Error(
                    data.error || "No se pudieron cargar los tests."
                );
            }

            setTests(data.tests || []);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Error cargando tests:", err.message);
        }
    };

    useEffect(() => {
        fetchAllTests();
    }, []);

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Pruebas realizadas</h1>
                <span className="text-xm text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    {tests.map((test) => (
                        <Link
                            href={`/quiz/results?testId=${test.id}`}
                            key={test.id}>
                            <div className="bg-white rounded-md shadow p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="font-semibold text-base text-gray-600">
                                        Test realizado el:
                                    </h2>
                                    <span className="text-xs text-gray-400 rounded-full px-3 py-1">
                                        {test.timeFinished
                                            ? new Date(
                                                  test.timeFinished
                                              ).toLocaleDateString("es-MX", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : "Fecha no disponible"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap w-full text-sm text-gray-400 mt-1">
                                    {test.vocations.map((vocation) => (
                                        <span
                                            key={vocation.id}
                                            className="flex bg-blue-500 text-white font-light text-xs rounded-full px-3 py-1 mr-2 mb-2">
                                            {vocation.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestsList;
