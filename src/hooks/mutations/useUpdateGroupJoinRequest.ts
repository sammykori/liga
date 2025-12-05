import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateGroupJoinRequest = Database["public"]["Tables"]["group_join_requests"]["Update"]

export function useUpdateGroupJoinRequest() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateGroupJoinRequest) => {
            const { data, error } = await supabase
                .from("group_join_requests")
                .update({ status: updates.status })
                .eq("id", updates.id!)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedGroupRequest) => {
          
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["groupsRequests", updatedGroupRequest.group_id] });
        },
    });
}
