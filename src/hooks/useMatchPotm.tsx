import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchMatchPotm(matchId: string) {
    const supabase = createClient();
    if (!matchId) throw new Error("No matchId provided");

    const { data, error } = await supabase.rpc("get_top_voted_players", {
        matchid: matchId,
    });

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useMatchPotm(matchId?: string) {
    return useQuery({
        queryKey: ["matchPotm", matchId],
        queryFn: () => fetchMatchPotm(matchId!),
        enabled: !!matchId, // only run if we have a user
    });
}
