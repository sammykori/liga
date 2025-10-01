import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Constants } from "@/types/database";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { type Database } from "@/types/database";

const foots = Constants.public.Enums.foot;
const sexes = Constants.public.Enums.sex;

const formSchema = z.object({
    height: z.number().optional(),
    weight: z.number().optional(),
    foot: z.literal(foots).optional(),
    sex: z.literal(sexes).optional(),
});
type FormValues = z.infer<typeof formSchema>;

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type MainInfoFormProps = {
    stats: Profile;
    closeModal: (o: boolean) => void;
};
function MoreInfoForm({ stats, closeModal }: MainInfoFormProps) {
    const updateProfileMutation = useUpdateProfile();
    const { data: user } = useAuthUser();

    async function onSubmit(values: FormValues) {
        if (!user) return;
        try {
            await updateProfileMutation.mutateAsync({
                id: user.id,
                height: values.height,
                weight: values.weight,
                foot: values.foot,
                sex: values.sex,
            });
            toast.success("Profile updated Sucessfully");
            closeModal(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update profile");
        }
        console.log(values);
    }

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            height: stats.height || undefined,
            weight: stats.weight || undefined,
            foot: stats.foot || undefined,
            sex: stats.sex || undefined,
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
                        name="height"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Height</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder=""
                                        {...form.register("height", {
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
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder=""
                                        {...form.register("weight", {
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
                    <FormField
                        control={form.control}
                        name="foot"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Foot</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Position" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {foots.map((position, index) => (
                                            <SelectItem
                                                value={position}
                                                key={index}
                                            >
                                                {position}
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
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sex</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Position" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {sexes.map((position, index) => (
                                            <SelectItem
                                                value={position}
                                                key={index}
                                            >
                                                {position}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}

export default MoreInfoForm;
