import { Suspense } from "react";
import PlanCreated from "../plan";

export default async function PlansPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const planId = searchParams.planId;
    return (
        <div className="flex flex-col justify-center items-center">
            <Suspense fallback={<div>Cargando...</div>}>
                <PlanCreated planId={planId} />
            </Suspense>
        </div>
    );
}
