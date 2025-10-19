import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import dayjs from "dayjs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import MoreInfoForm from "./MoreInfoForm";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

function MoreInfo({ stats }: { stats: Profile }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="bg-muted/30 rounded-2xl p-4 mb-6">
            <div className="w-full flex justify-between">
                <p className="font-medium">More Player Info</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 mt-2">
                <div className="flex flex-col  justify-center items-center">
                    <p className="text-gray-400">Age</p>
                    <p>
                        <span className="text-4xl">
                            {stats?.dob
                                ? dayjs().diff(dayjs(stats?.dob), "year")
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
                        <span className="text-4xl">{stats?.height || "-"}</span>
                        <span className="text-gray-400 text-xs font-medium">
                            {stats.measurement_system === "si" ? "cm" : "ft"}
                        </span>
                    </p>
                </div>
                <div className="flex flex-col  justify-center items-center">
                    <p className="text-gray-400">Weight</p>
                    <p>
                        <span className="text-4xl">{stats?.weight || "-"}</span>
                        <span className="text-gray-400 text-xs font-medium">
                            {stats.measurement_system === "si" ? "kg" : "lb"}
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
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger className="w-full flex justify-center items-center px-4 ">
                        <Icon icon="mynaui:edit" className="size-4" />
                        <span className="text-sm font-medium ml-2">Edit</span>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Player Info</DialogTitle>

                            <MoreInfoForm stats={stats} closeModal={setOpen} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default MoreInfo;
