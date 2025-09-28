"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import MenuOverlay from "./MenuOverlay";
import { User } from "@supabase/supabase-js";

export function Navigation() {
    const supabase = createClient();
    const [user, setUser] = useState<User>();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error);
            } else {
                setUser(data.user);
            }
        };

        fetchUser();
    }, [supabase]);

    console.log("Current user:", user);

    return (
        <>
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-soft"
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-3"
                        >
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Icon
                                    icon="mdi:star-circle"
                                    className="w-6 h-6 text-primary-foreground"
                                />
                            </div>
                            <h1 className="text-xl font-bold text-card-foreground">
                                {user ? user.email : "PlayerRate"}
                            </h1>
                        </motion.div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Icon
                                icon="mdi:dots-horizontal"
                                className="w-5 h-5 text-muted-foreground"
                            />
                        </Button>
                    </div>
                </div>
            </motion.header>
            <MenuOverlay
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                user={user}
            />
        </>
    );
}
