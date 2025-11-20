import { GroupMembershipWithStats } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { useState } from "react";

function LeaderboardFilter({
    data,
    setData,
}: {
    data: GroupMembershipWithStats[];
    setData: (a?: GroupMembershipWithStats[] | undefined) => void;
}) {
    const [active, setActive] = useState<"mp" | "mw" | "rate" | "pnts">();
    // const sortAZ = () => {
    //     const newData = [...data].sort((a, b) => {
    //         const nameA = a.profiles?.username || "";
    //         const nameB = b.profiles?.username || "";
    //         return nameA.localeCompare(nameB);
    //     });
    //     console.log(newData);
    //     setData(newData);
    // };
    // const sortZA = () => {
    //     const newData = [...data]
    //         .sort((a, b) => {
    //             const nameA = a.profiles?.username || "";
    //             const nameB = b.profiles?.username || "";
    //             return nameA.localeCompare(nameB);
    //         })
    //         .reverse();
    //     console.log(newData);
    //     setData(newData);
    // };
    const sortByRating = () => {
        const newData = [...data].sort((a, b) => {
            const ratingA = a.player_group_stats?.rating || 0;
            const ratingB = b.player_group_stats?.rating || 0;
            return ratingB - ratingA;
        });
        setData(newData);
    };
    const sortByPoints = () => {
        const newData = [...data].sort((a, b) => {
            const ratingA = a.player_group_stats?.points || 0;
            const ratingB = b.player_group_stats?.points || 0;
            return ratingB - ratingA;
        });
        setData(newData);
    };
    const sortByMp = () => {
        const newData = [...data].sort((a, b) => {
            const ratingA = a.player_group_stats?.matches_played || 0;
            const ratingB = b.player_group_stats?.matches_played || 0;
            return ratingB - ratingA;
        });
        setData(newData);
    };
    const sortByMw = () => {
        const newData = [...data].sort((a, b) => {
            const ratingA = a.player_group_stats?.matches_won || 0;
            const ratingB = b.player_group_stats?.matches_won || 0;
            return ratingB - ratingA;
        });
        setData(newData);
        setActive("mw");
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Icon icon="mi:filter" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel className="font-bold">
                    Filter
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuCheckboxItem
                        checked={active === "rate" ? true : false}
                        onClick={() => sortByRating()}
                    >
                        Ratings
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={active === "pnts" ? true : false}
                        onClick={() => sortByPoints()}
                    >
                        Points
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={active === "mp" ? true : false}
                        onClick={() => sortByMp()}
                    >
                        Matches Played
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                        checked={active === "mw" ? true : false}
                        onClick={() => sortByMw()}
                    >
                        Matches Won
                    </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LeaderboardFilter;
