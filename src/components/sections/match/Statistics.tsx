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

type MatchProps = Database["public"]["Tables"]["matches"]["Row"];

function Statistics({
    matchId,
    matchData,
    role,
}: {
    matchId: string;
    matchData: MatchProps;
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
                    <h1 className="font-bold">{matchData.teamA_score}</h1>
                </div>
                <div className="w-full grid grid-cols-2 gap-2">
                    <div className="w-full h-2 rounded-full bg-gray-300 flex justify-start">
                        <div className="w-1/2 h-full rounded-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200"></div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-gray-300 flex justify-end">
                        <div className="w-2/3 h-full rounded-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-200"></div>
                    </div>
                </div>
            </div>
            <div className="w-full mb-4">
                <h1 className="font-bold">Goal Scorers</h1>
            </div>
            {role !== "user" && (
                <Dialog
                    open={acceptModalOpen}
                    onOpenChange={setAcceptModalOpen}
                >
                    <DialogTrigger asChild>
                        <Button variant="secondary" className="">
                            <Icon icon="mdi:plus" className="size-4" />
                            Add Goal Scorer
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Goal</DialogTitle>
                        </DialogHeader>
                        <AddGoalForm
                            matchId={matchId}
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
