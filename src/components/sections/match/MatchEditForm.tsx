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
import { type Database } from "@/types/database";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useGroupTeams } from "@/hooks/useGroupTeams";
import { useUpdateMatch } from "@/hooks/mutations/useUpdateMatch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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

type Match = Database["public"]["Tables"]["matches"]["Row"];
type Teams = Database["public"]["Tables"]["group_teams"]["Row"];
type MatchTeams = Match & {
    teamA: Pick<Teams, "id" | "name" | "color"> | null;
    teamB: Pick<Teams, "id" | "name" | "color"> | null;
};

type MainInfoFormProps = {
    data: MatchTeams;
    closeModal: (o: boolean) => void;
};
function MatchEditForm({ data, closeModal }: MainInfoFormProps) {
    const updateMatchMutation = useUpdateMatch();
    const [teamAColor, setTeamAColor] = useState<string | undefined>(
        data.teamA?.color
    );
    const [teamBColor, setTeamBColor] = useState<string | undefined>(
        data.teamB?.color
    );

    const { data: teams } = useGroupTeams(data.group_id);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!data) return;
        try {
            await updateMatchMutation.mutateAsync({
                id: data.id,
                title: values.title!,
                description: values.description!,
                match_date: values.match_date!,
                match_time: values.match_time!,
                teamA_id: values.teamA!,
                teamB_id: values.teamB!,
            });
            toast.success("Match updated Sucessfully");
            closeModal(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update match");
        }
        console.log(values, data.group_id);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: data.title,
            description: data.description || undefined,
            venue: data.venue || undefined,
            match_date: data.match_date,
            match_time: data.match_time || undefined,
            teamA: data.teamA_id,
            teamB: data.teamB_id,
        },
    });

    return (
        <div className="">
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

export default MatchEditForm;
