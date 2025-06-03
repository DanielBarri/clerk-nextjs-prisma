import Link from "next/link";
import { fetchPlans } from "@/app/lib/data";

async function PlansList() {
    const plans = await fetchPlans();

    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                    Planes de estudios creados
                </h1>
                <span className="text-xm text-gray-400">Ver todos</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    {plans.map((plan) => (
                        <Link
                            href={`/plan/plans?planId=${plan.id}`}
                            key={plan.id}>
                            <div className="bg-white rounded-md shadow p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="font-semibold text-base text-gray-600">
                                        Plan de estudios realizado el:
                                    </h2>
                                    <span className="text-xs text-gray-400 rounded-full px-3 py-1">
                                        {plan.createdAt
                                            ? new Date(
                                                  plan.createdAt
                                              ).toLocaleDateString("es-MX", {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              })
                                            : "Fecha no disponible"}
                                    </span>
                                </div>
                                <div className="flex flex-wrap w-full text-sm text-gray-400 mt-1">
                                    {plan.topics.map((topic) => (
                                        <span
                                            key={topic.id}
                                            className="flex bg-blue-500 text-white font-light text-xs rounded-full px-3 py-1 mr-2 mb-2">
                                            {topic.name}
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

export default PlansList;
