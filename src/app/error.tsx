"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="w-full h-screen bg-offWhite flex flex-col justify-center items-center">
            <h1 className="text-4xl text-primary-100 font-bold mb-4">
                Player Rating APP
            </h1>
            <h1 className="font-odudo text-2xl text-primary mb-4">
                Something went wrong!
            </h1>
            <button
                className="bg-secondary-60 text-white font-sans rounded-sm px-6 py-2"
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </button>
        </div>
    );
}
