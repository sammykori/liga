"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";

function Page() {
    const supabase = createClient();
    const router = useRouter();
    const { join_code } = useParams<{ join_code: string }>();
    const [message, setMessage] = useState<{
        text: string;
        status: string;
        link: string;
        linkText: string;
    }>();

    useEffect(() => {
        async function handleJoin() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            // Lookup group by join_code
            const { data: group, error: groupError } = await supabase
                .from("groups")
                .select("id, name")
                .eq("join_code", join_code)
                .maybeSingle();

            if (!group || groupError) {
                toast.error("Invalid or expired join code.");
                return setMessage({
                    text: "Invalid or expired join code.",
                    status: "error",
                    link: "/login",
                    linkText: "Signup to create Profile and Join other groups",
                });
                // return router.push("/");
            }

            // If not signed in, redirect to login with code stored
            if (!session) {
                // localStorage.setItem("pendingJoinCode", join_code);
                Cookies.set("pendingJoinCode", join_code, { expires: 1 });
                return router.push("/login");
            }

            // Create join request
            const { error } = await supabase
                .from("group_join_requests")
                .insert({
                    group_id: group.id,
                    user_id: session.user.id,
                });

            if (error && error.code === "23505") {
                toast.error(
                    "You already requested to join this group. Wait for admin approval."
                );
                setMessage({
                    text: `You already requested to join this group. Wait for admin approval.`,
                    status: "error",
                    link: "/profile",
                    linkText: "Return home",
                });
            } else if (error) {
                console.error(error);
                toast.error("Something went wrong.");
                setMessage({
                    text: `Something went wrong.`,
                    status: "error",
                    link: "/profile",
                    linkText: "Return home",
                });
            } else {
                toast.success(
                    `Join request sent for ${group.name}. Wait for admin approval.`
                );
                setMessage({
                    text: `Join request sent for ${group.name}. Wait for admin approval.`,
                    status: "success",
                    link: "/profile",
                    linkText: "Return home",
                });
            }

            // router.push("/");
        }

        handleJoin();
    }, [join_code, router, supabase]);

    return (
        <div className="w-full min-h-screen p-6 flex flex-col justify-center items-center">
            <h1 className="font-medium text-center">
                Processing join request...
            </h1>
            <h1
                className={`text-2xl font-bold text-center ${
                    message?.status === "error"
                        ? "text-red-500"
                        : "text-green-500"
                }`}
            >
                {message?.text}
            </h1>
            {message && (
                <div className="flex flex-col justify-center items-center">
                    <Image
                        src="/images/player-waiting.png"
                        width={100}
                        height={100}
                        alt="Player Waiting"
                        className="w-40 h-auto"
                    />
                    <Link href={message.link}>
                        <Button variant="outline">{message.linkText}</Button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Page;
