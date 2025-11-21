import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { GroupMembershipWithStats } from "@/components/PlayerCard";
import {
    capitalize,
    positionInitials,
    getCountryIcon,
    getCountryCode,
} from "@/lib/helpers";

type JoinGroupModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    player: GroupMembershipWithStats | undefined;
};

export function ViewPlayerModal({
    open,
    onOpenChange,
    player,
}: JoinGroupModalProps) {
    if (!player) return null;
    const icon = getCountryIcon(
        player?.profiles?.country ? player.profiles?.country : ""
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <div className="flex flex-col justify-center items-center">
                    <div className="rounded-full size-64 relative">
                        <Image
                            src={
                                player?.profiles?.profile_url ||
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
                    <div className=" flex flex-col items-center my-4">
                        <div className="flex items-center justify-center mb-4 gap-2">
                            <DialogDescription className="px-2 rounded-md bg-amber-500 font-bold">
                                {positionInitials(player?.profiles?.position)}
                            </DialogDescription>
                            <DialogTitle className="text-xl font-bold text-foreground">
                                {player.profiles?.full_name || "Player Name"}
                            </DialogTitle>
                        </div>

                        <DialogDescription className="text-center">
                            {capitalize(player?.profiles?.position) ||
                                "Position"}
                        </DialogDescription>
                        <div className="flex justify-center">
                            <div className=" rounded-lg px-4 py-1 flex items-center gap-2">
                                {icon && <Icon icon={icon} />}
                                <span className="text-sm font-medium">
                                    {getCountryCode(
                                        player.profiles?.country || ""
                                    ) || "Country"}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-2 my-2">
                        <div className="flex items-center justify-center">
                            <div className="border w-fit p-4 rounded-xl shadow-md">
                                <h3 className="font-semibold text-4xl text-center">
                                    {player.player_group_stats?.rating?.toFixed(
                                        1
                                    ) || 0}
                                </h3>
                                <p className="text-xs text-center">Rating</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="border w-fit p-4 rounded-xl shadow-md">
                                <h3 className="font-semibold text-4xl text-center">
                                    {player.player_group_stats?.points?.toFixed(
                                        1
                                    ) || 0}
                                </h3>
                                <p className="text-xs text-center">Points</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-3 my-2">
                        <div>
                            <h3 className="font-semibold text-4xl text-center">
                                {player.player_group_stats?.goals || 0}
                            </h3>
                            <p className="text-xs text-center">Goal(s)</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-4xl text-center">
                                {player.player_group_stats?.goals || 0}
                            </h3>
                            <p className="text-xs text-center">Won</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-4xl text-center">
                                {player.player_group_stats?.matches_played || 0}
                            </h3>
                            <p className="text-xs text-center">Game(s)</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
