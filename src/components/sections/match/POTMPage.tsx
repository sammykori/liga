"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { useGroupMatchResponse } from "@/hooks/useGroupMatchResponse";
import { MatchTeams } from "@/components/MatchCard";
import { VoteCard } from "./VoteCard";

function POTMPage({
    role,
    matchData,
    matchId,
}: {
    role: string | null;
    matchData: MatchTeams;
    matchId: string;
}) {
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
            <p className="text-xs italic text-gray-400">
                Votes reflect personal opinions on performance. Everyone sees
                the game differently. Be fair, avoid bias, and keep it fun.
            </p>
            <div className="w-full h-full flex flex-col gap-2">
                {(() => {
                    const filteredResponses = groupMatchResponse.filter(
                        (response) => response.team_id !== null
                    );

                    if (filteredResponses.length === 0) {
                        return (
                            <p className="text-gray-500">
                                No Players in {matchData.teamB?.name}
                            </p>
                        );
                    }

                    return filteredResponses.map((response, index) => (
                        <VoteCard
                            key={index}
                            playerResponse={response}
                            role={role}
                        />
                    ));
                })()}
            </div>
        </div>
    );
}

export default POTMPage;
