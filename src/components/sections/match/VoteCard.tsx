import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
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

type GroupResponsesRow = Database["public"]["Tables"]["match_responses"]["Row"];
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

type VotedPlayer = {
    player_id: string;
    username: string;
    full_name: string;
    votes: number;
};
interface ParticipantCardProps {
    votedPlayer: VotedPlayer;
    role: string | null;
}

export function VoteCard({ role, votedPlayer }: ParticipantCardProps) {
    const [open, setOpen] = React.useState(false);
    console.log(role);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>
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
                                        {votedPlayer.username}
                                    </h3>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-400">
                                    {votedPlayer.votes}{" "}
                                    <span className="italic text-xs">
                                        vote{votedPlayer.votes > 1 ? "s" : ""}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
