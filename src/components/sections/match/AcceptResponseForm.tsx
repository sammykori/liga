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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateMatchResponse } from "@/hooks/mutations/useUpdateMatchResponse";
const options = ["Yes", "No"];

const formSchema = z.object({
    payment_made: z.literal(options),
    availability: z.literal(options),
});

export type MatchResponse =
    Database["public"]["Tables"]["match_responses"]["Update"];

type MainInfoFormProps = {
    data: MatchResponse;
    closeModal: (o: boolean) => void;
};
function AcceptResponseForm({ data, closeModal }: MainInfoFormProps) {
    const updateMatchMutation = useUpdateMatchResponse();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!data) return;
        try {
            await updateMatchMutation.mutateAsync({
                id: data?.id,
                availability: values.availability === "Yes" ? true : false,
                payment_made: values.payment_made === "Yes" ? true : false,
                status: "accepted",
            });
            toast.success("Match updated Sucessfully");
            closeModal(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update match");
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
                        name="availability"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Will you be available?</FormLabel>
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
                                        {options.map((team, index) => (
                                            <SelectItem
                                                value={team}
                                                key={index}
                                            >
                                                {team}
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
                        name="payment_made"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Have you paid?</FormLabel>
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
                                        {options.map((team, index) => (
                                            <SelectItem
                                                value={team}
                                                key={index}
                                            >
                                                {team}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

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

export default AcceptResponseForm;
