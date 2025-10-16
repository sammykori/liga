"use client";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import GroupRequestsPage from "@/components/sections/group/GroupRequestsPage";
import { useGroupRole } from "@/hooks/useGroupRole";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useSingleMatch } from "@/hooks/useSingleMatch";
import dayjs from "dayjs";
import MatchEditForm from "@/components/sections/match/MatchEditForm";
import Statistics from "@/components/sections/match/Statistics";

function Page() {
    const { matchId } = useParams<{ matchId: string }>();
    const [open, setOpen] = useState(false);

    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const { data: match, isLoading: isGroupLoading } = useSingleMatch(matchId);
    const { role, loading } = useGroupRole(match?.group_id, user?.id);

    if (isGroupLoading || isUserLoading || loading) {
        return;
    }
    console.log("match", match);
    return (
        <div className="bg-black w-full h-screen min-h-screen text-white">
            <Navigation variant="action" />
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-center gap-4 px-4">
                    <h1 className="text-xs">{match?.venue}</h1>

                    <h1 className="text-xs">LIVE</h1>
                </div>
                <div className="w-full flex justify-between items-center p-4 gap-4">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="size-16 rounded-full bg-gray-200 flex justify-center items-center">
                            <Icon
                                icon="ion:shirt"
                                className={`size-12`}
                                color={match?.teamA.color || "black"}
                            />
                        </div>
                        <h1 className="text-xs">{match?.teamA.name}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1 className="text-xs">{match?.title}</h1>
                        <h1 className="text-xs">
                            {dayjs(match?.match_date).format("dddd, D MMM")} -
                            12:30 PM
                        </h1>
                        <div className="px-6 py-2 bg-white text-black rounded-md flex justify-center items-center flex-col">
                            <h1>Results</h1>
                            <h1>0 - 0</h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="size-16 rounded-full bg-gray-200 flex justify-center items-center">
                            <Icon
                                icon="ion:shirt"
                                className={`size-12`}
                                color={match?.teamB.color || "black"}
                            />
                        </div>
                        <h1 className="text-xs">{match?.teamB.name}</h1>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center gap-4 px-4">
                    <h1 className="text-xs">{match?.venue}</h1>

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
                                    <MatchEditForm
                                        data={match!}
                                        closeModal={setOpen}
                                    />
                                </DialogContent>
                            </Dialog>
                        )}

                        {/* <div className="bg-gray-400/50 rounded-full size-8 p-2 flex items-center justify-center">
                            <Icon icon="uil:qrcode-scan" className="size-4" />
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4 bg-white text-black rounded-t-2xl mt-6 justify-center items-center">
                <hr className="w-10 rounded-full h-1 bg-gray-200 my-2"></hr>
                <div className="w-full h-full p-4">
                    <Tabs defaultValue="matches" className="w-full h-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="matches">
                                Statistics
                            </TabsTrigger>
                            <TabsTrigger value="squad">Lineup</TabsTrigger>
                            <TabsTrigger value="teams">Ratings</TabsTrigger>
                            <TabsTrigger value="requests">POTM</TabsTrigger>
                        </TabsList>
                        <TabsContent value="matches" className="w-full h-full">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <Statistics
                                    groupId={match?.group_id!}
                                    role={role}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="squad">
                            <div className="w-full h-full p-4 border rounded-xl">
                                {/* <GroupSquadPage groupId={groupId} role={role} /> */}
                            </div>
                        </TabsContent>
                        <TabsContent value="teams">
                            <div className="w-full h-full p-4 border rounded-xl">
                                {/* <GroupTeamsPage groupId={groupId} role={role} /> */}
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
