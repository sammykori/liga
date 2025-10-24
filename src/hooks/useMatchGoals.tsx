import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchMatchGoals(matchId: string) {
    const supabase = createClient();
    if (!matchId) throw new Error("No matchId provided");

    const { data, error } = await supabase
        .from("goals")
        .select(
            `*, scorer:profiles!scorer_id(first_name,last_name, position), assist:profiles!assist_id(first_name,last_name, position)`
        )
        .eq("match_id", matchId);

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useMatchGoals(matchId?: string) {
    return useQuery({
        queryKey: ["matchGoals", matchId],
        queryFn: () => fetchMatchGoals(matchId!),
        enabled: !!matchId, // only run if we have a user
    });
}
