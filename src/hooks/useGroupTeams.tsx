import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchTeams(groupId: string) {
    const supabase = createClient();
    if (!groupId) throw new Error("No groupId provided");

    const { data, error } = await supabase
        .from("group_teams")
        .select("*")
        .eq("group_id", groupId);

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroupTeams(groupId?: string) {
    return useQuery({
        queryKey: ["groupTeams", groupId],
        queryFn: () => fetchTeams(groupId!),
        enabled: !!groupId, // only run if we have a user
    });
}
