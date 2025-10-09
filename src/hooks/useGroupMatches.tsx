import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchMatches(groupId: string) {
    const supabase = createClient();
    if (!groupId) throw new Error("No groupId provided");

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
        .eq("group_id", groupId);

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroupMatches(groupId?: string) {
    return useQuery({
        queryKey: ["groupMatches", groupId],
        queryFn: () => fetchMatches(groupId!),
        enabled: !!groupId, // only run if we have a user
    });
}
