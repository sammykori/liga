// hooks/useAuthUser.ts
import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
const supabase = createClient();
export function useAuthUser() {
    return useQuery({
        queryKey: ["auth-user"],
        queryFn: async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            return data.user; // returns null if not signed in
        },
        staleTime: 5 * 60 * 1000, // 5 minutes (no refetch)
    });
}
