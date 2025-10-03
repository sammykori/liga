"use client";
import { Navigation } from "@/components/Navigation";
import { Icon } from "@iconify/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingMatches from "@/components/sections/home/UpcomingMatches";
import TopPlayers from "@/components/sections/home/TopPlayers";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Database } from "@/types/database";

type Group = Database["public"]["Tables"]["groups"]["Row"];
function Page() {
    const supabase = createClient();
    const { groupId } = useParams<{ groupId: string }>();
    const [groupData, setGroupData] = useState<Group>();
    const router = useRouter();
    console.log(groupId);
    useEffect(() => {
        async function fetchGroup() {
            const { data, error } = await supabase
                .from("groups")
                .select("*")
                .eq("id", groupId)
                .single();

            if (error) {
                console.log(error);
                return router.push("/404");
            }
            setGroupData(data);
        }
        fetchGroup();
    }, [groupId, router, supabase]);
    if (!groupData) {
        return;
    }
    return (
        <div className="bg-black w-full h-screen min-h-screen text-white">
            <Navigation variant="action" />
            <div className="w-full flex flex-col gap-4">
                <div className="w-full flex justify-between items-end p-4">
                    <div>
                        <h1 className="font-bold text-2xl">
                            {groupData?.name}
                        </h1>
                        <p className="text-sm">{groupData?.country}</p>
                        <p className="text-xs italic line-clamp-3">
                            {groupData?.description}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-gray-400/50 rounded-full size-8 p-2 flex items-center justify-center">
                            <Icon icon="mynaui:edit" className="size-4" />
                        </div>
                        <div className="bg-gray-400/50 rounded-full size-8 p-2 flex items-center justify-center">
                            <Icon icon="uil:qrcode-scan" className="size-4" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-4">
                    <div className="flex flex-col items-center text-black justify-center bg-white rounded-md w-32 aspect-video p-2">
                        <h1 className="font-bold text-2xl">24</h1>
                        <p className="text-sm">Matches played</p>
                    </div>
                    <div className="flex flex-col items-center text-black justify-center bg-white rounded-md w-32 aspect-video p-2">
                        <h1 className="font-bold text-2xl">24</h1>
                        <p className="text-sm">Available players</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-full flex flex-col gap-4 bg-white text-black rounded-t-2xl mt-6 justify-center items-center">
                <hr className="w-10 rounded-full h-1 bg-gray-200 my-2"></hr>
                <div className="w-full h-full p-4">
                    <Tabs defaultValue="matches" className="w-full h-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="matches">Matches</TabsTrigger>
                            <TabsTrigger value="squad">Squad</TabsTrigger>
                            <TabsTrigger value="teams">Teams</TabsTrigger>
                        </TabsList>
                        <TabsContent value="matches" className="w-full h-full">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <UpcomingMatches />
                            </div>
                        </TabsContent>
                        <TabsContent value="squad">
                            <div className="w-full h-full p-4 border rounded-xl">
                                <TopPlayers />
                            </div>
                        </TabsContent>
                        <TabsContent value="teams">Coming soon.</TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Page;
