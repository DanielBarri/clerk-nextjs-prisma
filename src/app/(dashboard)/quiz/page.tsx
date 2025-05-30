import { auth } from "@clerk/nextjs/server";
import Quiz from "@/components/Quiz";
import TestsList from "@/components/TestsList";

const { userId } = await auth();

const QuizPage = () => {
    return (
        <div className="h-screen p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="h-fit xl:w-2/3 bg-white p-4 rounded-md">
                <Quiz userId={userId} />
            </div>
            {/* RIGHT */}
            <div className="xl:w-1/3 flex flex-col gap-8">
                <TestsList />
            </div>
        </div>
    );
};

export default QuizPage;
