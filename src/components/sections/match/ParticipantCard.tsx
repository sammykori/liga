import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
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
import { Button } from "@/components/ui/button";
import { useUpdateMatchResponse } from "@/hooks/mutations/useUpdateMatchResponse";
import { toast } from "sonner";

type GroupResponsesRow = Database["public"]["Tables"]["match_responses"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

export type GroupMembershipWithStats = GroupResponsesRow & {
    profiles: Pick<ProfileRow, "username" | "full_name" | "position"> | null;
};
type Teams = Database["public"]["Tables"]["group_teams"]["Row"];
type TeamData = Pick<Teams, "id" | "name" | "color"> | null;

interface ParticipantCardProps {
    playerResponse: GroupMembershipWithStats;
    role: string | null;
    teamA?: TeamData;
    teamB?: TeamData;
    list?: "A" | "B" | "All";
}

export function ParticipantCard({
    role,
    playerResponse,
    teamA,
    teamB,
    list,
}: ParticipantCardProps) {
    const updateMatchResponseMutation = useUpdateMatchResponse();
    const [open, setOpen] = React.useState(false);

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

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger
                disabled={!role || role === "user"}
                className="w-full"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="p-2 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
                                    <Icon
                                        icon="mdi:account"
                                        className="w-6 h-6 text-muted-foreground"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="font-semibold text-xs text-card-foreground">
                                        {playerResponse.profiles?.username}{" "}
                                        {playerResponse.profiles?.full_name} -{" "}
                                        {playerResponse.profiles?.position}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {playerResponse.availability && (
                                            <p
                                                className={`text-[10px] font-semibold px-2 py-0.5 bg-green-100 border text-green-600 border-green-400 rounded-md`}
                                            >
                                                available
                                            </p>
                                        )}
                                        {playerResponse.payment_made && (
                                            <p
                                                className={`text-[10px] font-semibold px-2 py-0.5 text-amber-600 border bg-amber-100 border-amber-400 rounded-md`}
                                            >
                                                paid
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
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
    );
}
