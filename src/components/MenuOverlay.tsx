import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { AuthError } from "@supabase/supabase-js";

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    user?: User;
}

interface MenuItem {
    icon: string;
    label: string;
    action: () => void;
    variant?: "default" | "destructive";
}

interface MenuSection {
    title: string;
    items: MenuItem[];
}

export default function MenuOverlay({
    isOpen,
    onClose,
    user,
}: MenuOverlayProps) {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            onClose();
            router.push("/login");
        } catch (error) {
            if (error instanceof AuthError) {
                toast("Error signing out", {
                    description:
                        error.message || "An unexpected error occurred.",
                });
            }
        }
    };

    const menuSections: MenuSection[] = [
        {
            title: "Groups",
            items: [
                {
                    icon: "mdi:account-group",
                    label: "Baller FC",
                    action: () => {
                        onClose();
                        // Navigate to group details
                    },
                },
                {
                    icon: "mdi:account-group",
                    label: "Baller FC",
                    action: () => {
                        onClose();
                        // Navigate to group details
                    },
                },
            ],
        },
        {
            title: "Quick actions",
            items: [
                {
                    icon: "mdi:plus-circle",
                    label: "Create a new group",
                    action: () => {
                        onClose();
                        // Navigate to create group
                    },
                },
                {
                    icon: "mdi:soccer",
                    label: "Create a new match",
                    action: () => {
                        onClose();
                        // Navigate to create match
                    },
                },
            ],
        },
        {
            title: "Pages",
            items: [
                {
                    icon: "mdi:information",
                    label: "About",
                    action: () => {
                        onClose();
                        router.push("/about");
                    },
                },
                {
                    icon: "mdi:shield-account",
                    label: "Privacy Policy",
                    action: () => {
                        onClose();
                        router.push("/privacy");
                    },
                },
                {
                    icon: "mdi:help-circle",
                    label: "FAQ",
                    action: () => {
                        onClose();
                        router.push("/faq");
                    },
                },
            ],
        },
        {
            title: "Logout",
            items: [
                {
                    icon: "mdi:logout",
                    label: "Signout",
                    action: handleLogout,
                    variant: "destructive" as const,
                },
            ],
        },
    ];

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="relative h-full overflow-y-auto pb-20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                                <AvatarImage
                                    src={user?.user_metadata?.avatar_url}
                                />
                                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                                    {user?.user_metadata?.name?.charAt(0) ||
                                        user?.email?.charAt(0) ||
                                        "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Welcome Back,
                                </p>
                                <h2 className="text-lg font-semibold text-foreground">
                                    {user?.user_metadata?.name ||
                                        user?.email ||
                                        "User"}
                                </h2>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Icon icon="mdi:close" className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Menu Sections */}
                    <div className="p-6 space-y-8">
                        {menuSections.map((section) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                <h3 className="text-lg font-semibold text-foreground mb-4">
                                    {section.title}
                                </h3>

                                <div className="space-y-2">
                                    {section.items.map((item, index) => (
                                        <motion.button
                                            key={`${item.label}-${index}`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={item.action}
                                            className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors ${
                                                item.variant === "destructive"
                                                    ? "hover:bg-destructive/10 text-destructive"
                                                    : "hover:bg-accent text-foreground"
                                            }`}
                                        >
                                            <div
                                                className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                    item.variant ===
                                                    "destructive"
                                                        ? "bg-destructive/20"
                                                        : "bg-muted"
                                                }`}
                                            >
                                                <Icon
                                                    icon={item.icon}
                                                    className={`w-6 h-6 ${
                                                        item.variant ===
                                                        "destructive"
                                                            ? "text-destructive"
                                                            : "text-muted-foreground"
                                                    }`}
                                                />
                                            </div>

                                            <span className="flex-1 text-left font-medium">
                                                {item.label}
                                            </span>

                                            <Icon
                                                icon="mdi:chevron-right"
                                                className={`w-5 h-5 ${
                                                    item.variant ===
                                                    "destructive"
                                                        ? "text-destructive"
                                                        : "text-muted-foreground"
                                                }`}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
