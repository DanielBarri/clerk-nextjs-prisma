import { getQuestions } from "@/app/lib/data";
import QuizClient from "@/components/Quiz";
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();

export default async function QuizPage() {
    const questions = await getQuestions();

    return <QuizClient userId={userId ?? ""} questions={questions} />;
}
