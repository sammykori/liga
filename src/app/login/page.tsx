"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { z } from "zod";
import { useState, useEffect } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import lodash from "lodash";

const authSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" })
        .max(255, { message: "Email must be less than 255 characters" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(128, { message: "Password must be less than 128 characters" }),
    name: z
        .string()
        .trim()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(100, { message: "Name must be less than 100 characters" })
        .optional(),
});

type AuthMode = "login" | "signup" | "forgot-password";

export default function Auth() {
    const supabase = createClient();
    const navigate = useRouter();
    const searchParams = useSearchParams();
    const [mode, setMode] = useState<AuthMode>("login");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userName: "",
        dob: "",
    });

    useEffect(() => {
        const authMode = searchParams.get("mode") as AuthMode;
        if (
            authMode &&
            ["login", "signup", "forgot-password"].includes(authMode)
        ) {
            setMode(authMode);
        }
    }, [searchParams]);

    useEffect(() => {
        // Check if user is already logged in
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            if (session) {
                navigate.push("/");
            }
        };
        checkSession();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate.push("/");
            }
        });

        return () => subscription.unsubscribe();
    }, [navigate, supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (mode === "forgot-password") {
                const emailValidation = z
                    .string()
                    .email()
                    .safeParse(formData.email);
                if (!emailValidation.success) {
                    toast.error("Invalid email", {
                        description: emailValidation.error.message,
                    });
                    return;
                }

                const { error } = await supabase.auth.resetPasswordForEmail(
                    formData.email,
                    {
                        redirectTo: `${window.location.origin}`,
                    }
                );

                if (error) throw error;

                toast("Password reset email sent", {
                    description:
                        "Check your email for the password reset link.",
                });
                setMode("login");
            } else {
                const validation = authSchema.safeParse({
                    ...formData,
                    userName: mode === "signup" ? formData.userName : undefined,
                    dob: mode === "signup" ? formData.dob : undefined,
                });

                if (!validation.success) {
                    toast.error("Validation error", {
                        description: validation.error.message,
                    });
                    return;
                }

                if (mode === "signup") {
                    const { data, error } = await supabase.auth.signUp({
                        email: formData.email,
                        password: formData.password,
                        options: {
                            emailRedirectTo: `${window.location.origin}`,
                            data: {
                                givenName: formData.userName,
                                dob: formData.dob,
                            },
                        },
                    });
                    if (!data.user) {
                        console.warn(
                            "User not created: email may already exist."
                        );
                        toast.error("User not created:", {
                            description: "Email may already exist.",
                        });
                    }

                    if (error) {
                        console.error(error);

                        toast.error("Signup error:", {
                            description: error.name + ": " + error.message,
                        });
                    }

                    toast.success("Account created successfully", {
                        description:
                            "Please check your email to verify your account.",
                    });
                    setMode("login");
                } else {
                    const { error } = await supabase.auth.signInWithPassword({
                        email: formData.email,
                        password: formData.password,
                    });

                    if (error) {
                        console.error(error);

                        toast.error("Invalid username or password", {
                            description:
                                "Please check your email and password are correct.",
                        });
                    }

                    // Navigation is handled by auth state change
                }
            }
        } catch (error) {
            if (error instanceof PostgrestError) {
                toast.error("Authentication error", {
                    description:
                        error.message || "An unexpected error occurred.",
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const getTitle = () => {
        switch (mode) {
            case "signup":
                return "Create Account";
            case "forgot-password":
                return "Reset Password";
            default:
                return "Welcome Back";
        }
    };

    const getDescription = () => {
        switch (mode) {
            case "signup":
                return "Create your account to start rating players";
            case "forgot-password":
                return "Enter your email to receive a password reset link";
            default:
                return "Sign in to your account to continue";
        }
    };

    const handleCheckUsername = async (username: string) => {
        console.log(username);
        handleInputChange("username", username);
        if (username.length < 2) return;

        const { data, error } = await supabase
            .from("profiles")
            .select("id")
            .eq("username", username)
            .maybeSingle();

        if (error && error.code !== "PGRST116") {
            toast.error("Error checking username:", {
                description: error.message,
            });
            console.error("Error", error.message, error.details, error);
            return;
        }
        if (error) {
            console.error("Error", error.message, error.details, error);
        }

        if (data) {
            toast.error("Username already taken");
            console.log(data);
        }
    };
    const debouncedCheck = lodash.debounce(handleCheckUsername, 500);

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
                                icon="noto-v1:soccer-ball"
                                className="size-10 text-primary-foreground"
                            />
                        </motion.div>
                        <div>
                            <CardTitle className="text-2xl font-bold text-card-foreground">
                                {getTitle()}
                            </CardTitle>
                            <CardDescription className="text-muted-foreground mt-2">
                                {getDescription()}
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {mode === "signup" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <Label
                                                htmlFor="userName"
                                                className="text-card-foreground"
                                            >
                                                Username
                                            </Label>
                                            <Input
                                                id="userName"
                                                type="text"
                                                placeholder="Enter your username"
                                                onChange={(e) =>
                                                    debouncedCheck(
                                                        e.target.value
                                                    )
                                                }
                                                required={mode === "signup"}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label
                                                htmlFor="dob"
                                                className="text-card-foreground"
                                            >
                                                Date of Birth
                                            </Label>
                                            <Input
                                                id="dob"
                                                type="date"
                                                value={formData.dob}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "dob",
                                                        e.target.value
                                                    )
                                                }
                                                required={mode === "signup"}
                                                className="mt-1"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-card-foreground"
                                >
                                    Email
                                </Label>
                                <div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="mt-1"
                                    />
                                    <div>
                                        <Icon icon="" />
                                    </div>
                                </div>
                            </div>

                            {mode !== "forgot-password" && (
                                <div>
                                    <Label
                                        htmlFor="password"
                                        className="text-card-foreground"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
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
                            )}

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
                                ) : mode === "forgot-password" ? (
                                    "Send Reset Link"
                                ) : mode === "signup" ? (
                                    "Create Account"
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 space-y-3 text-center">
                            {mode === "login" && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setMode("forgot-password")
                                        }
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot your password?
                                    </button>
                                    <div className="text-sm text-muted-foreground">
                                        Don&apos;t have an account?{" "}
                                        <button
                                            type="button"
                                            onClick={() => setMode("signup")}
                                            className="text-primary hover:underline font-medium"
                                        >
                                            Sign up
                                        </button>
                                    </div>
                                </>
                            )}

                            {mode === "signup" && (
                                <div className="text-sm text-muted-foreground">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setMode("login")}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}

                            {mode === "forgot-password" && (
                                <div className="text-sm text-muted-foreground">
                                    Remember your password?{" "}
                                    <button
                                        type="button"
                                        onClick={() => setMode("login")}
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Sign in
                                    </button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
