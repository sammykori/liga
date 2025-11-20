"use client";
import LoadingScreen from "@/components/LoadingScreen";
import { VoteCard } from "./VoteCard";
import { useMatchPotm } from "@/hooks/useMatchPotm";
import { Database } from "@/types/database";

type MatchStatus = Database["public"]["Tables"]["matches"]["Row"]["status"];

function POTMPage({
    role,
    matchStatus,
    matchId,
}: {
    role: string | null;
    matchStatus: MatchStatus;
    matchId: string;
}) {
    const { data: matchPotmData, isLoading } = useMatchPotm(matchId);

    if (isLoading) {
        return <LoadingScreen />;
    }

    console.log("matchresponse", matchPotmData);
    if (!matchPotmData) {
        return (
            <div>
                <h1>No players been voted POTM yet.</h1>
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col gap-4">
            <p className="text-xs italic text-gray-400">
                {matchStatus === "completed"
                    ? "Below are the results of the voting. Congratulations to the POTMs 🎉"
                    : "Votes reflect personal opinions on performance. Everyone sees the game differently. Be fair, avoid bias, and keep it fun."}
            </p>
            <div className="w-full h-full flex flex-col gap-2">
                {matchPotmData.map((response, index) => (
                    <VoteCard
                        key={index}
                        votedPlayer={response}
                        role={role}
                        matchStatus={matchStatus}
                    />
                ))}
            </div>
        </div>
    );
}

export default POTMPage;
