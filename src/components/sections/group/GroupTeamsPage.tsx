"use client";
import { motion } from "framer-motion";
import { TeamCard } from "@/components/TeamCard";
import { useGroupTeams } from "@/hooks/useGroupTeams";

function GroupTeamsPage({
    groupId,
    role,
}: {
    groupId: string;
    role: string | null;
}) {
    const { data: teams } = useGroupTeams(groupId);
    console.log(role);
    if (!teams) {
        return (
            <div>
                <h1>No Teams have been added yet.</h1>
            </div>
        );
    }
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <div className="grid grid-cols-1 gap-4">
                {teams &&
                    teams.slice(0, 6).map((team, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.3,
                                delay: index * 0.1,
                            }}
                        >
                            <TeamCard team={team} role={role} />
                        </motion.div>
                    ))}
            </div>
        </motion.section>
    );
}

export default GroupTeamsPage;
