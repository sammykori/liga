"use client";
import { Navigation } from "@/components/Navigation";
import { BottomNavigation } from "@/components/BottomNavigation";
import LiveMatchesCarousel from "@/components/sections/home/LiveMatchesCarousel";
import SelectGroup from "@/components/sections/SelectGroup";
import UpcomingMatches from "@/components/sections/home/UpcomingMatches";
import TopPlayers from "@/components/sections/home/TopPlayers";
import { useGroup } from "@/hooks/useGroups";
import { useAuthUser } from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen";
import NoGroupData from "@/components/sections/home/NoGroupData";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
    const supabase = createClient();
    const [groupId, setGroupId] = useState<string>();
    const { data: user, isLoading: isUserLoading } = useAuthUser();

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id);

    useEffect(() => {
        async function checkPendingJoin() {
            const code = localStorage.getItem("pendingJoinCode");
            if (!code) return;

            const { data: group } = await supabase
                .from("groups")
                .select("id")
                .eq("join_code", code)
                .maybeSingle();

            if (user && group) {
                await supabase
                    .from("group_join_requests")
                    .insert({ group_id: group.id, user_id: user.id });
                localStorage.removeItem("pendingJoinCode");
                window.location.href = `/groups/${group.id}`;
            }
        }

        checkPendingJoin();
    }, []);
    if (isUserLoading || isGroupsLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-background pb-20 relative">
            <Navigation />

            {groups && groups?.length < 1 ? (
                <NoGroupData />
            ) : (
                <div className="container mx-auto px-4 pt-4 pb-8 space-y-8">
                    {/* Group Section */}
                    {groups && (
                        <SelectGroup
                            groups={groups}
                            groupId={groupId}
                            setGroupId={setGroupId}
                        />
                    )}

                    {/* Live Match Section */}
                    <LiveMatchesCarousel />

                    {/* Upcoming Matches Section */}
                    <UpcomingMatches groupId={groupId} />

                    {/* Top Players Section */}
                    <TopPlayers groupId={groupId} />
                </div>
            )}

            <BottomNavigation />
        </div>
    );
}
