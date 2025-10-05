"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

const passwordSchema = z
    .object({
        password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(128, { message: "Password must be less than 128 characters" }),
        confirmPassword: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(128, { message: "Password must be less than 128 characters" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export default function Page() {
    const supabase = createClient();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        // Check if there's a session (user came from reset link)
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (!session) {
                router.push("/auth");
            }
        };
        checkSession();
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const validation = passwordSchema.safeParse(formData);
            if (!validation.success) {
                toast("Validation error", {
                    description: validation.error?.message,
                });
                return;
            }

            const { error } = await supabase.auth.updateUser({
                password: formData.password,
            });

            if (error) throw error;

            toast("Password updated successfully", {
                description: "Your password has been changed.",
            });

            router.push("/");
        } catch (error: any) {
            toast("Error updating password", {
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-border shadow-soft">
                    <CardHeader className="text-center space-y-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto"
                        >
                            <Icon
                                icon="mdi:lock-reset"
                                className="w-8 h-8 text-primary-foreground"
                            />
                        </motion.div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-card-foreground">
                                Change Password
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mt-2">
                                Enter your new password below
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label
                                    htmlFor="password"
                                    className="text-card-foreground"
                                >
                                    New Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your new password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="mt-1"
                                />
                            </div>

                            <div>
                                <Label
                                    htmlFor="confirmPassword"
                                    className="text-card-foreground"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm your new password"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        handleInputChange(
                                            "confirmPassword",
                                            e.target.value
                                        )
                                    }
                                    required
                                    className="mt-1"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full hover:opacity-90 transition-opacity"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Icon
                                        icon="mdi:loading"
                                        className="w-4 h-4 animate-spin"
                                    />
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                type="button"
                                onClick={() => router.push("/")}
                                className="text-sm text-muted-foreground hover:text-primary"
                            >
                                ← Back to home
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
