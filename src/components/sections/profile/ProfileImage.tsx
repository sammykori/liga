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

function ProfileImage() {
    return (
        <div>
            <div className="w-full h-96 bg-muted rounded-2xl mx-auto mb-4 relative p-10">
                {/* <Icon icon="entypo:user" className="w-full  h-auto" /> */}
                <Image
                    src="/images/default-pp.jpeg"
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
                                        src="/images/default-pp.jpeg"
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
                                    We require players to use theri real
                                    identities, so upload a clear picture of
                                    yourself.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="gap-4">
                                <Button variant="default">Save</Button>
                                <div className="flex justify-between">
                                    <Input
                                        type="file"
                                        id="photo-upload"
                                        placeholder="Change Photo"
                                        hidden
                                    />
                                    <Label
                                        htmlFor="photo-upload"
                                        className="cursor-pointer px-4 rounded-md border"
                                    >
                                        Change Photo
                                    </Label>

                                    <Button variant="destructive">
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
