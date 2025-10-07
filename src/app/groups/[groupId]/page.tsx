"use client";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingMatches from "@/components/sections/home/UpcomingMatches";
import TopPlayers from "@/components/sections/home/TopPlayers";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Database } from "@/types/database";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import GroupRequestsPage from "@/components/sections/group/GroupRequestsPage";
import GroupSquadPage from "@/components/sections/group/GroupSquadPage";
import GroupEditForm from "@/components/sections/group/GroupEditForm";
import { useGroupRole } from "@/hooks/useGroupRole";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useSingleGroup } from "@/hooks/useSingleGroup";

type Group = Database["public"]["Tables"]["groups"]["Row"];
function Page() {
    const supabase = createClient();
    const { groupId } = useParams<{ groupId: string }>();
    const [groupData, setGroupData] = useState<Group>();
    const router = useRouter();
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const { data: group, isLoading: isGroupLoading } = useSingleGroup(groupId);
    const { role, loading } = useGroupRole(groupId, user?.id);

    const handleCopy = async () => {
        if (!group) return;
        await navigator.clipboard.writeText(
            `${window.location.origin}/join/${group.join_code}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    if (isGroupLoading || loading || isUserLoading) {
        return;
    }
    return (
        <div className="bg-black w-full h-screen min-h-screen text-white">
            <Navigation variant="action" />
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-end p-4">
                    <div>
                        <h1 className="font-bold text-2xl">{group?.name}</h1>
                        <p className="text-sm">{groupData?.country}</p>
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
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-4">
                    <div className="flex flex-col items-center text-black justify-center bg-white rounded-md w-32 aspect-video p-2">
                        <h1 className="font-bold text-2xl">24</h1>
                        <p className="text-sm">Matches played</p>
                    </div>
                    <div className="flex flex-col items-center text-black justify-center bg-white rounded-md w-32 aspect-video p-2">
                        <h1 className="font-bold text-2xl">24</h1>
                        <p className="text-sm">Available players</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4 bg-white text-black rounded-t-2xl mt-6 justify-center items-center">
                <hr className="w-10 rounded-full h-1 bg-gray-200 my-2"></hr>
                <div className="w-full h-full p-4">
                    <Tabs defaultValue="matches" className="w-full h-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="matches">Matches</TabsTrigger>
                            <TabsTrigger value="squad">Squad</TabsTrigger>
                            <TabsTrigger value="teams">Teams</TabsTrigger>
                            <TabsTrigger value="requests">Requests</TabsTrigger>
                        </TabsList>
                        <TabsContent value="matches" className="w-full h-full">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <UpcomingMatches />
                            </div>
                        </TabsContent>
                        <TabsContent value="squad">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <GroupSquadPage groupId={groupId} role={role} />
                            </div>
                        </TabsContent>
                        <TabsContent value="teams">Coming soon.</TabsContent>
                        <TabsContent value="requests">
                            <GroupRequestsPage />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Page;
