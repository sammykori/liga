import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchMatches(groupId: string) {
    const supabase = createClient();
    if (!groupId) throw new Error("No groupId provided");

    const { data, error } = await supabase
        .from("matches")
        .select(`*`)
        .eq("group_id", groupId)
        .eq("status", "completed");

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroupMatchesPlayed(groupId?: string) {
    return useQuery({
        queryKey: ["groupMatchesPlayed", groupId],
        queryFn: () => fetchMatches(groupId!),
        enabled: !!groupId, // only run if we have a user
    });
}
