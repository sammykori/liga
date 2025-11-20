import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchResponse(userId?: string) {
    const supabase = createClient();
    if (!userId) throw new Error("No match info provided");

    const { data, error } = await supabase.rpc(
        "get_user_accumulated_group_stats",
        { user_id: userId }
    );

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function usePlayerAccStats(userId?: string) {
    return useQuery({
        queryKey: ["playerAccStats", userId],
        queryFn: () => fetchResponse(userId),
        enabled: !!userId, // only run if we have a user
    });
}
