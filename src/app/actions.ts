"use server";

import webpush from "web-push";
import { createClient } from "@/utils/supabase/client";

webpush.setVapidDetails(
    "mailto:sammykori72@gmail.com",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(
    sub: PushSubscription,
    userId: string
) {
    const supabase = createClient();
    subscription = sub;
    const PushSubscription = sub as unknown as webpush.PushSubscription;
    try {
        
        const { error } = await supabase.from("push_subscriptions").upsert(
            {
                user_id: userId,
                endpoint: PushSubscription.endpoint,
                p256dh: PushSubscription.keys.p256dh,
                auth: PushSubscription.keys.auth,
            },
            { onConflict: "endpoint" }
        );

        if (error) {
            console.error("Error saving subscription:", error);
            return { success: false, error };
        }
        return { success: true };
    } catch (error) {
        console.error("Subscription Upload Error:", error);
    }

}

export async function unsubscribeUser() {
    const supabase = createClient();
    if (subscription) {
        await supabase
            .from("push_subscriptions")
            .delete()
            .eq("endpoint", subscription.endpoint);
    }
    subscription = null;

    return { success: true };
}

export async function sendNotification(sub: PushSubscription, message: string) {
    if (!sub) {
        throw new Error("No subscription available");
    }
    console.log("notme", sub, message);
    const PushSubscription = sub as unknown as webpush.PushSubscription;
    try {
        await webpush.sendNotification(
            PushSubscription,
            JSON.stringify({
                title: "Test Notification",
                body: message,
                icon: "/icon.png",
            })
        );
        return { success: true };
    } catch (error) {
        console.error("Error sending push notification:", error);
        return { success: false, error: "Failed to send notification" };
    }
}
