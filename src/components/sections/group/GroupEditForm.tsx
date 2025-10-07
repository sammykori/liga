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
import { getInitials } from "@/lib/helpers";
import { Icon } from "@iconify/react";

const badges = [
    {
        name: "Police Badge",
        icon: "streamline-ultimate:sign-badge-badge-1-bold",
    },
    {
        name: "Police Badge",
        icon: "mdi:shield",
    },
    {
        name: "Police Badge",
        icon: "streamline-flex:shield-1-solid",
    },
    {
        name: "Police Badge",
        icon: "charm:circle",
    },
];

const formSchema = z.object({
    name: z.string().min(2).max(50),
    picture_url: z.string().min(2).max(50).optional(),
    foreground_color: z.string("Please select a color").optional(),
    background_color: z.string("Please select a color").optional(),
    description: z.string().min(2).max(200).optional(),
    badge: z.string().optional(),
});
type Group = Database["public"]["Tables"]["groups"]["Row"];

type MainInfoFormProps = {
    data: Group;
    closeModal: (o: boolean) => void;
};
function GroupEditForm({ data, closeModal }: MainInfoFormProps) {
    const updateGroupeMutation = useUpdateGroup();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!data) return;
        try {
            await updateGroupeMutation.mutateAsync({
                id: data.id,
                name: values.name,
                description: values.description,
                badge: values.badge,
                background_color: values.background_color,
                foreground_color: values.foreground_color,
            });
            toast.success("Group updated Sucessfully");
            closeModal(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update group");
        }
        console.log(values);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: data.name || undefined,
            picture_url: data.picture_url || undefined,
            description: data.description || undefined,
            foreground_color: data.foreground_color || undefined,
            background_color: data.background_color || undefined,
            badge: data.badge || undefined,
        },
    });
    const foregroundColor = form.watch("foreground_color");
    const backgroundColor = form.watch("background_color");
    const nameSelect = form.watch("name");
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
                                <FormLabel>Group Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>

                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Write something cool about your team..."
                                        className="placeholder:italic"
                                        rows={3}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="badge"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Create a badge for you team
                                </FormLabel>
                                <FormControl>
                                    <div className="w-full flex flex-row justify-center items-center gap-2">
                                        <div className="w-40 aspect-square border p-2 rounded-2xl flex justify-center items-center relative">
                                            <Icon
                                                icon={field.value!}
                                                className="h-full w-full"
                                                style={{
                                                    color: backgroundColor,
                                                }}
                                            />
                                            <h1
                                                style={{
                                                    color: foregroundColor,
                                                }}
                                                className="font-black text-white  absolute mx-auto text-3xl"
                                            >
                                                {getInitials(
                                                    nameSelect || "FC"
                                                )}
                                            </h1>
                                        </div>
                                        <div className="w-full grid grid-cols-2 gap-2 justify-between px-4">
                                            {badges.map((badge, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() =>
                                                        field.onChange(
                                                            badge.icon
                                                        )
                                                    }
                                                    className="w-16 aspect-square border p-2 rounded-2xl flex justify-center items-center relative"
                                                >
                                                    <Icon
                                                        icon={badge.icon}
                                                        className="h-full w-full"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full flex justify-around">
                        <FormField
                            control={form.control}
                            name="foreground_color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Foreground Color</FormLabel>
                                    <FormControl>
                                        <Input type="color" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="background_color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Background Color</FormLabel>
                                    <FormControl>
                                        <Input type="color" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full mt-6">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default GroupEditForm;
