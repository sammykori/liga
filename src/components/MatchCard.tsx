import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import dayjs from "dayjs";
import relativeTime from "../../node_modules/dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type Match = Database["public"]["Tables"]["matches"]["Row"];
type Teams = Database["public"]["Tables"]["group_teams"]["Row"];
export type MatchTeams = Match & {
    teamA: Pick<Teams, "id" | "name" | "color"> | null;
    teamB: Pick<Teams, "id" | "name" | "color"> | null;
};
interface MatchCardProps {
    match: MatchTeams;
    variant?: "compact" | "hero";
    onClick?: () => void;
}

export function MatchCard({
    match,
    variant = "compact",
    onClick,
}: MatchCardProps) {
    if (variant === "hero") {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="cursor-pointer"
                onClick={onClick}
            >
                <Card className="relative overflow-hidden bg-gray-800 text-primary-foreground shadow-strong">
                    <div className="absolute top-4 right-4">
                        {match.status && (
                            <Button
                                variant="outline"
                                className="bg-white/20 text-white border-white/30"
                            >
                                <Icon
                                    icon="mdi:circle"
                                    className="w-2 h-2 mr-1 text-red-500"
                                />
                                Live
                            </Button>
                        )}
                    </div>

                    <div className="p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold mb-2">
                                {match.venue}
                            </h2>
                            <p className="text-primary-foreground/80">
                                {dayjs(match.match_date).fromNow()}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                                    <Icon
                                        icon="mdi:shield"
                                        className="w-8 h-8"
                                        color={match.teamA?.color}
                                    />
                                </div>
                                <h3 className="font-semibold">
                                    {match.teamA?.name}
                                </h3>
                            </div>

                            <div className="text-center">
                                {match.status === "completed" ? (
                                    <div className="bg-white/20 rounded-lg px-6 py-3">
                                        <span className="text-3xl font-bold">
                                            {match.teamA_score} :{" "}
                                            {match.teamB_score}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="bg-white/20 rounded-lg px-6 py-3">
                                        <span className="text-lg font-semibold">
                                            {match.match_time?.slice(0, -3)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                                    <Icon
                                        icon="mdi:shield"
                                        className="w-8 h-8"
                                        color={match.teamB?.color}
                                    />
                                </div>
                                <h3 className="font-semibold">
                                    {match.teamB?.name}
                                </h3>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
            onClick={onClick}
        >
            <Card className="p-4 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                                <Icon
                                    icon="mdi:shield"
                                    className="w-6 h-6 text-muted-foreground"
                                    color={match.teamA?.color}
                                />
                            </div>
                            <p className="text-xs font-medium text-card-foreground">
                                {match.teamA?.name}
                            </p>
                        </div>

                        <div className="text-center">
                            {match.status === "confirmed" ? (
                                <span className="text-xl font-bold text-card-foreground">
                                    {match.teamA_score} : {match.teamB_score}
                                </span>
                            ) : (
                                <span className="text-sm text-muted-foreground">
                                    {match.match_time?.slice(0, -3)}
                                </span>
                            )}
                        </div>

                        <div className="text-center">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-2">
                                <Icon
                                    icon="mdi:shield"
                                    className="w-6 h-6 text-muted-foreground"
                                    color={match.teamB?.color}
                                />
                            </div>
                            <p className="text-xs font-medium text-card-foreground">
                                {match.teamB?.name}
                            </p>
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                            {dayjs(match.match_date).fromNow()}
                        </p>
                        {match.status === "confirmed" && (
                            <Button className="mt-1">
                                <Icon
                                    icon="mdi:circle"
                                    className="w-2 h-2 mr-1 text-red-500"
                                />
                                Live
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
