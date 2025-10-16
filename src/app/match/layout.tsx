import type { Metadata } from "next";
import { BottomNavigation } from "@/components/BottomNavigation";

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
        <div className="w-full max-w-sm mx-auto shadow-2xl min-h-screen bg-background pb-20 relative">
            {children}

            <BottomNavigation />
        </div>
    );
}
