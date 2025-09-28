import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface PlayerCardProps {
    player: {
        id: string;
        name: string;
        position: string;
        team: string;
        rating: number;
        status: "available" | "paid" | "unavailable";
        goals?: number;
        assists?: number;
        avatar?: string;
    };
    variant?: "compact" | "detailed";
}

export function PlayerCard({ player, variant = "detailed" }: PlayerCardProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "bg-success text-success-foreground";
            case "paid":
                return "bg-accent text-accent-foreground";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    const getRatingColor = (rating: number) => {
        if (rating >= 8) return "bg-success text-success-foreground";
        if (rating >= 6) return "bg-warning text-warning-foreground";
        return "bg-destructive text-destructive-foreground";
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
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                                <Icon
                                    icon="mdi:account"
                                    className="w-6 h-6 text-muted-foreground"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-card-foreground">
                                    {player.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {player.team}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button className={getStatusColor(player.status)}>
                                {player.status}
                            </Button>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRatingColor(
                                    player.rating
                                )}`}
                            >
                                {player.rating}
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="p-6 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <Icon
                                icon="mdi:account"
                                className="w-8 h-8 text-muted-foreground"
                            />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-card-foreground">
                                {player.name}
                            </h3>
                            <p className="text-muted-foreground">
                                {player.position}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {player.team}
                            </p>
                        </div>
                    </div>
                    <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRatingColor(
                            player.rating
                        )}`}
                    >
                        {player.rating}
                    </div>
                </div>

                {(player.goals !== undefined ||
                    player.assists !== undefined) && (
                    <div className="flex gap-4 mb-4">
                        {player.goals !== undefined && (
                            <div className="text-center">
                                <p className="text-2xl font-bold text-card-foreground">
                                    {player.goals}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Goals
                                </p>
                            </div>
                        )}
                        {player.assists !== undefined && (
                            <div className="text-center">
                                <p className="text-2xl font-bold text-card-foreground">
                                    {player.assists}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Assists
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <Button
                    size="sm"
                    variant="outline"
                    className={`${getStatusColor(player.status)} w-full`}
                >
                    <Icon icon="mdi:star" className="w-4 h-4 mr-2" />
                    {player.status.charAt(0).toUpperCase() +
                        player.status.slice(1)}
                </Button>
            </Card>
        </motion.div>
    );
}
