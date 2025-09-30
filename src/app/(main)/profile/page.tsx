"use client";
import { motion } from "framer-motion";
import ProfileImage from "@/components/sections/profile/ProfileImage";
import MainInfo from "@/components/sections/profile/MainInfo";
import MoreInfo from "@/components/sections/profile/MoreInfo";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useProfile } from "@/hooks/useProfile";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export default function Profile() {
    const { data: user, isLoading: isUserLoading } = useAuthUser();

    const { data: profile, isLoading: isProfileLoading } = useProfile(
        user?.id,
        { enabled: !!user?.id }
    );
    if (!user || !profile) {
        return <p>Loading...</p>;
    }

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
                        <ProfileImage profileImage={profile?.profile_url} />
                    </div>

                    {/* Main Info */}
                    {/* Match Stats */}
                    <div className="w-full md:w-3/5 xl:w-4/5 md:pl-6">
                        <MainInfo stats={profile} />

                        {/* More Info */}
                        <MoreInfo stats={profile} />
                    </div>
                </div>
            </motion.section>
        </div>
    );
}
