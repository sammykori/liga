import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

async function fetchNotifications(userId?: string) {
    const supabase = createClient();
    if (!userId) throw new Error("No userId provided");

    const { data, error } = await supabase
        .from("notifications")
        .select(`*, groups(name)`)
        .eq("user_id", userId);

    if (error) {
        console.log(error);
        throw error;
    }
    return data;
}

export function useNotifications(userId?: string) {
    return useQuery({
        queryKey: ["notification", userId],
        queryFn: () => fetchNotifications(userId),
        enabled: !!userId, // only run if we have a user
    });
}
