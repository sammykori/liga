import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Liga",
    description: "Liga App",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Suspense>{children}</Suspense>;
}
