"use server";

// Update the import path below if the actual location is different
import { checkRole } from "@/utils/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
    const client = await clerkClient();

    if (!checkRole("admin")) {
        return;
    }

    try {
        await client.users.updateUserMetadata(formData.get("id") as string, {
            publicMetadata: { role: formData.get("role") },
        });
    } catch (err) {
        console.error(err);
        return;
    }
}

export async function removeRole(formData: FormData) {
    const client = await clerkClient();

    try {
        await client.users.updateUserMetadata(formData.get("id") as string, {
            publicMetadata: { role: null },
        });
    } catch (err) {
        console.error(err);
        return;
    }
}
