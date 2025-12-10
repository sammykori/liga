"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { positionInitials } from "@/lib/helpers";
import Image from "next/image";
import { Database } from "@/types/database";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import AcceptResponseForm from "./AcceptResponseForm";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUpdateMatchResponse } from "@/hooks/mutations/useUpdateMatchResponse";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Icon } from "@iconify/react";
type GroupResponsesRow = Database["public"]["Tables"]["match_responses"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type GroupMembershipWithStats = GroupResponsesRow & {
    profiles: Pick<
        ProfileRow,
        "username" | "full_name" | "position" | "profile_url"
    > | null;
};
type Teams = Database["public"]["Tables"]["group_teams"]["Row"];
type TeamData = Pick<Teams, "id" | "name" | "color"> | null;
type MatchStatus = Database["public"]["Enums"]["match_status"];

interface ParticipantCardProps {
    playerResponse: GroupMembershipWithStats;
    role: string | null;
    teamA?: TeamData;
    teamB?: TeamData;
    status?: MatchStatus;
    list?: "A" | "B" | "All";
    matchId: string;
}

export function ParticipantCard({
    role,
    playerResponse,
    teamA,
    teamB,
    status,
    list,
    matchId,
}: ParticipantCardProps) {
    const updateMatchResponseMutation = useUpdateMatchResponse();
    const [open, setOpen] = useState(false);
    const [acceptModalOpen, setAcceptModalOpen] = useState(false);

    const { data: user, isLoading: isUserLoading } = useAuthUser();

    async function selectTeam(
        team: TeamData | undefined,
        action: "join" | "remove"
    ) {
        if (!playerResponse || !team) return;
        try {
            await updateMatchResponseMutation.mutateAsync({
                id: playerResponse?.id,
                team_id: action === "join" ? team.id : null,
            });
            toast.success("Player selected Sucessfully");
            setOpen(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update match");
        }
    }

    if (
        !role ||
        role === "user" ||
        status === "ended" ||
        status === "cancelled" ||
        status === "completed"
    ) {
        return (
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <Card className="p-2 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-12 relative">
                                <Image
                                    src={
                                        playerResponse?.profiles?.profile_url ||
                                        "/images/default-pp.jpeg"
                                    }
                                    alt="Player Profile"
                                    fill
                                    style={{
                                        objectFit: "cover",
                                        objectPosition: "center",
                                    }}
                                    className="rounded-full"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="px-1 rounded-sm bg-amber-500 text-xs font-bold">
                                        {positionInitials(
                                            playerResponse?.profiles?.position
                                        )}
                                    </div>
                                    <h2 className="text-xs font-bold text-foreground">
                                        {playerResponse?.profiles?.full_name ||
                                            "Player Name"}
                                    </h2>
                                </div>
                                <div className="flex items-center gap-2">
                                    {playerResponse.availability && (
                                        <p
                                            onClick={() =>
                                                setAcceptModalOpen(true)
                                            }
                                            className={`text-[10px] font-semibold px-2 py-0.5 bg-green-100 border text-green-600 border-green-400 rounded-sm`}
                                        >
                                            available
                                        </p>
                                    )}
                                    {playerResponse.payment_made && (
                                        <p
                                            onClick={() =>
                                                setAcceptModalOpen(true)
                                            }
                                            className={`text-[10px] font-semibold px-2 py-0.5 text-amber-600 border bg-amber-100 border-amber-400 rounded-sm`}
                                        >
                                            paid
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {user?.id === playerResponse.user_id && (
                            <Dialog
                                open={acceptModalOpen}
                                onOpenChange={setAcceptModalOpen}
                            >
                                <DialogTrigger>
                                    <Button
                                        variant="secondary"
                                        className=""
                                        onClick={() => console.log("Trigger")}
                                    >
                                        <Icon icon="nimbus:ellipsis" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Edit Match Acceptance
                                        </DialogTitle>
                                    </DialogHeader>
                                    <AcceptResponseForm
                                        data={playerResponse!}
                                        closeModal={setAcceptModalOpen}
                                    />
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                </Card>
            </motion.div>
        );
    }
    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger className="w-full">
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Card className="p-2 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 relative">
                                        <Image
                                            src={
                                                playerResponse?.profiles
                                                    ?.profile_url ||
                                                "/images/default-pp.jpeg"
                                            }
                                            alt="Player Profile"
                                            fill
                                            style={{
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <div className="px-1 rounded-sm bg-amber-500 text-xs font-bold">
                                                {positionInitials(
                                                    playerResponse?.profiles
                                                        ?.position
                                                )}
                                            </div>
                                            <h2 className="text-xs font-bold text-foreground">
                                                {playerResponse?.profiles
                                                    ?.full_name ||
                                                    "Player Name"}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {playerResponse.availability && (
                                                <p
                                                    onClick={() =>
                                                        setAcceptModalOpen(true)
                                                    }
                                                    className={`text-[10px] font-semibold px-2 py-0.5 bg-green-100 border text-green-600 border-green-400 rounded-sm`}
                                                >
                                                    available
                                                </p>
                                            )}
                                            {playerResponse.payment_made && (
                                                <p
                                                    onClick={() =>
                                                        setAcceptModalOpen(true)
                                                    }
                                                    className={`text-[10px] font-semibold px-2 py-0.5 text-amber-600 border bg-amber-100 border-amber-400 rounded-sm`}
                                                >
                                                    paid
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {user?.id === playerResponse.user_id && (
                                    <Dialog
                                        open={acceptModalOpen}
                                        onOpenChange={setAcceptModalOpen}
                                    >
                                        <DialogTrigger>
                                            <Button
                                                variant="secondary"
                                                className=""
                                                onClick={() =>
                                                    console.log("Trigger")
                                                }
                                            >
                                                <Icon icon="nimbus:ellipsis" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>
                                                    Edit Match Acceptance
                                                </DialogTitle>
                                            </DialogHeader>
                                            <AcceptResponseForm
                                                data={playerResponse!}
                                                closeModal={setAcceptModalOpen}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        </Card>
                    </motion.div>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Team Selection</DrawerTitle>
                        <DrawerDescription>
                            Assign player to a team.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 flex flex-col gap-4 w-full">
                        {(list === "B" || list === "All") && (
                            <Button onClick={() => selectTeam(teamA, "join")}>
                                Add to {teamA?.name}
                            </Button>
                        )}
                        {(list === "A" || list === "All") && (
                            <Button onClick={() => selectTeam(teamB, "join")}>
                                Add to {teamB?.name}
                            </Button>
                        )}
                        {(list === "A" || list === "B") && (
                            <Button
                                onClick={() => selectTeam(teamA, "remove")}
                                variant={"destructive"}
                            >
                                Remove Player
                            </Button>
                        )}
                    </div>

                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}
