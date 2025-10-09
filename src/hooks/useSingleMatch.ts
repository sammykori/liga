import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchMatch(matchId: string) {
    const supabase = createClient();
    if (!matchId) throw new Error("No matchId provided");

    const { data, error } = await supabase
        .from("matches")
        .select(
            `*, teamA:group_teams!teamA_id (
      id,
      name,
      color
    ),
    teamB:group_teams!teamB_id (
      id,
      name,
      color
    )`
        )
        .eq("id", matchId)
        .single();

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useSingleMatch(matchId: string) {
    return useQuery({
        queryKey: ["match", matchId],
        queryFn: () => fetchMatch(matchId),
        enabled: !!matchId, // only run if we have a user
    });
}
