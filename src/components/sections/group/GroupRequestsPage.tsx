import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGroupRequests } from "@/hooks/useGroupRequests";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "../../../../node_modules/dayjs/plugin/relativeTime";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useQueryClient, useMutation } from "@tanstack/react-query";

dayjs.extend(relativeTime);

function GroupRequestsPage() {
    const supabase = createClient();
    const { groupId } = useParams<{ groupId: string }>();
    const { data: groupRequests } = useGroupRequests(groupId);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (reqId: string) => {
            const { data, error } = await supabase
                .from("group_join_requests")
                .update({ status: "approved" })
                .eq("id", reqId);
            if (error) throw error;
            return data;
        },
        onSuccess: (updatedGroupRequest) => {
            // Update cached profile for this user
            queryClient.setQueryData(
                ["groupsRequests", groupId],
                updatedGroupRequest
            );
            // Optionally invalidate related queries
            queryClient.invalidateQueries({ queryKey: ["groupsRequests"] });
        },
    });

    if (groupRequests && groupRequests?.length < 1) {
        return (
            <div className="p-4">
                <h1>No Pending Requests.</h1>
            </div>
        );
    }

    async function approve(
        reqId: string,
        userId: string,
        userName: string | null
    ) {
        if (!groupRequests) return;
        try {
            mutation.mutate(reqId);

            const { data, error } = await supabase
                .from("group_memberships")
                .insert({ group_id: groupId, user_id: userId, role: "user" })
                .single();

            // groupRequests.filter((req) => req.id !== reqId);
            if (error) {
                console.log(error);
            }
            if (data) {
                toast.success(`${userName || "User"} has been added to group!`);
            }
        } catch (error) {
            console.error("Error approving User request: ", error);
            toast.error(`Failed to add ${userName || "User"} to group!`);
        }
    }

    async function reject(reqId: string) {
        if (!groupRequests) return;

        await supabase
            .from("group_join_requests")
            .update({ status: "rejected" })
            .eq("id", reqId);
        groupRequests.filter((req) => req.id !== reqId);
    }

    return (
        <div className="container mx-auto px-4 pt-4 pb-8 overflow-hidden">
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-6">
                    <h2 className="text-sm font-medium text-muted-foreground mb-4">
                        Latest
                    </h2>
                </div>

                <div className="w-full space-y-3">
                    {groupRequests &&
                        groupRequests.map((request, index) => (
                            <motion.div
                                key={request.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                                className="w-full"
                            >
                                <Card className="w-full hover:shadow-medium transition-all py-3">
                                    <div className="flex px-4 items-start gap-4">
                                        <Avatar className="w-6 h-6">
                                            <AvatarFallback className="bg-muted text-xs">
                                                NK
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-xs text-foreground">
                                                <span className="font-medium">
                                                    Player
                                                </span>{" "}
                                                <span className="text-primary font-medium">
                                                    {request.profiles?.username}
                                                </span>{" "}
                                                <span className="font-medium">
                                                    request to join
                                                </span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {dayjs(
                                                    request.created_at
                                                ).fromNow()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className=" w-full grid grid-cols-2 px-4 gap-3">
                                        <Button
                                            onClick={() =>
                                                approve(
                                                    request.id,
                                                    request.user_id,
                                                    request.profiles?.username
                                                )
                                            }
                                            className="w-full text-xs"
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            onClick={() => reject(request.id)}
                                            className="w-full text-xs"
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                </div>
            </motion.section>
        </div>
    );
}

export default GroupRequestsPage;
