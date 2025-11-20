"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useState } from "react";
import MenuOverlay from "./MenuOverlay";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Navigation({ variant }: { variant?: string }) {
    const { data: user } = useAuthUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`sticky top-0 z-50 ${
                    variant === "active" ? "bg-card/80" : ""
                } backdrop-blur-lg shadow-md`}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        {variant ? (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-3"
                            >
                                <div
                                    onClick={() => router.back()}
                                    className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"
                                >
                                    <Icon
                                        icon="famicons:arrow-back"
                                        className={`w-6 h-6 ${
                                            variant === "action"
                                                ? "text-gray-400"
                                                : "text-black"
                                        }`}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <Link href="/">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center"
                                >
                                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                        <Icon
                                            icon="noto-v1:soccer-ball"
                                            className="w-8 h-8"
                                        />
                                    </div>
                                    <h1 className="font-lobster text-4xl font-bold text-card-foreground">
                                        liga
                                    </h1>
                                </motion.div>
                            </Link>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Icon
                                icon="charm:menu-meatball"
                                className={`size-8 ${
                                    variant === "action"
                                        ? "text-white"
                                        : "text-muted-foreground"
                                }`}
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
