"use client";
import { motion } from "framer-motion";
import SelectGroup from "@/components/sections/SelectGroup";
import LeaderTable from "@/components/sections/leaderboard/LeaderTable";
import { useGroup } from "@/hooks/useGroups";
import { useAuthUser } from "@/hooks/useAuthUser";
import LoadingScreen from "@/components/LoadingScreen";
import NoGroupData from "@/components/sections/home/NoGroupData";
import { useState } from "react";

export default function Leaderboard() {
    const [groupId, setGroupId] = useState<string>();

    const { data: user, isLoading: isUserLoading } = useAuthUser();

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id);

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
                        {groups && (
                            <SelectGroup
                                groups={groups}
                                groupId={groupId}
                                setGroupId={setGroupId}
                            />
                        )}

                        {/* Featured Leader Card */}
                        {/* <Stats /> */}

                        {/* Leaderboard Table */}
                    </motion.section>
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <LeaderTable groupId={groupId} />
                    </motion.section>
                </div>
            )}
        </>
    );
}
