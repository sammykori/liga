import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { PlayerCard } from "../../PlayerCard";
const players = [
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
function TopPlayers() {
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
                <Button variant="link" size="sm" className="text-primary">
                    View all{" "}
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
