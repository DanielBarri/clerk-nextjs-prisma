import { Webhook } from "svix";
import { WebhookEvent, clerkClient } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const secret = process.env.SIGNING_SECRET;
    if (!secret) {
        console.error("Missing SIGNING_SECRET env variable");
        return new Response("Missing secret", { status: 500 });
    }

    const wh = new Webhook(secret);
    let event: WebhookEvent;

    try {
        const body = await req.text();
        const headerPayload = await headers();

        event = wh.verify(body, {
            "svix-id": headerPayload.get("svix-id")!,
            "svix-timestamp": headerPayload.get("svix-timestamp")!,
            "svix-signature": headerPayload.get("svix-signature")!,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed", err);
        return new Response("Invalid signature", { status: 400 });
    }

    if (event.type === "user.created") {
        const { id, email_addresses, first_name, last_name } = event.data;
        const email = email_addresses?.[0]?.email_address;
        const client = await clerkClient();

        if (!email) {
            console.error("Missing email in Clerk payload");
            return new Response("Invalid user data", { status: 400 });
        }

        try {
            await prisma.user.upsert({
                where: { clerkId: id },
                update: {},
                create: {
                    clerkId: id,
                    email,
                    name: [first_name, last_name].filter(Boolean).join(" "),
                    role: "student", // Default role
                },
            });
        } catch (err) {
            console.error("Database error during user creation", err);
            return new Response("Database error", { status: 500 });
        }

        try {
            await client.users.updateUser(id, {
                publicMetadata: { role: "student" },
            });
        } catch (err) {
            console.error("Failed to update publicMetadata", err);
            return new Response("Failed to update metadata", { status: 500 });
        }
    }

    // Set default role to "student" for new users

    return new Response("OK", { status: 200 });
}
