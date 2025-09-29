import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import dayjs from "dayjs";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

function MoreInfo({ stats }: { stats?: Profile }) {
    return (
        <div className="bg-muted/30 rounded-2xl p-4 mb-6">
            <Collapsible>
                <CollapsibleTrigger className="w-full">
                    <div className="w-full flex justify-between">
                        <p className="font-medium">More Player Info</p>
                        <Icon icon="mdi:chevron-down" className="float-right" />
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="grid grid-cols-3 gap-4 mb-4 mt-2">
                        <div className="flex flex-col  justify-center items-center">
                            <p className="text-gray-400">Age</p>
                            <p>
                                <span className="text-4xl">
                                    {stats?.dob
                                        ? dayjs().diff(
                                              dayjs(stats?.dob),
                                              "year"
                                          )
                                        : "-"}
                                </span>
                                <span className="text-gray-400 text-xs font-medium">
                                    yo
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col  justify-center items-center">
                            <p className="text-gray-400">Height</p>
                            <p>
                                <span className="text-4xl">
                                    {stats?.height || "-"}
                                </span>
                                <span className="text-gray-400 text-xs font-medium">
                                    cm
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col  justify-center items-center">
                            <p className="text-gray-400">Weight</p>
                            <p>
                                <span className="text-4xl">
                                    {stats?.weight || "-"}
                                </span>
                                <span className="text-gray-400 text-xs font-medium">
                                    kg
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col  justify-center items-center">
                            <p className="text-gray-400">Foot</p>
                            <p>
                                <span className="text-4xl">
                                    {stats?.foot === "right"
                                        ? "R"
                                        : stats?.foot == "left"
                                        ? "L"
                                        : stats?.foot === "both"
                                        ? "L&R"
                                        : "-"}
                                </span>
                                <span className="text-gray-400 text-xs font-medium"></span>
                            </p>
                        </div>
                        <div className="flex flex-col  justify-center items-center">
                            <p className="text-gray-400">Sex</p>
                            <p>
                                <span className="text-4xl">
                                    {stats?.sex === "male"
                                        ? "M"
                                        : stats?.sex === "female"
                                        ? "F"
                                        : "-"}
                                </span>
                                <span className="text-gray-400 text-xs font-medium"></span>
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex justify-center items-center bg-white border border-gray-500/50 rounded-full p-1 backdrop-blur">
                        <Icon icon="mynaui:edit" className="size-4" />
                        <span className="text-sm font-medium ml-2">Edit</span>
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}

export default MoreInfo;
