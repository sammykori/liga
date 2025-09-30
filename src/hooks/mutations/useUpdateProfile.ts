import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";

interface UpdateProfileInput {
    first_name?: string;
    last_name?: string;
    profile_url?: string | null;
    id: string;
}

export function useUpdateProfile() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateProfileInput) => {
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
