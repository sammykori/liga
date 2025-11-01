"use client";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGroupRole } from "@/hooks/useGroupRole";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useSingleMatch } from "@/hooks/useSingleMatch";
import { usePlayerMatchResponse } from "@/hooks/usePlayerMatchResponse";
import dayjs from "dayjs";
import MatchEditForm from "@/components/sections/match/MatchEditForm";
import Statistics from "@/components/sections/match/Statistics";
import LoadingScreen from "@/components/LoadingScreen";
import { Button } from "@/components/ui/button";
import AcceptResponseForm from "@/components/sections/match/AcceptResponseForm";
import DeclineResponseDialog from "@/components/sections/match/DeclineResponseDialog";
import Lineup from "@/components/sections/match/Lineup";
import Actions from "@/components/sections/match/Actions";
import POTMPage from "@/components/sections/match/POTMPage";
import { getMatchStatus } from "@/lib/helpers";

function Page() {
    const { matchId } = useParams<{ matchId: string }>();
    const [open, setOpen] = useState(false);
    const [acceptModalOpen, setAcceptModalOpen] = useState(false);

    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const { data: match, isLoading: isGroupLoading } = useSingleMatch(matchId);
    const { role, loading } = useGroupRole(match?.group_id, user?.id);
    const { data: matchResponse, isLoading: isLoadingMatchResponse } =
        usePlayerMatchResponse(matchId, user?.id);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "cancelled":
                return "bg-orange-500 text-success-foreground";
            case "confirmed":
                return "bg-green-500 text-success-foreground";
            case "live":
                return "bg-red-500 text-success-foreground";
            case "pending":
                return "bg-yellow-500 text-accent-foreground";
            default:
                return "bg-muted text-muted-foreground";
        }
    };

    if (isGroupLoading || isUserLoading || loading || isLoadingMatchResponse) {
        return <LoadingScreen />;
    }
    console.log(matchId, user?.id);
    console.log("matchresponse", matchResponse);
    if (!match) {
        return notFound();
    }
    return (
        <div className="bg-black w-full h-screen min-h-screen text-white">
            <Navigation variant="action" />
            {matchResponse?.status === "pending" && (
                <div className="w-full px-4 py-2">
                    <div className="w-full flex  justify-between items-center p-4 rounded-2xl bg-white">
                        <h1 className="text-black font-bold">Join match</h1>
                        <div className="flex gap-4">
                            <Dialog
                                open={acceptModalOpen}
                                onOpenChange={setAcceptModalOpen}
                            >
                                <DialogTrigger asChild>
                                    <Button variant="secondary" className="">
                                        Accept
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Join Match Lineup
                                        </DialogTitle>
                                    </DialogHeader>
                                    <AcceptResponseForm
                                        data={matchResponse!}
                                        closeModal={setAcceptModalOpen}
                                    />
                                </DialogContent>
                            </Dialog>

                            <DeclineResponseDialog data={matchResponse!} />
                        </div>
                    </div>
                </div>
            )}
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-center gap-4 px-4">
                    <h1 className="text-sm font-bold">
                        {match?.a_side ? `${match?.a_side} A-side` : ""}
                    </h1>

                    <div className="flex gap-1 items-center">
                        <div
                            className={`size-2 rounded-full ${getStatusColor(
                                match.status
                            )}`}
                        ></div>
                        <h1 className="text-xs font-bold">
                            {getMatchStatus(match)?.toUpperCase()}
                        </h1>
                    </div>
                </div>
                <div className="w-full flex justify-between items-center p-4 gap-4">
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="size-16 rounded-full bg-gray-200 flex justify-center items-center">
                            <Icon
                                icon="ion:shirt"
                                className={`size-12`}
                                color={match?.teamA?.color || "black"}
                            />
                        </div>
                        <h1 className="text-xs">{match?.teamA?.name}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-2">
                        <h1 className="text-xs">{match?.venue}</h1>
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
                                color={match?.teamB?.color || "black"}
                            />
                        </div>
                        <h1 className="text-xs">{match?.teamB?.name}</h1>
                    </div>
                </div>
                {role !== "user" && (
                    <div className="w-full flex justify-between items-center gap-4 px-4">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gray-400/50 rounded-md p-2 flex items-center justify-center">
                                    <Icon
                                        icon="mynaui:edit"
                                        className="size-4"
                                    />
                                    <p>Edit</p>
                                </Button>
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
                        {(match.status === "pending" ||
                            match.status === "confirmed") && (
                            <Actions
                                matchId={matchId}
                                matchStatus={match.status}
                            />
                        )}
                    </div>
                )}
            </div>
            <div className="w-full h-full flex flex-col gap-4 bg-white text-black rounded-t-2xl mt-6 justify-center items-center">
                <hr className="w-10 rounded-full h-1 bg-gray-200 my-2"></hr>
                <div className="w-full h-full p-4">
                    <Tabs defaultValue="statistics" className="w-full h-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="statistics">
                                Statistics
                            </TabsTrigger>
                            <TabsTrigger value="lineup">Lineup</TabsTrigger>
                            <TabsTrigger
                                value="potm"
                                className="text-green-700 animate-pulse font-bold"
                            >
                                POTM
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="statistics"
                            className="w-full h-full"
                        >
                            <div className="w-full h-full p-4 border rounded-xl">
                                <Statistics
                                    matchId={matchId}
                                    matchData={match}
                                    role={role}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="lineup">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <Lineup
                                    role={role}
                                    matchData={match}
                                    matchId={matchId}
                                />
                            </div>
                        </TabsContent>
                        <TabsContent value="potm">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <POTMPage
                                    role={role}
                                    matchData={match}
                                    matchId={matchId}
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Page;
