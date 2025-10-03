import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import { getInitials } from "@/lib/helpers";

type Group = Database["public"]["Tables"]["groups"]["Row"];

function SelectGroup({ groups }: { groups: Group[] }) {
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

            <GroupsFilter groups={groups} />
        </motion.section>
    );
}

export default SelectGroup;

function GroupsFilter({ groups }: { groups: Group[] }) {
    return (
        <div className="flex gap-2 overflow-x-auto py-2">
            {groups.map((group, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="w-12 aspect-square border p-1  rounded-full flex justify-center items-center relative">
                        {group.badge && (
                            <Icon
                                icon={group.badge}
                                className="h-full w-full"
                                style={{
                                    color: `${group.background_color}`,
                                }}
                            />
                        )}
                        <h1
                            style={{
                                color: `${group.foreground_color}`,
                            }}
                            className="font-black text-white absolute mx-auto text-xs"
                        >
                            {getInitials(group.name || "FC")}
                        </h1>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
