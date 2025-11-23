"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import { getInitials } from "@/lib/helpers";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

type GroupMembershipRow =
    Database["public"]["Tables"]["group_memberships"]["Row"];
type PickedGM = Pick<GroupMembershipRow, "group_id"> | null;
type GroupsRow = Database["public"]["Tables"]["groups"]["Row"];

type GroupMembershipWithStats = PickedGM & {
    groups: GroupsRow;
};

function SelectGroup({
    groups,
    groupId,
    setGroupId,
}: {
    groups: GroupMembershipWithStats[];
    groupId: string | undefined;
    setGroupId: (g: string) => void;
}) {
    const [groupName, setGroupName] = useState<string>();
    const [isSelect, setIsSelect] = useState(false);
    useEffect(() => {
        const cookie_groupId = Cookies.get("set_group");
        const groupExists = groups.filter(
            (val) => val.group_id === cookie_groupId
        )[0];
        console.log(groupExists);

        if (groupExists) {
            setGroupId(groupExists.group_id);
            setGroupName(groupExists.groups.name);
        } else {
            setGroupId(groups[0].group_id);
            setGroupName(groups[0].groups.name);
            Cookies.set("set_group", groups[0].group_id);
        }
    }, [groups, setGroupId]);

    function handleSelectGroup(group: GroupMembershipWithStats) {
        setGroupId(group.group_id);
        setGroupName(group.groups.name);
        Cookies.set("set_group", group.group_id);
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <h3 className="text-base font-semibold text-foreground">
                        Select group:
                    </h3>
                    <Button
                        variant="ghost"
                        onClick={() => setIsSelect(!isSelect)}
                        className="font-bold text-lg"
                    >
                        {groupName}
                        {isSelect ? (
                            <Icon
                                icon="basil:caret-up-solid"
                                className="size-6 ml-1"
                            />
                        ) : (
                            <Icon
                                icon="basil:caret-down-solid"
                                className="size-6 ml-1"
                            />
                        )}
                    </Button>
                </div>
            </div>

            <GroupsFilter
                groups={groups}
                groupId={groupId}
                onSelectGroup={handleSelectGroup}
                isSelected={isSelect}
            />
        </motion.section>
    );
}

export default SelectGroup;

function GroupsFilter({
    groups,
    groupId,
    onSelectGroup,
    isSelected,
}: {
    groups: GroupMembershipWithStats[];
    groupId?: string;
    onSelectGroup: (group: GroupMembershipWithStats) => void;
    isSelected: boolean;
}) {
    if (!isSelected) return;
    return (
        <div className="flex gap-2 overflow-x-auto py-2 px-4">
            {groups.map((group, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div
                        onClick={() => onSelectGroup(group)}
                        className={`w-10 aspect-square p-1 rounded-full flex border justify-center items-center relative ${
                            group.group_id === groupId
                                ? "scale-125 transition border-2 border-green-600 bg-green-200 shadow-2xl"
                                : ""
                        }`}
                    >
                        {group.groups.badge && (
                            <Icon
                                icon={group.groups.badge}
                                className="h-full w-full"
                                style={{
                                    color: `${group.groups.background_color}`,
                                }}
                            />
                        )}
                        <h1
                            style={{
                                color: `${group.groups.foreground_color}`,
                            }}
                            className="font-black text-white absolute mx-auto text-xs"
                        >
                            {getInitials(group.groups.name || "FC")}
                        </h1>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
