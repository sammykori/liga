import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateGroupMembership =
    Database["public"]["Tables"]["group_memberships"]["Update"];

export function useUpdateGroupMembership() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateGroupMembership) => {
            try {
                if (updates.group_id || updates.user_id) {
                    const { data, error } = await supabase
                        .from("group_memberships")
                        .update(updates)
                        .eq("group_id", updates.group_id!)
                        .eq("user_id", updates.user_id!)
                        .select()
                        .single();
                    if (error) throw error;
                    return data;
                }
                if (updates.id) {
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
                }
            } catch (error) {
                console.error("Mutation error:", error);
            }
            return;
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
