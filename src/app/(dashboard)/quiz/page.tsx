import { getQuestions } from "@/app/lib/data";
import QuizClient from "@/components/Quiz";
import { auth } from "@clerk/nextjs/server";

export default async function QuizPage() {
    const { userId } = await auth();
    const questions = await getQuestions();

    return <QuizClient userId={userId ?? ""} questions={questions} />;
}
