"use client";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

function MainInfo({ stats }: { stats?: Profile }) {
    console.log(stats);
    return (
        <div className="w-full bg-muted/30 rounded-2xl p-6 mb-6 text-center">
            <div className="flex flex-col xl:flex-row justify-around">
                <div className="">
                    <div className="flex items-center justify-center mb-4 gap-2">
                        <div className="px-2 rounded-md bg-amber-500 font-bold">
                            ST
                        </div>
                        <h2 className="text-xl font-bold text-foreground">
                            {stats?.first_name || "Player Name"}
                        </h2>
                    </div>

                    <div className="flex gap-4 justify-center mb-4">
                        <div className="bg-muted rounded-lg px-4 py-1 flex items-center gap-2">
                            <Icon icon="twemoji:flag-brazil" />
                            <span className="text-sm font-medium">
                                {stats?.country || "Country"}
                            </span>
                        </div>
                        <div className="bg-muted rounded-lg px-4 py-1 flex items-center gap-2">
                            <Icon icon="line-md:map-marker-loop" />
                            <span className="text-sm font-medium">
                                {" "}
                                {stats?.county_state_city || "Country"}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mb-4">
                        <h1>Bio</h1>
                        <p className="text-xs mt-1 text-left text-gray-400 line-clamp-2 italic">
                            {stats?.bio || "Write something about yourself..."}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center mb-4">
                        <div className=" px-4 py-1 flex flex-col items-center">
                            <h1 className="text-4xl font-semibold">
                                {stats?.rating}
                            </h1>
                            <span className="text-xs text-gray-400 font-medium">
                                Rating
                            </span>
                        </div>
                        <div className="px-4 py-1 flex flex-col items-center">
                            <h1 className="text-4xl font-semibold">
                                {stats?.points}
                            </h1>
                            <span className="text-xs text-gray-400 font-medium">
                                Points
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                        Match Stats
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 1 * 0.1,
                            }}
                            className="h-full w-full max-w-40"
                        >
                            <div className="w-full aspect-square rounded-lg p-4 flex flex-col justify-start items-center text-center bg-gradient-to-br from-purple-500 to-purple-100 text-white">
                                <p className="text-2xl font-bold">
                                    {stats?.matches_played}
                                </p>
                                <p className="text-xs text-purple-100">
                                    Matches played
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 1 * 0.1,
                            }}
                            className="h-full w-full max-w-40"
                        >
                            <div className="w-full aspect-square rounded-lg p-4 flex flex-col justify-start items-center text-center bg-gradient-to-br from-purple-500 to-purple-100 text-white">
                                <p className="text-2xl font-bold">
                                    {stats?.matches_won}
                                </p>
                                <p className="text-xs text-purple-100">
                                    Matches won
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.3,
                                delay: 1 * 0.1,
                            }}
                            className="h-full w-full max-w-40"
                        >
                            <div className="w-full aspect-square rounded-lg p-4 flex flex-col justify-start items-center text-center bg-gradient-to-br from-purple-500 to-purple-100 text-white">
                                <p className="text-2xl font-bold">
                                    {stats?.goals}
                                </p>
                                <p className="text-xs text-purple-100">
                                    Goals scored
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center bg-white border border-gray-500/50 rounded-full p-1 backdrop-blur">
                <Icon icon="mynaui:edit" className="size-4" />
                <span className="text-sm font-medium ml-2">Edit</span>
            </div>
        </div>
    );
}

export default MainInfo;
