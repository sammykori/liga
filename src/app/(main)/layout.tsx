import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";
import { BottomNavigation } from "@/components/BottomNavigation";

export const metadata: Metadata = {
    title: "Liga",
    description: "Liga App",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background pb-20 relative">
            <Navigation />

            {children}

            <BottomNavigation />
        </div>
    );
}
