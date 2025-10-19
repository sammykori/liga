import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Liga",
    description: "A Player Rating App",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense>
            <div className="w-full md:max-w-sm mx-auto min-h-screen relative">
                {children}
            </div>
        </Suspense>
    );
}
