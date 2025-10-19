import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

// interface UpdateProfileInput {
//     id: string;
//     first_name?: string;
//     last_name?: string;
//     position?: string;
//     country?: string;
//     county_state_city?: string;
//     bio?: string;
//     profile_url?: string | null;
//     height?: number | null;
//     weight?: number | null;
//     foot?: Database["public"]["Enums"]["foot"] | null;
//     sex?: Database["public"]["Enums"]["sex"] | null;
// }
type UpdateProfileInput = Database["public"]["Tables"]["profiles"]["Update"];

export function useUpdateProfile() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateProfileInput) => {
            if (!updates.id) throw new Error("No groupId provided");
            const { data, error } = await supabase
                .from("profiles")
                .update(updates)
                .eq("id", updates.id)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedProfile) => {
            // Update cached profile for this user
            queryClient.setQueryData(
                ["profile", updatedProfile.id],
                updatedProfile
            );
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["profiles"] });
        },
    });
}
