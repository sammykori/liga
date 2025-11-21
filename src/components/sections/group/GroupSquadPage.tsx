"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { PlayerCard } from "../../PlayerCard";
import { useGroupPlayers } from "@/hooks/useGroupPlayers";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { positionInitials } from "@/lib/helpers";
import { useUpdateGroupMembership } from "@/hooks/mutations/useUpdateGroupMemebership";
import { GroupMembershipWithStats } from "../../PlayerCard";
import { toast } from "sonner";
import { useState } from "react";

function GroupSquadPage({
    groupId,
    role,
}: {
    groupId: string;
    role: string | null;
}) {
    const [open, setOpen] = useState(false);
    const membershipMutuation = useUpdateGroupMembership();
    const { data: players } = useGroupPlayers(groupId);
    console.log(role);
    if (!players) {
        return (
            <div>
                <h1>No players have been added yet.</h1>
            </div>
        );
    }

    async function handleAdminToggle(player: GroupMembershipWithStats) {
        try {
            await membershipMutuation.mutate({
                id: player.id,
                role: player.role === "admin" ? "user" : "admin",
            });
            toast.success(
                `${player.profiles?.full_name} is now ${
                    player.role === "admin" ? "a user" : "an admin"
                }`
            );
            setOpen(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update group membership role");
        }
    }

    async function handleRemovePlayer(player: GroupMembershipWithStats) {
        try {
            await membershipMutuation.mutate({
                id: player.id,
                removed: true,
                removed_at: new Date().toISOString(),
            });
            toast.success(
                `${player.profiles?.full_name} is now ${
                    player.role === "admin" ? "a user" : "an admin"
                }`
            );
            setOpen(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update group membership role");
        }
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
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
                                            <div className="size-28 rounded-md relative">
                                                <Image
                                                    src={
                                                        player?.profiles
                                                            ?.profile_url ||
                                                        "/images/default-pp.jpeg"
                                                    }
                                                    alt="Player Profile"
                                                    fill
                                                    style={{
                                                        objectFit: "cover",
                                                        objectPosition:
                                                            "center",
                                                    }}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div className="flex items-center justify-center mb-4 gap-2">
                                                <DrawerDescription className="px-2 rounded-md bg-amber-500 font-bold">
                                                    {positionInitials(
                                                        player?.profiles
                                                            ?.position
                                                    )}
                                                </DrawerDescription>
                                                <DrawerTitle className="text-xl font-bold text-foreground">
                                                    {player.profiles
                                                        ?.full_name ||
                                                        "Player Name"}
                                                </DrawerTitle>
                                            </div>
                                        </div>
                                    </DrawerHeader>
                                    {player.role !== "owner" && (
                                        <DrawerFooter>
                                            <Button
                                                variant="outline"
                                                className="rounded-lg border px-4 py-2 items-center flex w-full justify-between"
                                                onClick={() =>
                                                    handleAdminToggle(player)
                                                }
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
                                            <ActionButton
                                                player={player}
                                                action={handleRemovePlayer}
                                            />
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

export default GroupSquadPage;

type ActionButtonProps = {
    player: GroupMembershipWithStats;
    action: (player: GroupMembershipWithStats) => void;
};

function ActionButton({ player, action }: ActionButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="rounded-lg border px-4 py-2 items-center flex w-full justify-between">
                    <h1 className="text-red-500">Remove from group</h1>
                    <Icon icon="gg:remove" className="size-6 text-red-500" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will trigger
                        notifications to your match participants.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => action(player)}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
