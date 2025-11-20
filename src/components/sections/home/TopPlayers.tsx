"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { PlayerCard } from "../../PlayerCard";
import { useGroupPlayers } from "@/hooks/useGroupPlayers";
import Link from "next/link";

function TopPlayers({ groupId }: { groupId: string | undefined }) {
    const { data: players } = useGroupPlayers(groupId!);
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
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                    Top Players
                </h3>

                <Link
                    href="/leaderboard"
                    className={"text-primary flex items-center"}
                >
                    View all
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {players.slice(0, 6).map((player, index) => (
                    <motion.div
                        key={player.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.3,
                            delay: index * 0.1,
                        }}
                    >
                        <PlayerCard player={player} variant="compact" />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
}

export default TopPlayers;
