import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchResponse(matchId?: string, userId?: string) {
    const supabase = createClient();
    if (!matchId || !userId) throw new Error("No match info provided");

    const { data, error } = await supabase
        .from("match_responses")
        .select("*")
        .eq("match_id", matchId)
        .eq("user_id", userId)
        .maybeSingle();

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function usePlayerMatchResponse(matchId?: string, userId?: string) {
    return useQuery({
        queryKey: ["playerMatchResponse", `${matchId}${userId}`],
        queryFn: () => fetchResponse(matchId, userId),
        enabled: !!matchId && !!userId, // only run if we have a user
    });
}
