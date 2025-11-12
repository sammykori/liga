import { Input } from "@/components/ui/input";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGroupMatchResponse } from "@/hooks/useGroupMatchResponse";
import { createClient } from "@/utils/supabase/client";
import { Database } from "@/types/database";
import { ChevronsUpDown } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
    team_id: z.uuid(),
    minute: z.number().optional(),
    scorer_id: z.uuid().optional(),
    assist_id: z.uuid().optional(),
});
type Match = Database["public"]["Tables"]["matches"]["Row"];
type Teams = Database["public"]["Tables"]["group_teams"]["Row"];
type MatchTeams = Match & {
    teamA: Pick<Teams, "id" | "name" | "color"> | null;
    teamB: Pick<Teams, "id" | "name" | "color"> | null;
};
type MainInfoFormProps = {
    matchId: string;
    matchData: MatchTeams;
    closeModal: (o: boolean) => void;
};
function AddGoalForm({ matchId, matchData, closeModal }: MainInfoFormProps) {
    const supabase = createClient();
    const queryClient = useQueryClient();

    const { data: players } = useGroupMatchResponse(matchId);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const { error: incrementError } = await supabase.rpc(
                "increment_team_score",
                {
                    match_id: matchId,
                    team_id: values.team_id,
                    increment_value: 1,
                }
            );
            if (incrementError) {
                console.error("Failed to increment score:", incrementError);
                return;
            }
            if (values.scorer_id) {
                const { data } = await supabase
                    .from("goals")
                    .insert({
                        match_id: matchId,
                        scorer_id: values.scorer_id!,
                        assist_id: values.assist_id || null,
                        minute: values.minute || null,
                    })
                    .select();

                if (data) {
                    toast.success("Goal added Sucessfully");
                    queryClient.invalidateQueries({
                        queryKey: ["matchGoals", matchId],
                    });
                }
            } else {
                toast.success("Goal added Sucessfully");
                queryClient.invalidateQueries({ queryKey: ["match", matchId] });
            }
        } catch (error) {
            console.error("Adding goal failed:", error);
            toast.error("Failed to add goal");
        }

        closeModal(false);
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
                        name="team_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team</FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Team" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={matchData.teamA_id}>
                                            {matchData.teamA?.name}
                                        </SelectItem>
                                        <SelectItem value={matchData.teamB_id}>
                                            {matchData.teamB?.name}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button
                                variant={"ghost"}
                                className="w-full flex justify-between items-center font-bold"
                            >
                                Add Scorer details (optional)
                                <ChevronsUpDown className="text-gray size-4" />
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="gap-2 flex flex-col mt-4">
                            <FormField
                                control={form.control}
                                name="scorer_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Scorer</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Team" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {players &&
                                                    players.map(
                                                        (player, index) => (
                                                            <SelectItem
                                                                value={
                                                                    player.user_id!
                                                                }
                                                                key={index}
                                                            >
                                                                {
                                                                    player
                                                                        .profiles
                                                                        ?.username
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="assist_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assist by</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                field.onChange(value);
                                            }}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Team" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {players &&
                                                    players.map(
                                                        (player, index) => (
                                                            <SelectItem
                                                                value={
                                                                    player.user_id!
                                                                }
                                                                key={index}
                                                            >
                                                                {
                                                                    player
                                                                        .profiles
                                                                        ?.username
                                                                }
                                                            </SelectItem>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="minute"
                                render={({}) => (
                                    <FormItem>
                                        <FormLabel>Minute</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder=""
                                                {...form.register("minute", {
                                                    setValueAs: (v) => {
                                                        const num = Number(v);
                                                        return v === "" ||
                                                            isNaN(num)
                                                            ? undefined
                                                            : num;
                                                    },
                                                })}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CollapsibleContent>
                    </Collapsible>

                    <Button type="submit" className="w-full mt-6">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default AddGoalForm;
