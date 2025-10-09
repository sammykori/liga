"use client";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Icon } from "@iconify/react";
import { getInitials } from "@/lib/helpers";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useGroupTeams } from "@/hooks/useGroupTeams";
import { useState } from "react";
import { useGroup } from "@/hooks/useGroups";
import SelectGroup from "@/components/sections/SelectGroup";
import LoadingScreen from "@/components/LoadingScreen";

const formSchema = z
    .object({
        title: z.string().min(2).max(50).optional(),
        description: z.string().min(2).max(200).optional(),
        match_date: z.string().optional(),
        match_time: z.string().optional(),
        venue: z.string().optional(),
        teamA: z.string().optional(),
        teamB: z.string().optional(),
    })
    .refine((data) => data.teamA !== data.teamB, {
        message: "Team A and Team B cannot be the same",
        path: ["teamB"], // attach the error to teamB field
    });

function Page() {
    const { data: user, isLoading: isUserLoading } = useAuthUser();
    const router = useRouter();
    const supabase = createClient();
    const [groupId, setGroupId] = useState<string>();
    const [teamAColor, setTeamAColor] = useState<string>();
    const [teamBColor, setTeamBColor] = useState<string>();

    const { data: groups, isLoading: isGroupsLoading } = useGroup(user?.id);
    const { data: teams } = useGroupTeams(groupId);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user) return;

        const { data, error } = await supabase
            .from("matches")
            .insert({
                title: values.title!,
                description: values.description!,
                group_id: groupId!,
                creator_id: user.id,
                match_date: values.match_date!,
                match_time: values.match_time!,
                venue: values.venue!,
                teamA_id: values.teamA!,
                teamB_id: values.teamB!,
            })
            .select();
        if (data) {
            toast.success("New Match created!");
            console.log(data);
            router.push(`/match/${data[0].id}`);
        }
        if (error) {
            console.log(error);
            toast.error("Failed to create match", {
                description: `${error.details} ${error.details}  `,
            });
        }

        console.log(values);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });
    const teamASelect = form.watch("teamA");
    const teamBSelect = form.watch("teamB");

    if (isUserLoading || isGroupsLoading) {
        return <LoadingScreen />;
    }
    return (
        <div className="w-full min-h-screen p-4 flex flex-col gap-4">
            {groups && (
                <SelectGroup
                    groups={groups}
                    groupId={groupId}
                    setGroupId={setGroupId}
                />
            )}
            <h1 className="font-bold">Create a new Match</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="w-full flex justify-around items-center gap-4 ">
                        <div className="rounded-full size-20 border-4 flex items-center justify-center">
                            <Icon
                                icon="ion:shirt"
                                className={`size-12`}
                                color={teamAColor}
                            />
                        </div>
                        <h1 className="font-bold">VS</h1>
                        <div className="rounded-full size-20 border-4 flex items-center justify-center">
                            <Icon
                                icon="ion:shirt"
                                className={`size-12`}
                                color={teamBColor}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-around gap-4">
                        <FormField
                            control={form.control}
                            name="teamA"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Team A</FormLabel> */}
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            if (!teams) return;
                                            // find the selected team and set its color
                                            const selectedTeam = teams.find(
                                                (team) => team.id === value
                                            );
                                            setTeamAColor(
                                                selectedTeam?.color ?? "#000000"
                                            );
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Team" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {teams &&
                                                teams.map((team, index) => (
                                                    <SelectItem
                                                        value={team.id}
                                                        key={index}
                                                        disabled={
                                                            team.id ===
                                                            teamBSelect
                                                        }
                                                    >
                                                        {team.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="teamB"
                            render={({ field }) => (
                                <FormItem>
                                    {/* <FormLabel>Team B</FormLabel> */}
                                    <Select
                                        onValueChange={(value) => {
                                            field.onChange(value);
                                            if (!teams) return;
                                            // find the selected team and set its color
                                            const selectedTeam = teams.find(
                                                (team) => team.id === value
                                            );
                                            setTeamBColor(
                                                selectedTeam?.color ?? "#000000"
                                            );
                                        }}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Team" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {teams &&
                                                teams.map((team, index) => (
                                                    <SelectItem
                                                        value={team.id}
                                                        key={index}
                                                        disabled={
                                                            team.id ===
                                                            teamASelect
                                                        }
                                                    >
                                                        {team.name}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="w-full flex justify-between gap-4">
                        <FormField
                            control={form.control}
                            name="match_date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="match_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Time</FormLabel>
                                    <FormControl>
                                        <Input type="time" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Extra information</FormLabel>

                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Write some extra information about the match..."
                                        className="placeholder:italic"
                                        rows={3}
                                    />
                                </FormControl>
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

export default Page;
