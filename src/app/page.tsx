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

export default function Home() {
    const { data: user, isLoading: isUserLoading } = useAuthUser();

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id);
    console.log(groups);
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
                    {groups && <SelectGroup groups={groups} />}

                    {/* Live Match Section */}
                    <LiveMatchesCarousel />

                    {/* Upcoming Matches Section */}
                    <UpcomingMatches />

                    {/* Top Players Section */}
                    <TopPlayers />
                </div>
            )}

            <BottomNavigation />
        </div>
    );
}
