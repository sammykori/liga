"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MatchCard } from "@/components/MatchCard";
import { useGroupMatches } from "@/hooks/useGroupMatches";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function GroupMatchesPage({
    groupId,
    role,
}: {
    groupId: string;
    role: string | null;
}) {
    const { data: matches } = useGroupMatches(groupId);
    const router = useRouter();

    const handleMatchClick = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };
    console.log(role);
    if (!matches || matches.length < 1) {
        return (
            <div>
                <h1>No matches have been added yet.</h1>
            </div>
        );
    }

    function handleCreateNewMatch() {
        Cookies.set("set_group", groupId);
        router.push("/create-new-match");
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            {role !== "user" && (
                <div className="flex items-center justify-start mb-4">
                    <Button
                        variant="default"
                        className="w-full bg-gray-700"
                        onClick={() => handleCreateNewMatch()}
                    >
                        Create new match
                        <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                    </Button>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4">
                {matches &&
                    matches.map((match, index) => (
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

export default GroupMatchesPage;
