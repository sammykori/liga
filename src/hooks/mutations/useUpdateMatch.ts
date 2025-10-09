import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateMatchInput = Database["public"]["Tables"]["matches"]["Update"];

export function useUpdateMatch() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateMatchInput) => {
            const { data, error } = await supabase
                .from("matches")
                .update(updates)
                .eq("id", updates.id!)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedGroup) => {
            // Update cached profile for this user
            queryClient.setQueryData(["match", updatedGroup.id], updatedGroup);
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["matches"] });
        },
    });
}
