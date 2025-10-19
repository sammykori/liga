import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchPlayers(groupId: string) {
    const supabase = createClient();
    if (!groupId) throw new Error("No groupId provided");

    const { data, error } = await supabase
        .from("group_memberships")
        .select(
            `id, user_id, group_id, role, joined_at, profiles(first_name, last_name, position), player_group_stats ( goals, assists, matches_played, rating )`
        )
        .eq("group_id", groupId);

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroupPlayers(groupId: string) {
    return useQuery({
        queryKey: ["groupPlayers", groupId],
        queryFn: () => fetchPlayers(groupId),
        enabled: !!groupId, // only run if we have a user
    });
}
