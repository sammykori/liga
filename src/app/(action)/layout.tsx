import { Navigation } from "@/components/Navigation";
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
        <div className="min-h-screen bg-background pb-20 relative">
            <Navigation variant="action" />

            {children}

            <BottomNavigation />
        </div>
    );
}
