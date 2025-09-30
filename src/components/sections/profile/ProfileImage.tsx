"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useEffect } from "react";
import { Database } from "@/types/database";
import { useUpdateProfile } from "@/hooks/mutations/useUpdateProfile";

type ProfileImageProp =
    Database["public"]["Tables"]["profiles"]["Row"]["profile_url"];

function ProfileImage({ profileImage }: { profileImage: ProfileImageProp }) {
    const [image, setImage] = useState<File>();
    const [preview, setPreview] = useState<string>();
    const supabase = createClient();
    const [user, setUser] = useState<User>();
    const updateProfileMutation = useUpdateProfile();

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error("Error fetching user:", error);
            } else {
                setUser(data.user);
            }
        };

        fetchUser();
    }, [supabase]);

    async function uploadProfilePic(file: File, userId: string) {
        if (!file) return null;

        // Store the file under a folder named with userId
        const filePath = `players/${userId}.${file.name.split(".").pop()}`;

        const { data, error: uploadError } = await supabase.storage
            .from("profile_pictures") // replace with your bucket name
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: true, // overwrite if exists
            });
        console.log("storage upload return:", data);

        if (uploadError) {
            console.error("Upload error:", uploadError);
            return null;
        }

        // For public buckets, get the URL
        const { data: publicUrl } = supabase.storage
            .from("profile_pictures")
            .getPublicUrl(filePath);

        return publicUrl.publicUrl;
    }

    async function updateProfilePic(userId: string, url: string | null) {
        const { data, error } = await supabase
            .from("profiles")
            .update({ profile_url: url })
            .eq("id", userId);

        if (error) {
            console.error("Error updating profile:", error);
            toast("Error updating profile", {
                description: "Error:" + error,
            });
        }
        return data;
    }

    function handleChangeImage(file: File | null) {
        console.log(file);
        if (!file) return;
        console.log("change");
        const fileSizeInKB = file.size / 1024;
        if (fileSizeInKB > 100) {
            return toast.error("Large File Size", {
                description: "File Size exceeds 500 KB limit",
            });
        }
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleUpload = async () => {
        if (!image) return;
        if (!user) return;

        const url = await uploadProfilePic(image, user.id);
        if (url) {
            try {
                await updateProfileMutation.mutateAsync({
                    id: user.id,
                    profile_url: url,
                });
                toast.success("Profile updated!");
            } catch (error) {
                console.error("Update failed:", error);
                toast.error("Failed to update profile");
            }
        }
    };

    const handleRemove = async () => {
        const ImageDom = document.getElementById(
            "photo-upload"
        ) as HTMLInputElement | null;
        if (ImageDom) {
            ImageDom.value = "";
        }
        setPreview(undefined);
        setImage(undefined);
        if (!user) return;

        if (!profileImage) return;
        const filePath = profileImage.split("/public/")[1].toString();
        console.log(filePath.toString());
        const { data } = await supabase.storage
            .from("profile_pictures")
            .remove([filePath]);

        if (data) {
            try {
                await updateProfileMutation.mutateAsync({
                    id: user.id,
                    profile_url: null,
                });
                toast.success("Profile picture deleted!");
            } catch (error) {
                console.error("Update failed:", error);
                toast.error("Failed to update profile");
            }
        }
    };
    return (
        <div>
            <div className="w-full h-96 bg-muted rounded-2xl mx-auto mb-4 relative p-10">
                {/* <Icon icon="entypo:user" className="w-full  h-auto" /> */}
                <Image
                    src={
                        profileImage ? profileImage : "/images/default-pp.jpeg"
                    }
                    alt="Profile Placeholder"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "top" }} // Cover the container
                    priority
                />
                <div className="absolute  w-[90%] flex justify-center items-center bg-white border border-gray-500/50 rounded-full p-1 bottom-4 left-0 right-0 mx-auto  backdrop-blur">
                    <Dialog>
                        <DialogTrigger className="w-full flex justify-center items-center px-4 py-2">
                            <Icon
                                icon="solar:camera-outline"
                                className="size-4"
                            />
                            <span className="text-sm font-medium ml-2">
                                Change Photo
                            </span>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Change Profile Photo</DialogTitle>

                                <div className="w-full h-96 relative">
                                    <Image
                                        src={
                                            preview
                                                ? preview
                                                : profileImage
                                                ? profileImage
                                                : "/images/default-pp.jpeg"
                                        }
                                        alt="Profile Placeholder"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{
                                            objectFit: "cover",
                                            objectPosition: "top",
                                        }} // Cover the container
                                        priority
                                    />
                                </div>
                                <DialogDescription>
                                    We require players to use their real
                                    identities, so upload a clear picture of
                                    yourself.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="gap-4">
                                <Button
                                    variant="default"
                                    onClick={() => handleUpload()}
                                >
                                    Save
                                </Button>
                                <div className="flex justify-between">
                                    <Input
                                        type="file"
                                        id="photo-upload"
                                        placeholder="Change Photo"
                                        hidden
                                        accept="image/png, image/jpeg"
                                        onChange={(e) =>
                                            handleChangeImage(
                                                e.target.files?.[0] ?? null
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="photo-upload"
                                        className="cursor-pointer px-4 rounded-md border"
                                    >
                                        Change Photo
                                    </Label>

                                    <Button
                                        variant="destructive"
                                        onClick={() => handleRemove()}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default ProfileImage;
