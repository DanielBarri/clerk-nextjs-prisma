import { auth } from "@clerk/nextjs/server";

type Roles = "admin" | "student" | "teacher" | "parent"; // Replace with a union type if you have specific roles, e.g., 'admin' | 'user'

export const checkRole = async (role: Roles) => {
    const { sessionClaims } = await auth();
    const metadata = sessionClaims?.metadata as { role?: string } | undefined;
    return metadata?.role === role;
};
