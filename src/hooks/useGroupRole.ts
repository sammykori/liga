import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function useGroupRole(groupId?: string, userId?: string) {
    const [role, setRole] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const supabase = createClient();

    useEffect(() => {
        if (!groupId) return;
        if (!userId) return;

        async function fetchRole() {
            setLoading(true);
            setError(null);

            const { data, error: supaError } = await supabase
                .from("group_memberships")
                .select("role")
                .eq("group_id", groupId!)
                .eq("user_id", userId!)
                .maybeSingle();

            if (supaError) setError(supaError);
            else setRole(data?.role || null);

            setLoading(false);
        }

        fetchRole();
    }, [groupId, userId, supabase]);

    return { role, loading, error };
}
