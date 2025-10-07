import { PlayerRating } from "@/types/mock";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileTable from "./MobileTable";
import DesktopTable from "./DesktopTable";
import { useGroupPlayers } from "@/hooks/useGroupPlayers";

function LeaderTable({ groupId }: { groupId: string | undefined }) {
    const isMobile = useIsMobile();
    console.log(groupId);
    const { data: players } = useGroupPlayers(groupId!);
    if (!players) {
        return (
            <div>
                <h1>No players have been added yet.</h1>
            </div>
        );
    }
    return (
        <div className="w-full py-0 rounded-t-md overflow-hidden bg-gray-50 mt-6 pb-28">
            <div className="h-16 w-full bg-purple-400 flex items-center px-4">
                <h1 className="text-white font-bold text-2xl">
                    Leaderboard Table
                </h1>
            </div>
            <div className="mt-10 mb-4 flex flex-row px-4 ">
                <Button variant="outline">
                    <Icon icon="mi:filter" />
                </Button>
            </div>
            <div className="w-full px-4">
                {isMobile ? (
                    <MobileTable data={players} />
                ) : (
                    <DesktopTable data={players} />
                )}
            </div>
        </div>
    );
}

export default LeaderTable;
