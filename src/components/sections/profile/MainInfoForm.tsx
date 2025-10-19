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
import { Textarea } from "@/components/ui/textarea";
import { Constants } from "@/types/database";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { type Database } from "@/types/database";
import { getCountryList } from "@/lib/helpers";
import { Icon } from "@iconify/react";

const positions = Constants.public.Enums.player_position;

const formSchema = z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    position: z.string("Please select a position you play in.").optional(),
    country: z.string().min(2).max(100).optional(),
    city: z.string().min(2).max(50).optional(),
    bio: z.string().min(2).max(100).optional(),
});
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

type MainInfoFormProps = {
    stats: Profile;
    closeModal: (o: boolean) => void;
};
function MainInfoForm({ stats, closeModal }: MainInfoFormProps) {
    const updateProfileMutation = useUpdateProfile();
    const { data: user } = useAuthUser();
    const countryOptions = getCountryList();

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!user) return;
        try {
            await updateProfileMutation.mutateAsync({
                id: user.id,
                first_name: values.firstName,
                last_name: values.lastName,
                position: values.position,
                country: values.country,
                county_state_city: values.city,
                bio: values.bio,
            });
            toast.success("Profile updated Sucessfully");
            closeModal(false);
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update profile");
        }
        console.log(values);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: stats.first_name || undefined,
            lastName: stats.last_name || undefined,
            position: stats.position || undefined,
            city: stats.county_state_city || undefined,
            bio: stats.bio || undefined,
            country: stats.country || undefined,
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
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Position</FormLabel>
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
                                        {positions.map((position, index) => (
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
                    <div className="grid grid-cols-2">
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-40">
                                                <SelectValue placeholder="Country" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-w-sm">
                                            {countryOptions.map(
                                                (country, index) => (
                                                    <SelectItem
                                                        value={country.name}
                                                        key={index}
                                                    >
                                                        <Icon
                                                            icon={country.icon}
                                                        />
                                                        {country.name}
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
                            name="city"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>City/State/County</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>

                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="Write something cool about yourself..."
                                        className="placeholder:italic"
                                        rows={3}
                                    />
                                </FormControl>
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

export default MainInfoForm;
