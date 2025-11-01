"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MatchCard } from "../../MatchCard";
import { useRouter } from "next/navigation";
import { useGroupMatches } from "@/hooks/useGroupMatches";

function UpcomingMatches({ groupId }: { groupId: string | undefined }) {
    const { data: matches } = useGroupMatches(groupId);
    const router = useRouter();

    const handleMatchClick = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };

    if (!matches || matches.length < 1) {
        return (
            <div>
                <h1>No matches have been added yet.</h1>
            </div>
        );
    }
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
                {matches.map((match, index) => (
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
