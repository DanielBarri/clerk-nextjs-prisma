// Ejemplo en un componente React en Next.js (Client Component)
"use client";

import { useState } from "react";

export default function CompletionDemo() {
    const [result, setResult] = useState<string>("");

    const getCompletion = async () => {
        const res = await fetch("/api/completion");
        const data = await res.json();
        setResult(data.result?.content || data.error);
    };

    return (
        <div className="p-4">
            <button
                onClick={getCompletion}
                className="bg-blue-600 text-white px-4 py-2 rounded">
                Generate Haiku
            </button>
            <p className="mt-4">{result}</p>
        </div>
    );
}
