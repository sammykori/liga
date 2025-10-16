"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { PlayerCard } from "../../PlayerCard";
import { useGroupPlayers } from "@/hooks/useGroupPlayers";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

function Statistics({
    groupId,
    role,
}: {
    groupId: string;
    role: string | null;
}) {
    const { data: players } = useGroupPlayers(groupId);
    console.log(role);
    if (!players) {
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
                    <h1 className="font-bold">0</h1>
                    <h1>Goal</h1>
                    <h1 className="font-bold">0</h1>
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
            <div className="grid grid-cols-1 gap-4">
                {players &&
                    players.slice(0, 6).map((player, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                            }}
                        >
                            <Drawer>
                                <DrawerTrigger
                                    disabled={!role || role === "user"}
                                    className="w-full"
                                >
                                    <PlayerCard
                                        player={player}
                                        variant="simple"
                                    />
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader>
                                        <div className="w-full flex flex-col justify-center items-center gap-2">
                                            <div className="size-28 bg-blue-200"></div>
                                            <div>
                                                <DrawerTitle>
                                                    {player.profiles?.last_name}{" "}
                                                    {
                                                        player.profiles
                                                            ?.first_name
                                                    }
                                                </DrawerTitle>
                                                <DrawerDescription className="text-gray-400 text-xs">
                                                    {player.profiles.first_name}
                                                </DrawerDescription>
                                            </div>
                                        </div>
                                    </DrawerHeader>
                                    {player.role !== "owner" && (
                                        <DrawerFooter>
                                            <Button
                                                variant="outline"
                                                className="rounded-lg border px-4 py-2 items-center flex w-full justify-between"
                                            >
                                                {player.role === "user" ? (
                                                    <h1>Make group admin</h1>
                                                ) : player.role === "admin" ? (
                                                    <h1>Dismiss as admin</h1>
                                                ) : (
                                                    ""
                                                )}
                                                <Icon
                                                    icon="eos-icons:admin-outlined"
                                                    className="size-6"
                                                />
                                            </Button>
                                            <Button className="rounded-lg border px-4 py-2 items-center flex w-full justify-between">
                                                <h1 className="text-red-500">
                                                    Remove from group
                                                </h1>
                                                <Icon
                                                    icon="gg:remove"
                                                    className="size-6 text-red-500"
                                                />
                                            </Button>
                                        </DrawerFooter>
                                    )}
                                </DrawerContent>
                            </Drawer>
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    );
}

export default Statistics;
