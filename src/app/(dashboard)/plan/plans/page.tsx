import { Suspense } from "react";
import PlanCreated from "../plan";

export default async function PlansPage({
    searchParams,
}: {
    searchParams: { [key: string]: string };
}) {
    const resolvedParams = await searchParams;
    return (
        <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<div>Cargando...</div>}>
                <PlanCreated planId={resolvedParams.planId} />
            </Suspense>
        </div>
    );
}
