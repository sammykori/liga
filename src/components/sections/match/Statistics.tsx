"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import { useMatchGoals } from "@/hooks/useMatchGoals";
import { GoalCard } from "./GoalCard";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import AddGoalForm from "./AddGoalForm";
import { useState } from "react";

type Match = Database["public"]["Tables"]["matches"]["Row"];
type Teams = Database["public"]["Tables"]["group_teams"]["Row"];
type MatchTeams = Match & {
    teamA: Pick<Teams, "id" | "name" | "color"> | null;
    teamB: Pick<Teams, "id" | "name" | "color"> | null;
};

function Statistics({
    matchId,
    matchData,
    role,
}: {
    matchId: string;
    matchData: MatchTeams;
    role: string | null;
}) {
    const { data: goals } = useMatchGoals(matchId);
    const [acceptModalOpen, setAcceptModalOpen] = useState(false);
    console.log(goals);

    if (!goals) {
        return (
            <div>
                <h1>No players have been added yet.</h1>
            </div>
        );
    }

    const goalPercentageA =
        (matchData.teamA_score /
            (matchData.teamA_score + matchData.teamB_score)) *
        100;
    const goalPercentageB =
        (matchData.teamB_score /
            (matchData.teamA_score + matchData.teamB_score)) *
        100;

    function hexToRgba(hex: string, alpha: number) {
        const cleanHex = hex.replace("#", "");
        const r = parseInt(cleanHex.substring(0, 2), 16);
        const g = parseInt(cleanHex.substring(2, 4), 16);
        const b = parseInt(cleanHex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <div className="w-full flex flex-col gap-2 mb-4">
                <div className="text-xs flex justify-between">
                    <h1 className="font-bold">{matchData.teamA_score}</h1>
                    <h1>Goal</h1>
                    <h1 className="font-bold">{matchData.teamB_score}</h1>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className="w-full h-2 rounded-full bg-gray-300 flex justify-start">
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, 
      ${hexToRgba(matchData.teamA?.color || "#FF0000", 0.1)}, 
      ${hexToRgba(matchData.teamA?.color || "#FF0000", 0.8)}, 
      ${hexToRgba(matchData.teamA?.color || "#FF0000", 1)}
    )`,
                                width: `${goalPercentageA}%`,
                            }}
                            className={` h-full rounded-full `}
                        ></div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-300 flex justify-end">
                        <div
                            style={{
                                backgroundImage: `linear-gradient(to right, 
      ${hexToRgba(matchData.teamB?.color || "#FF0000", 1)}, 
      ${hexToRgba(matchData.teamB?.color || "#FF0000", 0.8)}, 
      ${hexToRgba(matchData.teamB?.color || "#FF0000", 0.1)}
    )`,
                                width: `${goalPercentageB}%`,
                            }}
                            className={` h-full rounded-full `}
                        ></div>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4">
                <h1 className="font-bold">Goal Scorers</h1>
            </div>
            {role !== "user" &&
                (matchData.status === "pending" ||
                    matchData.status === "confirmed") && (
                    <Dialog
                        open={acceptModalOpen}
                        onOpenChange={setAcceptModalOpen}
                    >
                        <DialogTrigger asChild>
                            <Button variant="secondary" className="">
                                <Icon icon="mdi:plus" className="size-4" />
                                Add Goal
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Goal</DialogTitle>
                            </DialogHeader>
                            <AddGoalForm
                                matchId={matchId}
                                matchData={matchData}
                                closeModal={setAcceptModalOpen}
                            />
                        </DialogContent>
                    </Dialog>
                )}
            <div className="grid grid-cols-1 gap-4 mt-4">
                {goals &&
                    goals.slice(0, 6).map((goal, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                            }}
                        >
                            <GoalCard goal={goal} />
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    );
}

export default Statistics;
