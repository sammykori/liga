import { GroupMembershipWithStats } from "@/components/PlayerCard";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import { Separator } from "@radix-ui/react-select";

function LeaderboardFilter({
    data,
    setData,
}: {
    data: GroupMembershipWithStats[];
    setData: (a?: GroupMembershipWithStats[] | undefined) => void;
}) {
    const sortAZ = () => {
        const newData = data.sort();
        setData(newData);
    };
    const sortZA = () => {
        const newData = data.sort().reverse();
        console.log(newData);
        setData(newData);
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Icon icon="mi:filter" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel>Filter</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Ratings
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Points
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Matches Played
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Matches Won
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => sortAZ()}>
                        A -Z
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => sortZA()}>
                        Z - A
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default LeaderboardFilter;
