import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdatePlayerResponse =
    Database["public"]["Tables"]["match_responses"]["Update"];

export function useUpdateMatchResponse() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdatePlayerResponse) => {
            if (!updates.id) throw new Error("No groupId provided");
            const { data, error } = await supabase
                .from("match_responses")
                .update(updates)
                .eq("id", updates.id)
                .select()
                .single();

            if (error) throw error;
            return data;
        },
        onSuccess: (updatedResponse) => {
            // Update cached profile for this user
            queryClient.setQueryData(
                [
                    "playerMatchResponse",
                    `${updatedResponse.match_id}${updatedResponse.user_id}`,
                ],
                updatedResponse
            );
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["groupResponses"] });
        },
    });
}
