import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateGroupMembership =
    Database["public"]["Tables"]["group_memberships"]["Update"];

export function useLeaveGroupMembership() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateGroupMembership) => {
            if (!updates.id) return;

            const { data, error } = await supabase
                .from("group_memberships")
                .update({
                    removed: updates.removed,
                    removed_at: updates.removed_at,
                })
                .eq("id", updates.id!)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedGroup) => {
            // Update cached profile for this user
            // queryClient.setQueryData(["group", updatedGroup.id], updatedGroup);
            // Optionally invalidate related queries
            queryClient.invalidateQueries({
                queryKey: ["groupPlayers", updatedGroup?.group_id],
            });
        },
    });
}
