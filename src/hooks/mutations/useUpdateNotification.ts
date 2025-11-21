import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";

type UpdateNotificationInput = Database["public"]["Tables"]["notifications"]["Update"];

export function useUpdateNotification() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updates: UpdateNotificationInput) => {
            const { data, error } = await supabase
                .from("notifications")
                .update(updates)
                .eq("id", updates.id!)
                .select()
                .single();
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedNot) => {
            // Update cached profile for this user
            queryClient.setQueryData(["notification", updatedNot.id], updatedNot);
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
    });
}
