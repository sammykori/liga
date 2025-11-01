import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchRequests(groupId: string) {
    const supabase = createClient();
    if (!groupId) throw new Error("No groupId provided");

    const { data, error } = await supabase
        .from("group_join_requests")
        .select(
            `id, user_id, status, created_at, profiles(username, full_name)`
        )
        .eq("group_id", groupId)
        .eq("status", "pending");

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroupRequests(groupId: string) {
    return useQuery({
        queryKey: ["groupsRequests", groupId],
        queryFn: () => fetchRequests(groupId),
        enabled: !!groupId, // only run if we have a user
    });
}
