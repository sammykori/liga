"use client";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNotifications } from "@/hooks/useNotifications";
import { Badge } from "./ui/badge";
import { useAuthUser } from "@/hooks/useAuthUser";

export function BottomNavigation() {
    const pathname = usePathname();
    const { data: user, isLoading: isUserLoading } = useAuthUser();

    const { data: notifications, isLoading } = useNotifications(user?.id);

    const navItems = [
        { path: "/", icon: "ri:football-fill", label: "Home" },
        {
            path: "/leaderboard",
            icon: "material-symbols:leaderboard-rounded",
            label: "Leaderboard",
        },
        {
            path: "/notifications",
            icon: "famicons:notifications",
            label: "Notification",
        },
        { path: "/profile", icon: "iconamoon:profile-bold", label: "Profile" },
    ];
    if (isLoading && !notifications) return;

    return (
        <div className="w-full max-w-sm mx-auto fixed bottom-0 left-0 right-0 z-50 p-4">
            <motion.nav
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-gray-100/50 backdrop-blur-lg h-16 rounded-full shadow-md mx-auto w-full flex justify-center items-center"
            >
                <div className="w-full flex items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className="flex flex-col items-center "
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`rounded-full transition-all duration-300 
                                       relative py-1`}
                                >
                                    <Icon
                                        icon={item.icon}
                                        className={`size-6 ${
                                            isActive
                                                ? "text-primary"
                                                : "text-muted-foreground"
                                        }`}
                                    />
                                    {item.path === "/notifications" &&
                                        !isLoading &&
                                        notifications &&
                                        notifications.length > 0 && (
                                            <Badge
                                                variant="destructive"
                                                className="absolute -top-1 -right-1 size-5 p-0 rounded-full flex items-center justify-center text-xs"
                                            >
                                                {
                                                    notifications.filter(
                                                        (n) => !n.read
                                                    ).length
                                                }
                                            </Badge>
                                        )}
                                    {/* {item.path === "/" && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-1 -right-1 size-3 p-0 rounded-full flex items-center justify-center text-xs animate-pulse"
                                        ></Badge>
                                    )} */}
                                </motion.div>
                                {/* <span
                                    className={`text-xs mt-1 transition-colors ${
                                        isActive
                                            ? "text-primary font-medium"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    {item.label}
                                </span> */}
                            </Link>
                        );
                    })}
                </div>
            </motion.nav>
        </div>
    );
}
