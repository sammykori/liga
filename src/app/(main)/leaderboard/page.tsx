"use client";
import { motion } from "framer-motion";
import SelectGroup from "@/components/sections/SelectGroup";
import LeaderTable from "@/components/sections/leaderboard/LeaderTable";
import { useGroup } from "@/hooks/useGroups";
import { useAuthUser } from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen";
import NoGroupData from "@/components/sections/home/NoGroupData";

// Mock leaderboard data
const mockLeaderboard = [
    {
        id: "1",
        name: "Kevin De Bruyne",
        position: "Bournemouth, England",
        role: "Striker",
        gPts: 80,
        tPts: 20,
        mp: 3,
        w: 12,
        d: 20,
        rank: 1,
        rating: 24,
    },
    {
        id: "2",
        name: "Kevin De Bruyne",
        position: "Bournemouth, England",
        role: "Striker",
        gPts: 80,
        tPts: 20,
        mp: 3,
        w: 12,
        d: 20,
        rank: 2,
        rating: 22,
    },
    {
        id: "3",
        name: "Kevin De Bruyne",
        position: "Bournemouth, England",
        role: "Striker",
        gPts: 80,
        tPts: 20,
        mp: 3,
        w: 12,
        d: 20,
        rank: 3,
        rating: 21,
    },
    {
        id: "4",
        name: "Kevin De Bruyne",
        position: "Bournemouth, England",
        role: "Striker",
        gPts: 80,
        tPts: 20,
        mp: 3,
        w: 12,
        d: 20,
        rank: 4,
        rating: 20,
    },
    {
        id: "5",
        name: "Kevin De Bruyne",
        position: "Bournemouth, England",
        role: "Striker",
        gPts: 80,
        tPts: 20,
        mp: 3,
        w: 12,
        d: 20,
        rank: 5,
        rating: 19,
    },
];

export default function Leaderboard() {
    const { data: user, isLoading: isUserLoading } = useAuthUser();

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id);
    console.log(groups);
    if (isUserLoading || isGroupsLoading) {
        return <LoadingScreen />;
    }
    return (
        <>
            {groups && groups?.length < 1 ? (
                <NoGroupData />
            ) : (
                <div className="container mx-auto  pt-4 pb-8 overflow-hidden">
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="px-4"
                    >
                        {groups && <SelectGroup groups={groups} />}

                        {/* Featured Leader Card */}
                        {/* <Stats /> */}

                        {/* Leaderboard Table */}
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <LeaderTable data={mockLeaderboard} />
                    </motion.section>
                </div>
            )}
        </>
    );
}
