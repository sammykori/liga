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
import { useGroup } from "@/hooks/useGroups";
import { getInitials } from "@/lib/helpers";
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

    const { data: groups } = useGroup(user?.id);
    console.log("groups", groups);

    const handleNavigation = (page: string) => {
        onClose();
        router.push(page);
    };

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
            title: "Quick actions",
            items: [
                {
                    icon: "mdi:plus-circle",
                    label: "Create a new group",
                    action: () => {
                        handleNavigation("/create-new-group");
                        // Navigate to create group
                    },
                },
                {
                    icon: "mdi:soccer",
                    label: "Create a new match",
                    action: () => {
                        handleNavigation("/create-new-match");
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
                        handleNavigation("about");
                    },
                },
                {
                    icon: "mdi:shield-account",
                    label: "Privacy Policy",
                    action: () => {
                        handleNavigation("privacy");
                    },
                },
                {
                    icon: "mdi:help-circle",
                    label: "FAQ",
                    action: () => {
                        handleNavigation("faq");
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
                    className="w-full max-w-sm mx-auto shadow-2xl relative h-full overflow-y-auto pb-20"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
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
                                <p className="text-xs text-muted-foreground">
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
                        {groups && groups.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.1,
                                }}
                            >
                                <h3 className="text-sm font-semibold text-foreground">
                                    Groups
                                </h3>

                                <div className="space-y-4 p-3">
                                    {groups.map((item, index) => (
                                        <motion.button
                                            key={`${item.groups.name}-${index}`}
                                            whileHover={{
                                                scale: 1.02,
                                            }}
                                            whileTap={{
                                                scale: 0.98,
                                            }}
                                            onClick={() =>
                                                router.push(
                                                    `/groups/${item.groups.id}`
                                                )
                                            }
                                            className={`w-full flex items-center gap-4 rounded-lg transition-colors ${"hover:bg-accent text-foreground"}`}
                                        >
                                            <div className="w-8 aspect-square border p-1  rounded-full flex justify-center items-center relative">
                                                {item.groups.badge && (
                                                    <Icon
                                                        icon={item.groups.badge}
                                                        className="h-full w-full"
                                                        style={{
                                                            color: `${item.groups.background_color}`,
                                                        }}
                                                    />
                                                )}
                                                <h1
                                                    style={{
                                                        color: `${item.groups.foreground_color}`,
                                                    }}
                                                    className="font-black text-black absolute mx-auto text-[10px]"
                                                >
                                                    {getInitials(
                                                        item.groups.name || "FC"
                                                    )}
                                                </h1>
                                            </div>

                                            <span className="flex-1 text-left font-medium">
                                                {item.groups.name}
                                            </span>

                                            <Icon
                                                icon="mdi:chevron-right"
                                                className={`w-5 h-5 ${"text-muted-foreground"}`}
                                            />
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                        {menuSections.map((section, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        delay: 0.1,
                                    }}
                                >
                                    <h3 className="text-sm font-semibold text-foreground">
                                        {section.title}
                                    </h3>

                                    <div className="space-y-4 p-3">
                                        {section.items.map((item, index) => {
                                            if (
                                                groups &&
                                                groups.length < 1 &&
                                                item.label ===
                                                    "Create a new match"
                                            ) {
                                                return;
                                            }
                                            return (
                                                <motion.button
                                                    key={`${item.label}-${index}`}
                                                    whileHover={{
                                                        scale: 1.02,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.98,
                                                    }}
                                                    onClick={item.action}
                                                    className={`w-full flex items-center gap-4 rounded-lg transition-colors ${
                                                        item.variant ===
                                                        "destructive"
                                                            ? "hover:bg-destructive/10 text-destructive"
                                                            : "hover:bg-accent text-foreground"
                                                    }`}
                                                >
                                                    <div
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                            item.variant ===
                                                            "destructive"
                                                                ? "bg-destructive/20"
                                                                : "bg-muted"
                                                        }`}
                                                    >
                                                        <Icon
                                                            icon={item.icon}
                                                            className={`w-4 h-4 ${
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
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
