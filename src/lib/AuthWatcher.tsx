"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useMatchRealtime } from "@/hooks/useMatchRealTime";

export function AuthWatcher() {
    const supabase = createClient();
    const queryClient = useQueryClient();
    useMatchRealtime();

    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange(() => {
            queryClient.invalidateQueries({ queryKey: ["auth-user"] });
        });

        return () => subscription.subscription.unsubscribe();
    }, [queryClient, supabase]);

    return null; // doesn’t render anything
}
