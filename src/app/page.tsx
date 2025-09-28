"use client";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { BottomNavigation } from "@/components/BottomNavigation";
import { PlayerCard } from "@/components/PlayerCard";
import { MatchCard } from "@/components/MatchCard";
import { GroupsFilter } from "@/components/GroupsFilter";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LiveMatchesCarousel from "@/components/sections/home/LiveMatchesCarousel";
import SelectGroup from "@/components/sections/SelectGroup";
import UpcomingMatches from "@/components/sections/home/UpcomingMatches";

// Mock data
const mockPlayers = [
    {
        id: "1",
        name: "Kevin De Bruyne",
        position: "CM",
        team: "Team A",
        rating: 9.2,
        status: "available" as const,
        goals: 12,
        assists: 18,
    },
    {
        id: "2",
        name: "Mohammed Salah",
        position: "RW",
        team: "Team B",
        rating: 8.8,
        status: "paid" as const,
        goals: 24,
        assists: 8,
    },
    {
        id: "3",
        name: "Virgil van Dijk",
        position: "CB",
        team: "Team A",
        rating: 8.5,
        status: "available" as const,
        goals: 3,
        assists: 2,
    },
    {
        id: "4",
        name: "Erling Haaland",
        position: "ST",
        team: "Team B",
        rating: 9.0,
        status: "unavailable" as const,
        goals: 31,
        assists: 5,
    },
    {
        id: "5",
        name: "Luka Modric",
        position: "CM",
        team: "Team A",
        rating: 8.3,
        status: "available" as const,
        goals: 5,
        assists: 12,
    },
    {
        id: "6",
        name: "Kylian Mbappe",
        position: "LW",
        team: "Team B",
        rating: 8.9,
        status: "paid" as const,
        goals: 28,
        assists: 11,
    },
];

const mockMatches = [
    {
        id: "1",
        teamA: "Team A",
        teamB: "Team B",
        scoreA: 4,
        scoreB: 2,
        date: "Sunday, 31 Jun",
        time: "15:30",
        venue: "Strouden Park",
        isLive: true,
        status: "live" as const,
    },
    {
        id: "2",
        teamA: "Team C",
        teamB: "Team D",
        date: "Today",
        time: "08:00 PM",
        venue: "Central Stadium",
        status: "upcoming" as const,
    },
    {
        id: "3",
        teamA: "Team E",
        teamB: "Team F",
        date: "Tomorrow",
        time: "08:00 PM",
        venue: "North Arena",
        status: "upcoming" as const,
    },
];

const positions = ["GK", "CB"];

export default function Home() {
    const router = useRouter();
    const handleMatchClick = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };

    const [selectedPosition, setSelectedPosition] = useState<string | null>(
        null
    );

    const filteredPlayers = selectedPosition
        ? mockPlayers.filter((player) => player.position === selectedPosition)
        : mockPlayers;

    return (
        <div className="min-h-screen bg-background pb-20 relative">
            <Navigation />

            <div className="container mx-auto px-4 pt-4 pb-8 space-y-8">
                {/* Group Section */}
                <SelectGroup groups={positions} />

                {/* Live Match Section */}
                <LiveMatchesCarousel matches={mockMatches} />

                {/* Upcoming Matches Section */}
                <UpcomingMatches matches={mockMatches} />

                {/* Top Players Section */}
            </div>

            <BottomNavigation />
        </div>
    );
}
