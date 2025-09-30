"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export function AuthWatcher() {
    const supabase = createClient();
    const queryClient = useQueryClient();

    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange(() => {
            queryClient.invalidateQueries({ queryKey: ["auth-user"] });
        });

        return () => subscription.subscription.unsubscribe();
    }, [queryClient]);

    return null; // doesn’t render anything
}
