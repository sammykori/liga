"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    subscribeUser,
    unsubscribeUser,
    sendNotification,
} from "@/app/actions";
import { useAuthUser } from "@/hooks/useAuthUser";

function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

type PushNotificationContextType = {
    isSupported: boolean;
    subscription: PushSubscription | null;
    subscribeToPush: () => Promise<void>;
    unsubscribeFromPush: () => Promise<void>;
    sendTestNotification: (message: string) => Promise<void>;
};

const PushNotificationContext =
    createContext<PushNotificationContextType | null>(null);

export function PushNotificationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null
    );
    const { data: user } = useAuthUser();

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            setIsSupported(true);
            registerServiceWorker();
        }
    }, []);

    async function registerServiceWorker() {
        const registration = await navigator.serviceWorker.register("/sw.js", {
            scope: "/",
            updateViaCache: "none",
        });
        const sub = await registration.pushManager.getSubscription();
        setSubscription(sub);
    }

    async function subscribeToPush() {
        if (!user) return;
        const registration = await navigator.serviceWorker.ready;
        const sub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
                process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
            ),
        });
        setSubscription(sub);
        await subscribeUser(sub, user.id);
    }

    async function unsubscribeFromPush() {
        await subscription?.unsubscribe();
        setSubscription(null);
        await unsubscribeUser();
    }

    async function sendTestNotification(message: string) {
        if (subscription) {
            console.log("hook", subscription);
            await sendNotification(subscription, message);
        }
    }

    return (
        <PushNotificationContext.Provider
            value={{
                isSupported,
                subscription,
                subscribeToPush,
                unsubscribeFromPush,
                sendTestNotification,
            }}
        >
            {children}
        </PushNotificationContext.Provider>
    );
}

export function usePushNotifications() {
    const ctx = useContext(PushNotificationContext);
    if (!ctx)
        throw new Error(
            "usePushNotifications must be used within PushNotificationProvider"
        );
    return ctx;
}
