import { Navigation } from "@/components/Navigation";
import type { Metadata } from "next";
import { BottomNavigation } from "@/components/BottomNavigation";

export const metadata: Metadata = {
    title: "Activity Centres",
    description:
        "Cinolla Activity is a feature rich, all-in-one platform to completely manage activity and outdoor education centres",
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
