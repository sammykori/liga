"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { PlayerCard } from "../../PlayerCard";
import { useGroupPlayers } from "@/hooks/useGroupPlayers";

function GroupSquadPage({ groupId }: { groupId: string }) {
    const { data: players } = useGroupPlayers(groupId);
    if (!players) {
        return (
            <div>
                <h1>No players have been added yet.</h1>
            </div>
        );
    }
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players &&
                    players.slice(0, 6).map((player, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                            }}
                        >
                            <PlayerCard player={player} variant="simple" />
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    );
}

export default GroupSquadPage;
