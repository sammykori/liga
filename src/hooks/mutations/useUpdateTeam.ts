import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateGroupInput = Database["public"]["Tables"]["group_teams"]["Update"];

export function useUpdateTeam() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateGroupInput) => {
            const { data, error } = await supabase
                .from("group_teams")
                .update(updates)
                .eq("id", updates.id!)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedGroup) => {
            // Update cached profile for this user
            queryClient.setQueryData(["team", updatedGroup.id], updatedGroup);
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["groupTeams"] });
        },
    });
}
