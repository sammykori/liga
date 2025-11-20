import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
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
import { Database } from "@/types/database";

type VotedPlayer = {
    voted_player_id: string;
    full_name: string;
    player_position: string;
    profile_url: string;
    votes: number;
    rank: number;
};
type MatchStatus = Database["public"]["Tables"]["matches"]["Row"]["status"];

interface ParticipantCardProps {
    votedPlayer: VotedPlayer;
    role: string | null;
    matchStatus: MatchStatus;
}

export function VoteCard({ votedPlayer, matchStatus }: ParticipantCardProps) {
    const [open, setOpen] = React.useState(false);
    console.log(matchStatus);

    const positionMedal = (rank: number) => {
        switch (rank) {
            case 1:
                return "noto:1st-place-medal";
                break;
            case 2:
                return "noto:2nd-place-medal";
                break;
            case 1:
                return "noto:3rd-place-medal";
                break;

            default:
                return "iconoir:medal";
                break;
        }
    };
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
                                        {votedPlayer.full_name}
                                    </h3>
                                </div>
                            </div>
                            <div>
                                {matchStatus === "completed" ? (
                                    <div>
                                        <Icon
                                            icon={positionMedal(
                                                votedPlayer.rank
                                            )}
                                            className="size-8"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-lg font-bold text-gray-400">
                                        {votedPlayer.votes}{" "}
                                        <span className="italic text-xs">
                                            vote
                                            {votedPlayer.votes > 1 ? "s" : ""}
                                        </span>
                                    </p>
                                )}
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
