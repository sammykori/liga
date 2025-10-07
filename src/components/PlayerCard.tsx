import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";

type GroupMembershipRow =
    Database["public"]["Tables"]["group_memberships"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type PlayerStatsRow = Database["public"]["Tables"]["player_group_stats"]["Row"];

type GroupMembershipWithStats = GroupMembershipRow & {
    profiles: Pick<ProfileRow, "first_name"> | null;
    player_group_stats: Pick<
        PlayerStatsRow,
        "goals" | "assists" | "matches_played" | "rating"
    > | null;
};

interface PlayerCardProps {
    player: GroupMembershipWithStats;
    variant?: "simple" | "compact";
}

export function PlayerCard({ player, variant = "simple" }: PlayerCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "owner":
                return "bg-orange-200 text-success-foreground";
            case "admin":
                return "bg-yello-200 text-accent-foreground";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8) return "bg-success text-success-foreground";
        if (rating >= 6) return "bg-warning text-warning-foreground";
        return "";
    };

    if (variant === "compact") {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="p-4 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                                <Icon
                                    icon="mdi:account"
                                    className="w-6 h-6 text-muted-foreground"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">
                                    {player.profiles?.first_name}
                                </h3>
                                <p
                                    className={`text-sm ${getStatusColor(
                                        player.role
                                    )} px-2`}
                                >
                                    {player.role}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRatingColor(
                                    player.player_group_stats?.rating!
                                )}`}
                            >
                                {player.player_group_stats?.rating}
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="p-4 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                            <Icon
                                icon="mdi:account"
                                className="w-6 h-6 text-muted-foreground"
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-xs text-card-foreground">
                                {player.profiles?.first_name}
                            </h3>
                            <p
                                className={`w-fit text-xs text-center px-2 ${getStatusColor(
                                    player.role
                                )} rounded-full`}
                            >
                                {player.role}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`rounded-full flex items-center justify-center text-sm ${getRatingColor(
                                player.player_group_stats?.rating || 0
                            )}`}
                        >
                            {player.player_group_stats?.rating || 0}
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
