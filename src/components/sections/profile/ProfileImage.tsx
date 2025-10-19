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
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/lib/helpers";

type ProfileImageProp =
    Database["public"]["Tables"]["profiles"]["Row"]["profile_url"];

function ProfileImage({ profileImage }: { profileImage: ProfileImageProp }) {
    const [image, setImage] = useState<File>();
    const [imageSrc, setImageSrc] = useState<string>();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null
    );
    const [saveLoading, setSaveLoading] = useState(false);

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

    async function uploadProfilePic(file: File | null, userId: string) {
        if (!file) return null;

        // Store the file under a folder named with userId
        const filePath = `players/${userId}.${file.name.split(".").pop()}`;
        console.log("filePath", filePath);

        const { data, error: uploadError } = await supabase.storage
            .from("profile_pictures") // replace with your bucket name
            .upload(filePath, file, {
                cacheControl: "0",
                upsert: true, // overwrite if exists
            });
        console.log("storage upload return:", data);

        if (uploadError) {
            console.error("Upload error:", uploadError);
            setSaveLoading(false);
            toast.error("Image Upload Error:", {
                description: uploadError.message,
            });
            return null;
        }

        // For public buckets, get the URL
        const { data: publicData } = supabase.storage
            .from("profile_pictures")
            .getPublicUrl(filePath);

        const publicUrl = `${publicData.publicUrl}?t=${Date.now()}`;
        return publicUrl;
    }

    function handleChangeImage(file: File | null) {
        if (!file) return;

        const sizeInKB = file.size / 1024;
        if (sizeInKB > 500) {
            return toast.error("File size exceeds 500 KB limit");
        }

        setImage(file);
        readFile(file).then((imageDataUrl) => {
            setImageSrc(imageDataUrl as string);
        });
    }

    const handleUpload = async () => {
        if (!image || !user) return;

        setSaveLoading(true);
        try {
            const croppedFile = await changeBase64toFile();
            if (!croppedFile) return;

            const url = await uploadProfilePic(croppedFile, user.id);
            if (!url) return;

            await updateProfileMutation.mutateAsync({
                id: user.id,
                profile_url: url,
            });

            toast.success("Profile updated!");
        } catch (error) {
            console.error("Upload/update failed:", error);
            toast.error("Failed to update profile");
        } finally {
            setSaveLoading(false);
        }
    };

    const handleRemove = async () => {
        setImage(undefined);
        if (!user) return;

        if (!profileImage) return;
        const filePath = profileImage
            .split("/public/profile_pictures/")[1]
            ?.split("?")[0]
            .toString();
        console.log(filePath);
        if (!filePath) {
            console.error("Invalid file path:", profileImage);
            return;
        }
        const { data, error } = await supabase.storage
            .from("profile_pictures")
            .remove([filePath]);

        if (error) {
            console.error("Failed to delete from storage:", error);
            toast.error("Failed to delete from storage");
            return;
        }

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
    const handleReset = async () => {
        if (!image || !imageSrc) return;
        setImage(undefined);
        setImageSrc(undefined);
    };

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
        console.log(croppedAreaPixels);
    };

    const changeBase64toFile = async (): Promise<File | null> => {
        if (!imageSrc || !croppedAreaPixels || !image) return null;
        try {
            return await getCroppedImg(
                imageSrc,
                image.name!,
                image.type,
                croppedAreaPixels
            );
        } catch (e) {
            console.error("Error cropping image:", e);
            return null;
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
                        <DialogTrigger className="w-full flex justify-center items-center px-4">
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
                                    {!imageSrc ? (
                                        <Image
                                            src={
                                                profileImage
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
                                    ) : (
                                        <Cropper
                                            image={imageSrc}
                                            crop={crop}
                                            zoom={zoom}
                                            aspect={4 / 3}
                                            onCropChange={setCrop}
                                            onCropComplete={onCropComplete}
                                            onZoomChange={setZoom}
                                        />
                                    )}
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
                                    disabled={saveLoading}
                                >
                                    {saveLoading ? (
                                        <Icon
                                            icon="ei:spinner"
                                            className="animate animate-spin"
                                        />
                                    ) : (
                                        "Save"
                                    )}
                                </Button>
                                <div className="flex justify-between">
                                    <Input
                                        type="file"
                                        id="photo-upload"
                                        placeholder="Change Photo"
                                        hidden
                                        value={image ? undefined : ""}
                                        accept="image/png, image/jpeg"
                                        onChange={(e) =>
                                            handleChangeImage(
                                                e.target.files?.[0] ?? null
                                            )
                                        }
                                    />
                                    <Label
                                        htmlFor="photo-upload"
                                        className="cursor-pointer px-4 py-2 rounded-md border"
                                    >
                                        Change Photo
                                    </Label>

                                    {image === undefined ? (
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleRemove()}
                                        >
                                            Delete
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleReset()}
                                        >
                                            Reset
                                        </Button>
                                    )}
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

function readFile(file: File) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

export default ProfileImage;
