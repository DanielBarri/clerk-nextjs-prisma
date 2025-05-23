import { auth } from "@clerk/nextjs/server";
import Announcements from "@/components/Announcements";
import Quiz from "@/components/Quiz";

const QuizPage = async () => {
    const { userId } = await auth();
    return (
        <div className="h-screen p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="h-fit xl:w-2/3 bg-white p-4 rounded-md">
                <Quiz userId={userId} />
            </div>
            {/* RIGHT */}
            <div className="xl:w-1/3 flex flex-col gap-8">
                <Announcements />
            </div>
        </div>
    );
};

export default QuizPage;
