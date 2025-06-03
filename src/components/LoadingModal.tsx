"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import LoadingLottie from "@/components/LoadingLottie";

export function LoadingModal({ show }: { show: boolean }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <LoadingLottie />
        </div>
    );
}

export function SubmitWithModal({ children }: { children: React.ReactNode }) {
    const [show, setShow] = useState(false);
    const { pending } = useFormStatus();

    return (
        <>
            <LoadingModal show={show || pending} />
            <button
                type="submit"
                onClick={() => setShow(true)}
                className="px-6 py-2 bg-gray-100 text-gray-500 rounded hover:bg-gray-200 transition">
                {children}
            </button>
        </>
    );
}
