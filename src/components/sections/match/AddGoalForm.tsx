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

const formSchema = z.object({
    minute: z.number().optional(),
    scorer_id: z.string().min(2).max(200).optional(),
    assist_id: z.string().optional(),
});

type MainInfoFormProps = {
    matchId: string;
    closeModal: (o: boolean) => void;
};
function AddGoalForm({ matchId, closeModal }: MainInfoFormProps) {
    const supabase = createClient();

    const { data: players } = useGroupMatchResponse(matchId);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { data, error } = await supabase
            .from("goals")
            .insert({
                match_id: matchId,
                scorer_id: values.scorer_id!,
                assist_id: values.assist_id || null,
                minute: values.minute || null,
            })
            .select();

        if (error) {
            console.error("Adding goal failed:", error);
            toast.error("Failed to add match");
        }
        if (data) {
            toast.success("Goal added Sucessfully");
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
                                            players.map((player, index) => (
                                                <SelectItem
                                                    value={player.user_id!}
                                                    key={index}
                                                >
                                                    {
                                                        player.profiles
                                                            ?.first_name
                                                    }
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
                                            players.map((player, index) => (
                                                <SelectItem
                                                    value={player.user_id!}
                                                    key={index}
                                                >
                                                    {
                                                        player.profiles
                                                            ?.first_name
                                                    }
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
                        name="minute"
                        render={({}) => (
                            <FormItem>
                                <FormLabel>Minute</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder=""
                                        {...form.register("minute", {
                                            valueAsNumber: true,
                                            setValueAs: (v) =>
                                                v === "" ? undefined : v, // makes empty string undefined
                                        })}
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

export default AddGoalForm;
