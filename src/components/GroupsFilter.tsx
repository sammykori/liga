import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface GroupsFilterProps {
    positions: string[];
}

export function GroupsFilter({ positions }: GroupsFilterProps) {
    return (
        <div className="flex gap-2 overflow-x-auto py-2">
            {positions.map((position) => (
                <motion.div
                    key={position}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        size="sm"
                        className="whitespace-nowrap size-10 rounded-full"
                    >
                        {position}
                    </Button>
                </motion.div>
            ))}
        </div>
    );
}
