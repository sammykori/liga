"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";
import { useGroupMatchResponse } from "@/hooks/useGroupMatchResponse";
import { ParticipantCard } from "./ParticipantCard";

import { MatchTeams } from "@/components/MatchCard";

function Lineup({
    role,
    matchData,
}: {
    role: string | null;
    matchData: MatchTeams;
}) {
    const { matchId } = useParams<{ matchId: string }>();

    const { data: groupMatchResponse, isLoading: isGroupLoading } =
        useGroupMatchResponse(matchId);

    if (isGroupLoading) {
        return <LoadingScreen />;
    }

    console.log("matchresponse", groupMatchResponse);
    if (!groupMatchResponse) {
        return (
            <div>
                <h1>No players have joined the match yet.</h1>
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col gap-4">
            <div>
                <p className="text-gray-400 italic text-xs">
                    All participating players should be assigned a team before
                    match is <span className="font-bold">ended</span> to be
                    assigned points based on teams performance.
                </p>
            </div>
            <Tabs defaultValue="pool" className="w-full h-full">
                <TabsList className="w-full">
                    <TabsTrigger value="pool">Player Pool</TabsTrigger>
                    <TabsTrigger value="teamA">
                        {matchData.teamA?.name}
                    </TabsTrigger>
                    <TabsTrigger value="teamB">
                        {matchData.teamB?.name}
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="pool" className="w-full h-full">
                    <div className="w-full h-full p-4 border rounded-xl flex flex-col gap-2">
                        {(() => {
                            const filteredResponses = groupMatchResponse.filter(
                                (response) => response.team_id === null
                            );

                            if (filteredResponses.length === 0) {
                                return (
                                    <p className="text-gray-500">
                                        No Available Players
                                    </p>
                                );
                            }

                            return filteredResponses.map((response, index) => (
                                <ParticipantCard
                                    key={index}
                                    playerResponse={response}
                                    role={role}
                                    teamA={matchData.teamA}
                                    teamB={matchData.teamB}
                                    list="All"
                                />
                            ));
                        })()}
                    </div>
                </TabsContent>
                <TabsContent value="teamA">
                    <div className="w-full h-full p-4 border rounded-xl flex flex-col gap-2">
                        {(() => {
                            const filteredResponses = groupMatchResponse.filter(
                                (response) =>
                                    response.team_id === matchData.teamA_id
                            );

                            if (filteredResponses.length === 0) {
                                return (
                                    <p className="text-gray-500">
                                        No Players in {matchData.teamA?.name}
                                    </p>
                                );
                            }

                            return filteredResponses.map((response, index) => (
                                <ParticipantCard
                                    key={index}
                                    playerResponse={response}
                                    role={role}
                                    teamA={matchData.teamA}
                                    teamB={matchData.teamB}
                                    list="A"
                                />
                            ));
                        })()}
                    </div>
                </TabsContent>
                <TabsContent value="teamB">
                    <div className="w-full h-full p-4 border rounded-xl flex flex-col gap-2">
                        {(() => {
                            const filteredResponses = groupMatchResponse.filter(
                                (response) =>
                                    response.team_id === matchData.teamB_id
                            );

                            if (filteredResponses.length === 0) {
                                return (
                                    <p className="text-gray-500">
                                        No Players in {matchData.teamB?.name}
                                    </p>
                                );
                            }

                            return filteredResponses.map((response, index) => (
                                <ParticipantCard
                                    key={index}
                                    playerResponse={response}
                                    role={role}
                                    teamA={matchData.teamA}
                                    teamB={matchData.teamB}
                                    list="B"
                                />
                            ));
                        })()}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default Lineup;
