"use client";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuthUser } from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen";
import dayjs from "dayjs";
import relativeTime from "../../../../node_modules/dayjs/plugin/relativeTime";
import EmptyScreen from "@/components/EmptyScreen";
import { useRouter } from "next/navigation";
import { usePushNotifications } from "@/lib/PushNotificationProvider";
import { Button } from "@/components/ui/button";
dayjs.extend(relativeTime);

export default function Notifications() {
    const { isSupported, subscription, subscribeToPush } =
        usePushNotifications();
    console.log(subscription);
    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const router = useRouter();
    const { data: notifications, isLoading: isNotificationsLoading } =
        useNotifications(user?.id);

    function handleClick(link: string | null) {
        if (!link) return;
        router.push(link);
    }
    if (isUserLoading || isNotificationsLoading) {
        return <LoadingScreen />;
    }
    if (!notifications || notifications.length < 1) {
        return (
            <EmptyScreen
                title="No Notifications Yet"
                icon="tabler:bell-x"
                desc={`You haven't recieved any notifications yet. Get started by
                    creating your first group.`}
            />
        );
    }
    return (
        <div className="container mx-auto px-4 pt-4 pb-8 overflow-hidden">
            {!isSupported && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-xl shadow-xl p-4 mb-4 flex gap-2"
                >
                    <Icon
                        icon="famicons:notifications-off-outline"
                        className="size-10"
                    />
                    <p>Push notifications are not supported in this browser.</p>
                </motion.section>
            )}
            {!subscription && (
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full rounded-xl shadow-xl p-4 mb-4 flex gap-2"
                >
                    <Icon
                        icon="famicons:notifications-off-outline"
                        className="size-10"
                    />
                    <p>You are not subscribed to push notifications.</p>
                    <Button onClick={() => subscribeToPush()}>Subscribe</Button>
                </motion.section>
            )}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <h2 className="text-sm font-medium text-muted-foreground mb-4">
                        Latest
                    </h2>
                </div>

                <div className="space-y-3">
                    {notifications &&
                        notifications.map((notification, index) => (
                            <motion.div
                                key={notification.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                                onClick={() => handleClick(notification.link)}
                            >
                                <Card className="p-4 hover:shadow-medium transition-all">
                                    <div className="flex items-center gap-4">
                                        <Icon
                                            icon="noto:goal-net"
                                            className={`w-5 h-5`}
                                        />
                                        <div className="flex-1">
                                            <p className="text-sm text-foreground">
                                                {notification.title} in{" "}
                                                <span className="font-bold">
                                                    {notification.groups?.name}
                                                </span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {dayjs(
                                                    notification.created_at
                                                ).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                </div>

                <div className="mt-8">
                    <h2 className="text-sm font-medium text-muted-foreground mb-4">
                        Older
                    </h2>
                    <div className="space-y-3">
                        {notifications &&
                            notifications.map((notification, index) => (
                                <motion.div
                                    key={`older-${notification.id}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: (index + 4) * 0.1,
                                    }}
                                >
                                    <Card className="p-4 hover:shadow-medium transition-all">
                                        <div className="flex items-center gap-4">
                                            <Icon
                                                icon="noto:goal-net"
                                                className={`w-5 h-5`}
                                            />
                                            <div className="flex-1">
                                                <p className="text-sm text-foreground">
                                                    {notification.title} in{" "}
                                                    <span className="font-bold">
                                                        {
                                                            notification.groups
                                                                ?.name
                                                        }
                                                    </span>
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {dayjs(
                                                        notification.created_at
                                                    ).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
