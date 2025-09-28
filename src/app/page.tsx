"use client";
import { Navigation } from "@/components/Navigation";
import { BottomNavigation } from "@/components/BottomNavigation";
import LiveMatchesCarousel from "@/components/sections/home/LiveMatchesCarousel";
import SelectGroup from "@/components/sections/SelectGroup";
import UpcomingMatches from "@/components/sections/home/UpcomingMatches";
import TopPlayers from "@/components/sections/home/TopPlayers";

const positions = ["GK", "CB"];

export default function Home() {
    return (
        <div className="min-h-screen bg-background pb-20 relative">
            <Navigation />

            <div className="container mx-auto px-4 pt-4 pb-8 space-y-8">
                {/* Group Section */}
                <SelectGroup groups={positions} />

                {/* Live Match Section */}
                <LiveMatchesCarousel />

                {/* Upcoming Matches Section */}
                <UpcomingMatches />

                {/* Top Players Section */}
                <TopPlayers />
            </div>

            <BottomNavigation />
        </div>
    );
}
