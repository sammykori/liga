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
            if (!updates.id) throw new Error("No membershipId provided");
            if (updates.group_id || updates.user_id)
                throw new Error("Mutation not allowed on group_id or user_id");
            const { data, error } = await supabase
                .from("group_memberships")
                .update(updates)
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
                queryKey: ["groupPlayers", updatedGroup.group_id],
            });
        },
    });
}
