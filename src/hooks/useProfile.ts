import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchProfile(userId?: string) {
    const supabase = createClient();
    if (!userId) throw new Error("No userId provided");

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (error) throw error;
    return data;
}

export function useProfile(userId?: string, options = {}) {
    return useQuery({
        queryKey: ["profile", userId],
        queryFn: () => fetchProfile(userId),
        enabled: !!userId, // only run if we have a user
    });
}
