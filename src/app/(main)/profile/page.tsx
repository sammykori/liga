"use client";
import { motion } from "framer-motion";
import ProfileImage from "@/components/sections/profile/ProfileImage";
import MainInfo from "@/components/sections/profile/MainInfo";
import MoreInfo from "@/components/sections/profile/MoreInfo";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function Profile() {
    const supabase = createClient();
    const [user, setUser] = useState<User>();
    const [profileStats, setProfileStats] = useState<Profile>();

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

    useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user?.id)
                    .single();
                if (error) {
                    console.error("Error fetching user:", error);
                } else {
                    setProfileStats(data);
                }
            };
            fetchProfile();
        }
    }, [user, supabase]);

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full flex flex-col md:flex-row">
                    {/* Profile Header */}
                    <div className="w-full md:w-2/5 xl:w-1/5 md:pl-6">
                        <ProfileImage />
                    </div>

                    {/* Main Info */}
                    {/* Match Stats */}
                    <div className="w-full md:w-3/5 xl:w-4/5 md:pl-6">
                        <MainInfo stats={profileStats} />

                        {/* More Info */}
                        <MoreInfo stats={profileStats} />
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
