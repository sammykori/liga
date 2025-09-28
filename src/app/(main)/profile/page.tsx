"use client";
import { motion } from "framer-motion";
import ProfileImage from "@/components/sections/profile/ProfileImage";
import MainInfo from "@/components/sections/profile/MainInfo";
import MoreInfo from "@/components/sections/profile/MoreInfo";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect, use } from "react";

export default function Profile() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [profileStats, setProfileStats] = useState<any>(null);

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
    }, [user]);

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Profile Header */}
                <ProfileImage />

                {/* Main Info */}
                {/* Match Stats */}
                <MainInfo stats={profileStats} />

                {/* More Info */}
                <MoreInfo stats={profileStats} />
            </motion.section>
        </div>
    );
}
