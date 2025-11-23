"use client";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { QRCodeSVG } from "qrcode.react";
import GroupRequestsPage from "@/components/sections/group/GroupRequestsPage";
import GroupSquadPage from "@/components/sections/group/GroupSquadPage";
import GroupEditForm from "@/components/sections/group/GroupEditForm";
import { useGroupRole } from "@/hooks/useGroupRole";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useSingleGroup } from "@/hooks/useSingleGroup";
import GroupTeamsPage from "@/components/sections/group/GroupTeamsPage";
import GroupMatchesPage from "@/components/sections/group/GroupMatchesPage";
import { useGroupPlayers } from "@/hooks/useGroupPlayers";
import { useGroupMatchesPlayed } from "@/hooks/useGroupMatchesPlayed";
import { toast } from "sonner";
import { useUpdateGroupMembership } from "@/hooks/mutations/useUpdateGroupMemebership";
import { useRouter } from "next/navigation";

function Page() {
    const { groupId } = useParams<{ groupId: string }>();
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const { data: group, isLoading: isGroupLoading } = useSingleGroup(groupId);
    const { role, loading } = useGroupRole(groupId, user?.id);
    const { data: players, isLoading: isPlayersLoading } =
        useGroupPlayers(groupId);
    const { data: matchesPlayed, isLoading: isMatchesPlayedLoading } =
        useGroupMatchesPlayed();
    const membershipMutation = useUpdateGroupMembership();

    console.log(matchesPlayed);
    const handleCopy = async () => {
        if (!group) return;
        await navigator.clipboard.writeText(
            `${window.location.origin}/join/${group.join_code}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (
        isGroupLoading ||
        loading ||
        isUserLoading ||
        isPlayersLoading ||
        isMatchesPlayedLoading
    ) {
        return;
    }
    async function handleRemovePlayer() {
        try {
            await membershipMutation.mutate({
                group_id: groupId,
                user_id: user?.id,
                removed: true,
                removed_at: new Date().toISOString(),
            });
            toast.success(`You have left the group successfully.`);
            router.push("/");
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to leave group");
        }
    }
    return (
        <div className="bg-black w-full h-screen min-h-screen text-white">
            <Navigation variant="action" />
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-end p-4">
                    <div>
                        <h1 className="font-bold text-2xl">{group?.name}</h1>
                        <p className="text-sm">{group?.country}</p>
                        <p className="text-xs italic line-clamp-3">
                            {group?.description}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {role !== "user" && (
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    <div className="bg-gray-400/50 rounded-full size-8 p-2 flex items-center justify-center">
                                        <Icon
                                            icon="mynaui:edit"
                                            className="size-4"
                                        />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Edit Group Details
                                        </DialogTitle>
                                    </DialogHeader>
                                    <GroupEditForm
                                        data={group!}
                                        closeModal={setOpen}
                                    />
                                </DialogContent>
                            </Dialog>
                        )}
                        <Dialog>
                            <DialogTrigger>
                                <div className="bg-gray-400/50 rounded-full size-8 p-2 flex items-center justify-center">
                                    <Icon
                                        icon="uil:qrcode-scan"
                                        className="size-4"
                                    />
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Share the QR Code or Link below to
                                        invite friends to {group?.name}
                                    </DialogTitle>
                                    <div className="w-full flex flex-col justify-center items-center">
                                        <QRCodeSVG
                                            value={`${window.location.origin}/join/${group?.join_code}`}
                                            title="QR Code to invite friends to group"
                                            marginSize={4}
                                        />
                                        <div className="flex flex-col w-full p-4 gap-2 items-center">
                                            <p className="text-base truncate ">{`${window.location.origin}/join/${group?.join_code}`}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleCopy}
                                                className="flex items-center gap-2"
                                            >
                                                {copied ? (
                                                    <Icon
                                                        icon="octicon:check-16"
                                                        className="h-4 w-4"
                                                    />
                                                ) : (
                                                    <Icon
                                                        icon="solar:copy-linear"
                                                        className="h-4 w-4"
                                                    />
                                                )}
                                                {copied ? "Copied!" : "Copy"}
                                            </Button>
                                        </div>
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Drawer>
                            <DrawerTrigger asChild>
                                <div className="bg-gray-400/50 rounded-full size-8 p-2 flex items-center justify-center">
                                    <Icon
                                        icon="uil:ellipsis-v"
                                        className="size-4"
                                    />
                                </div>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerTitle>Leave group</DrawerTitle>
                                        <DrawerDescription>
                                            I want to leave this group
                                        </DrawerDescription>
                                    </DrawerHeader>

                                    <DrawerFooter>
                                        <ActionButton
                                            action={() => handleRemovePlayer()}
                                        />
                                        <DrawerClose asChild>
                                            <Button variant="outline">
                                                Cancel
                                            </Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-4">
                    <div className="flex flex-col items-center text-black justify-center bg-white rounded-md w-32 aspect-video p-2">
                        <h1 className="font-bold text-2xl">
                            {matchesPlayed?.length || 0}
                        </h1>
                        <p className="text-xs">Matches played</p>
                    </div>
                    <div className="flex flex-col items-center text-black justify-center bg-white rounded-md w-32 aspect-video p-2">
                        <h1 className="font-bold text-2xl">
                            {players?.length}
                        </h1>
                        <p className="text-xs">Available players</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4 bg-white text-black rounded-t-2xl mt-6 justify-center items-center">
                <hr className="w-10 rounded-full h-1 bg-gray-200 my-2"></hr>
                <div className="w-full h-full p-4">
                    <Tabs defaultValue="matches" className="w-full h-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="matches">Matches</TabsTrigger>
                            <TabsTrigger value="players">Players</TabsTrigger>
                            <TabsTrigger value="teams">Teams</TabsTrigger>
                            <TabsTrigger value="requests">Requests</TabsTrigger>
                        </TabsList>
                        <TabsContent value="matches" className="w-full h-full">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <GroupMatchesPage
                                    groupId={groupId}
                                    role={role}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="players">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <GroupSquadPage groupId={groupId} role={role} />
                            </div>
                        </TabsContent>
                        <TabsContent value="teams">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <GroupTeamsPage groupId={groupId} role={role} />
                            </div>
                        </TabsContent>
                        <TabsContent value="requests">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <GroupRequestsPage />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Page;

type ActionButtonProps = {
    action: () => void;
};
function ActionButton({ action }: ActionButtonProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="rounded-lg border px-4 py-2 items-center flex w-full justify-between">
                    <h1 className="text-red-500">Leave group</h1>
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
                    <AlertDialogAction onClick={() => action()}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
