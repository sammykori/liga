import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchGroup(groupId: string) {
    const supabase = createClient();
    if (!groupId) throw new Error("No groupId provided");

    const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("id", groupId)
        .single();

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useSingleGroup(groupId: string) {
    return useQuery({
        queryKey: ["group", groupId],
        queryFn: () => fetchGroup(groupId),
        enabled: !!groupId, // only run if we have a user
    });
}
