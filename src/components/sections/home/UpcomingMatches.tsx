"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MatchCard } from "../../MatchCard";
import { useRouter } from "next/navigation";

const matches = [
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
        status: "live",
    },
    {
        id: "2",
        teamA: "Team C",
        teamB: "Team D",
        date: "Today",
        time: "08:00 PM",
        venue: "Central Stadium",
        status: "upcoming",
    },
    {
        id: "3",
        teamA: "Team E",
        teamB: "Team F",
        date: "Tomorrow",
        time: "08:00 PM",
        venue: "North Arena",
        status: "upcoming",
    },
];

function UpcomingMatches() {
    const router = useRouter();

    const handleMatchClick = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                    Upcoming Match
                </h3>
                <Button variant="link" size="sm" className="text-primary">
                    See all{" "}
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <div className="space-y-3">
                {matches.slice(1).map((match, index) => (
                    <motion.div
                        key={match.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                        }}
                    >
                        <MatchCard
                            match={match}
                            onClick={() => handleMatchClick(match.id)}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export default UpcomingMatches;
