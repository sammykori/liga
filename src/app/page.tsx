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
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import EmptyScreen from "@/components/EmptyScreen";
import { JoinGroupModal } from "@/components/JoinGroupModal";

export default function Home() {
    const supabase = createClient();
    const [groupId, setGroupId] = useState<string>();
    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const [openJoinModal, setOpenJoinModal] = useState(false);

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id);

    useEffect(() => {
        async function checkPendingJoin() {
            if (!user) return;
            const code = localStorage.getItem("pendingJoinCode");
            if (!code) {
                return;
            }

            const { data: group } = await supabase
                .from("groups")
                .select("id")
                .eq("join_code", code)
                .maybeSingle();

            if (group) {
                const { data: request, error } = await supabase
                    .from("group_join_requests")
                    .insert({ group_id: group.id, user_id: user.id });

                if (error) {
                    console.error("Join request error:", error);
                    localStorage.removeItem("pendingJoinCode");
                    return;
                }
                if (request) {
                    console.log("Join request created:", request);
                    localStorage.removeItem("pendingJoinCode");
                    setOpenJoinModal(true);
                }
            } else {
                console.error("No group by joincode found");
            }
        }

        checkPendingJoin();
    }, [supabase, user]);
    if (isUserLoading || isGroupsLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="w-full md:max-w-sm mx-auto shadow-2xl min-h-screen bg-background pb-20 relative">
            <Navigation />
            {groups && groups.length < 1 ? (
                <EmptyScreen />
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
                    <LiveMatchesCarousel groupId={groupId} />

                    {/* Upcoming Matches Section */}
                    <UpcomingMatches groupId={groupId} />

                    {/* Top Players Section */}
                    <TopPlayers groupId={groupId} />
                </div>
            )}
            <JoinGroupModal
                open={openJoinModal}
                onOpenChange={setOpenJoinModal}
            />
            <BottomNavigation />
        </div>
    );
}
