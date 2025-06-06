import QuizResults from "./results";
import { Suspense } from "react";

export default async function ResultsPage(props: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const searchParams = await props.searchParams;
    const resolvedParams = searchParams.testId;

    return (
        <div className="flex flex-col items-center justify-center">
            <Suspense fallback={<div>Cargando...</div>}>
                <QuizResults testId={resolvedParams} />
            </Suspense>
        </div>
    );
}
