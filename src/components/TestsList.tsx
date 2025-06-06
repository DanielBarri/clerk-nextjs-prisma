import Link from "next/link";
import { fetchTests } from "@/app/lib/data";

async function TestsList() {
    const tests = await fetchTests();

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Pruebas realizadas</h1>
                <span className="text-xm text-gray-400">Ver todas</span>
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
}

export default TestsList;
