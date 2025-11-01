import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";

type GoalRow = Database["public"]["Tables"]["goals"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type GoalProp = GoalRow & {
    scorer: Pick<ProfileRow, "username" | "full_name" | "position"> | null;
    assist: Pick<ProfileRow, "username" | "full_name" | "position"> | null;
};

interface GoalCardProps {
    goal: GoalProp;
}

export function GoalCard({ goal }: GoalCardProps) {
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
                                {goal.scorer?.username}
                            </h3>
                            <p
                                className={`w-fit text-xs text-center px-2  rounded-full`}
                            >
                                {goal.scorer?.position}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className={`rounded-full flex items-center justify-center text-sm `}
                        >
                            {goal.minute || 0}&rdquo;
                        </div>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
