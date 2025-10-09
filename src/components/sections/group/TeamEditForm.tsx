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
import { useUpdateGroup } from "@/hooks/mutations/useUpdateGroup";
import { toast } from "sonner";
import { type Database } from "@/types/database";

const formSchema = z.object({
    name: z.string().min(2).max(50),
    color: z.string().min(2).max(50).optional(),
});
type Team = Database["public"]["Tables"]["group_teams"]["Row"];

type MainInfoFormProps = {
    data: Team;
    closeModal: (o: boolean) => void;
};
function TeamEditForm({ data, closeModal }: MainInfoFormProps) {
    const updateTeamMutation = useUpdateGroup();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // if (!data) return;
        // try {
        //     await updateTeamMutation.mutateAsync({
        //         name: values.name,
        //         color: values.color,
        //     });
        //     toast.success("Group updated Sucessfully");
        //     closeModal(false);
        // } catch (error) {
        //     console.error("Update failed:", error);
        //     toast.error("Failed to update group");
        // }
        console.log(values);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || undefined,
            color: data.color || undefined,
        },
    });
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Team Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="color"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <FormControl>
                                    <Input type="color" {...field} />
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

export default TeamEditForm;
