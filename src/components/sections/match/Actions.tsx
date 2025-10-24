import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Icon } from "@iconify/react";
import { useUpdateMatch } from "@/hooks/mutations/useUpdateMatch";
import { toast } from "sonner";
import { Database } from "@/types/database";
type MatchStatus = Database["public"]["Enums"]["match_status"];

function Actions({
    matchId,
    matchStatus,
}: {
    matchId: string;
    matchStatus: MatchStatus;
}) {
    const updateMatchMutation = useUpdateMatch();
    async function updateMatch(status: MatchStatus) {
        if (!matchId) return;
        try {
            await updateMatchMutation.mutateAsync({
                id: matchId,
                status: status,
            });
            toast.success(`Match has been ${status}!`);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update match");
        }
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="bg-amber-700 text-white rounded-md p-2 flex items-center justify-center">
                    <Icon icon="nimbus:ellipsis" className="size-4" />
                    <p>Actions</p>
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Match Actions</DrawerTitle>
                        <DrawerDescription>
                            Manage the match status and settings.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0 flex flex-col gap-4 w-full">
                        {matchStatus === "pending" && (
                            <div className="flex flex-col w-full gap-2">
                                <ActionButton
                                    name="Confirm Match"
                                    description="Alert all participants"
                                    action={() => updateMatch("confirmed")}
                                />
                            </div>
                        )}
                        {matchStatus === "confirmed" && (
                            <div className="flex flex-col w-full gap-2">
                                <ActionButton
                                    name="End Match"
                                    action={() => updateMatch("ended")}
                                />
                            </div>
                        )}
                        {(matchStatus === "confirmed" ||
                            matchStatus === "pending") && (
                            <div className="flex flex-col w-full gap-2">
                                <ActionButton
                                    name="Cancel Match"
                                    action={() => updateMatch("cancelled")}
                                    disabled
                                />
                            </div>
                        )}
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default Actions;

type ActionButtonProps = {
    disabled?: boolean;
    name: string;
    description?: string;
    action: () => void;
};

function ActionButton({
    disabled = false,
    name,
    description = "",
    action,
}: ActionButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button
                    className={`w-full `}
                    disabled={disabled}
                    variant={`${
                        name === "Confirm Match"
                            ? "secondary"
                            : name === "End Match"
                            ? "default"
                            : "destructive"
                    }`}
                >
                    {name}{" "}
                    <span className="text-[10px] text-gray-400 ">
                        {description}
                    </span>
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
                    <AlertDialogAction onClick={() => action()}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
