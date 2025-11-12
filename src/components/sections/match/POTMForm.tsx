import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { type Database } from "@/types/database";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateMatchResponse } from "@/hooks/mutations/useUpdateMatchResponse";
import { useGroupMatchResponse } from "@/hooks/useGroupMatchResponse";
import { createClient } from "@/utils/supabase/client";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getInitials } from "@/lib/helpers";
import { useEffect, useState } from "react";
const formSchema = z.object({
    player_id: z.uuid(),
});

type MatchResponse = Database["public"]["Tables"]["match_responses"]["Row"];
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
type MatchResponseProfile = MatchResponse & {
    profiles: Pick<Profiles, "username" | "full_name"> | null;
};

type MainInfoFormProps = {
    matchId: string;
    responseDate: MatchResponse;
    closeModal: (o: boolean) => void;
};
function PotmForm({ matchId, responseDate, closeModal }: MainInfoFormProps) {
    const updateMatchResponse = useUpdateMatchResponse();
    const supabase = createClient();
    const [filteredResponses, setFilteredResponses] =
        useState<MatchResponseProfile[]>();
    const { data: groupResponse } = useGroupMatchResponse(matchId);
    const { data: user } = useAuthUser();
    console.log(user?.id);

    useEffect(() => {
        const filtered = groupResponse?.filter((player) => {
            return player.user_id !== user?.id;
        });
        console.log(filtered);
        setFilteredResponses(filtered);
    }, [groupResponse, user]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!groupResponse || !matchId || !user || !responseDate) return;

        try {
            await supabase.from("match_votes").insert({
                match_id: matchId!,
                voter_id: user.id!,
                player_id: values.player_id,
            });
            await updateMatchResponse.mutateAsync({
                id: responseDate?.id,
                voted: true,
            });

            toast.success("Vote submitted Sucessfully");
            closeModal(false);
        } catch (error) {
            console.error("Vote submission failed:", error);
            toast.error("Failed to vote");
        }
        console.log(values);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    return (
        <div className="">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="player_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Player</FormLabel>
                                {filteredResponses ? (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {filteredResponses.map(
                                                (players, index) => {
                                                    if (!players.profiles)
                                                        return;
                                                    return (
                                                        <SelectItem
                                                            value={
                                                                players.user_id!
                                                            }
                                                            key={index}
                                                        >
                                                            <Avatar>
                                                                <AvatarImage src="/images/avatar.jpeg" />
                                                                <AvatarFallback>
                                                                    {getInitials(
                                                                        players
                                                                            .profiles
                                                                            .full_name!
                                                                    )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            {
                                                                players.profiles
                                                                    ?.username
                                                            }
                                                        </SelectItem>
                                                    );
                                                }
                                            )}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    <p>No players available to vote for</p>
                                )}

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full mt-6">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default PotmForm;
