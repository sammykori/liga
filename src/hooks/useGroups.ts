import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchProfile(userId?: string) {
    const supabase = createClient();
    if (!userId) throw new Error("No userId provided");

    const { data, error } = await supabase
        .from("group_memberships")
        .select(
            `
    group_id,
    groups (*)
  `
        )
        .eq("user_id", userId);

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useGroup(userId?: string) {
    return useQuery({
        queryKey: ["groups", userId],
        queryFn: () => fetchProfile(userId),
        enabled: !!userId, // only run if we have a user
    });
}
