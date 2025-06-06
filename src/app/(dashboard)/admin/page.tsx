import { redirect } from "next/navigation";
import { SearchUsers } from "./SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { checkRole } from "@/utils/roles";
import { setRole, removeRole } from "./_actions";

export default async function AdminDashboard({
    searchParams,
}: {
    searchParams: { search?: string };
}) {
    if (!checkRole("admin")) {
        redirect("/");
    }

    const params = await searchParams;
    const query = params.search;

    const client = await clerkClient();

    const users = query ? (await client.users.getUserList({ query })).data : [];

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500">
                This is the protected admin dashboard restricted to users with
                the `admin` role.
            </p>

            <SearchUsers />

            {users.map((user) => {
                return (
                    <div className="flex flex-col gap-2" key={user.id}>
                        <div className="font-semibold text-lg">
                            {user.firstName} {user.lastName}
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <p className="font-semibold">User email: </p>
                            {
                                user.emailAddresses.find(
                                    (email) =>
                                        email.id === user.primaryEmailAddressId
                                )?.emailAddress
                            }
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <p className="font-semibold">User rol: </p>
                            <p className="text-blue-500">
                                {user.publicMetadata.role as string}
                            </p>
                        </div>

                        <form action={setRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="admin" name="role" />
                            <button
                                className="border-1 bg-gray-500 w-[300px] p-2 rounded-md text-white font-semibold hover:bg-gray-600"
                                type="submit">
                                Make Admin
                            </button>
                        </form>

                        <form action={setRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="student" name="role" />
                            <button
                                className="border-1 bg-gray-500 w-[300px] p-2 rounded-md text-white font-semibold hover:bg-gray-600"
                                type="submit">
                                Make Student
                            </button>
                        </form>

                        <form action={setRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="parent" name="role" />
                            <button
                                className="border-1 bg-gray-500 w-[300px] p-2 rounded-md text-white font-semibold hover:bg-gray-600"
                                type="submit">
                                Make Parent
                            </button>
                        </form>

                        <form action={setRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <input type="hidden" value="teacher" name="role" />
                            <button
                                className="border-1 bg-gray-500 w-[300px] p-2 rounded-md text-white font-semibold hover:bg-gray-600"
                                type="submit">
                                Make Teacher
                            </button>
                        </form>

                        <form action={removeRole}>
                            <input type="hidden" value={user.id} name="id" />
                            <button
                                className="border-1 bg-gray-500 w-[300px] p-2 rounded-md text-white font-semibold hover:bg-gray-600"
                                type="submit">
                                Remove Role
                            </button>
                        </form>
                    </div>
                );
            })}
        </div>
    );
}
