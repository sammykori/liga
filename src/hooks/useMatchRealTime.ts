"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export function useMatchRealtime() {
    
    useEffect(() => {
        const supabase = createClient();
        const channel = supabase
            .channel("match-updates")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "notifications" },
                async (payload) => {
                    console.log("XXXXXXMatch updated:", payload);
                    console.log(
                        `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`
                    );

                    //Forward update to your Edge Function
                    try {
                        await fetch("/api/sendPush", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });
                    } catch (err) {
                        console.error("Error sending notification:", err);
                    }
                }
            )
            .subscribe((status) => {
                console.log("Realtime channel status:", status);
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);
}
