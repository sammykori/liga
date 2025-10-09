import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Database } from "@/types/database";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TeamEditForm from "./sections/group/TeamEditForm";
import { useState } from "react";

type GroupTeams = Database["public"]["Tables"]["group_teams"]["Row"];

interface TeamsCardProps {
    team: GroupTeams;
    role: string | null;
    variant?: "simple" | "compact";
}

export function TeamCard({ team, role, variant = "simple" }: TeamsCardProps) {
    const [open, setOpen] = useState<boolean>();
    return (
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Card className="p-4 shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                            <Icon
                                icon="ion:shirt"
                                className={`size-8`}
                                color={team.color}
                            />
                        </div>
                        <div>
                            <h3 className="font-semibold text-xs text-card-foreground">
                                {team.name}
                            </h3>
                        </div>
                    </div>
                    {role !== "user" && (
                        <div className="flex items-center gap-3">
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger>
                                    {" "}
                                    <div className="bg-gray-200 p-2 rounded-full size-8 items-center justify-center">
                                        <Icon icon="mynaui:edit" />
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Edit Team</DialogTitle>
                                    </DialogHeader>
                                    <TeamEditForm
                                        data={team}
                                        closeModal={setOpen}
                                    />
                                </DialogContent>
                            </Dialog>
                            <AlertDialog>
                                <AlertDialogTrigger>
                                    {" "}
                                    <div className="bg-red-200 p-2 rounded-full size-8 items-center justify-center">
                                        <Icon icon="fluent:delete-20-regular" />
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This
                                            will permanently delete your account
                                            and remove your data from our
                                            servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    )}
                </div>
            </Card>
        </motion.div>
    );
}
