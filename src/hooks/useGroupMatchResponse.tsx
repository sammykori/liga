import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchResponse(matchId?: string) {
    const supabase = createClient();
    if (!matchId) throw new Error("No match ID provided");

    const { data, error } = await supabase
        .from("match_responses")
        .select(`*, profiles(username, full_name, position, profile_url)`)
        .eq("match_id", matchId)
        .eq("status", "accepted");

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroupMatchResponse(matchId?: string) {
    return useQuery({
        queryKey: ["groupResponses", matchId],
        queryFn: () => fetchResponse(matchId),
        enabled: !!matchId, // only run if we have a user
    });
}
