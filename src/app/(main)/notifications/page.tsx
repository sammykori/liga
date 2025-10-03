"use client";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";

// Mock notifications data
const mockNotifications = [
    {
        id: "1",
        type: "user",
        title: "New user add to",
        message: "Ngolo Kante, Ngolo Kante",
        time: "3 min",
        icon: "mdi:account-plus",
        color: "text-green-500",
        unread: true,
    },
    {
        id: "2",
        type: "match",
        title: "New match created for",
        message: "Ngolo Kante, Ngolo Kante",
        time: "3 min",
        icon: "mdi:soccer",
        color: "text-purple-500",
        unread: false,
    },
    {
        id: "3",
        type: "potm",
        title: "You have been voted POTM",
        message: "Baller FC Sunday Game, 22-04-2025",
        time: "3 min",
        icon: "mdi:trophy",
        color: "text-red-500",
        unread: false,
    },
    {
        id: "4",
        type: "potm",
        title: "You have been voted POTM",
        message: "Baller FC Sunday Game, Ngolo Kante",
        time: "3 min",
        icon: "mdi:account",
        color: "text-gray-500",
        unread: false,
    },
];

export default function Notifications() {
    return (
        <div className="container mx-auto px-4 pt-4 pb-8 overflow-hidden">
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
                    {mockNotifications.map((notification, index) => (
                        <motion.div
                            key={notification.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Card className="p-4 hover:shadow-medium transition-all">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback className="bg-muted">
                                            NK
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <p className="text-sm text-foreground">
                                            <span className="font-medium">
                                                {notification.title}
                                            </span>{" "}
                                            <span className="text-primary font-medium">
                                                Baller FC
                                            </span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {notification.message}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-muted-foreground">
                                            {notification.time}
                                        </span>
                                        <Icon
                                            icon={notification.icon}
                                            className={`w-5 h-5 ${notification.color}`}
                                        />
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
                        {mockNotifications
                            .slice(0, 2)
                            .map((notification, index) => (
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
                                            <Avatar className="w-12 h-12">
                                                <AvatarFallback className="bg-muted">
                                                    NK
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="text-sm text-foreground">
                                                    <span className="font-medium">
                                                        {notification.title}
                                                    </span>{" "}
                                                    <span className="text-primary font-medium">
                                                        Baller FC
                                                    </span>
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {notification.message}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-muted-foreground">
                                                    {notification.time}
                                                </span>
                                                <Icon
                                                    icon={notification.icon}
                                                    className={`w-5 h-5 ${notification.color}`}
                                                />
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
