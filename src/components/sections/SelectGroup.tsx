import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { GroupsFilter } from "../GroupsFilter";

function SelectGroup({ groups }: { groups: string[] }) {
    const [selectedPosition, setSelectedPosition] = useState<string | null>(
        null
    );
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">
                    Group: Baller FC
                </h3>
                <Button
                    variant="link"
                    size="sm"
                    className="text-xs text-primary font-semibold"
                >
                    Explore all{" "}
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <GroupsFilter positions={groups} />
        </motion.section>
    );
}

export default SelectGroup;
