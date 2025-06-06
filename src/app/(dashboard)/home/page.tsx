"use client";

const HomePage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col xl:flex-row">
            {/* LEFT */}
            <div className="w-full xl:w-2/3">
                <div className="h-full bg-white p-4 rounded-md">
                    <h1 className="text-xl font-semibold pb-2">
                        Home Placeholder
                    </h1>
                </div>
            </div>

            {/* RIGHT */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8">
                {" "}
                Announcements Placeholder
            </div>
        </div>
    );
};

export default HomePage;
