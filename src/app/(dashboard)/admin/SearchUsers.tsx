"use client";

import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div>
            <form
                className="flex flex-col items-center justify-center gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const queryTerm = formData.get("search") as string;
                    router.push(pathname + "?search=" + queryTerm);
                }}>
                <label htmlFor="search" className="font-semibold text-lg">
                    Search for users
                </label>
                <input
                    className="border-1 rounded-md border-gray-300 p-2 w-[300px] focus:outline-none focus:border-blue-500"
                    placeholder="Search by email or name"
                    id="search"
                    name="search"
                    type="text"
                />
                <button
                    className="border-1 bg-blue-500 w-[300px] p-2 rounded-md text-white font-semibold hover:bg-blue-600"
                    type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};
