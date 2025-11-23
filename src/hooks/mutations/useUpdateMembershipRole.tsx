import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateGroupMembership =
    Database["public"]["Tables"]["group_memberships"]["Update"];

export function useUpdateMembershipRole() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateGroupMembership) => {
            try {
                if (updates.id) {
                    const { data, error } = await supabase
                        .from("group_memberships")
                        .update({
                            role: updates.role,
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
