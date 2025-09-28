import { Icon } from "@iconify/react";

function ProfileImage() {
    return (
        <div>
            <div className="w-full h-96 bg-muted rounded-2xl mx-auto mb-4 relative p-10">
                <Icon icon="entypo:user" className="w-full h-auto" />
                <div className="absolute  w-[90%] flex justify-center items-center bg-white border border-gray-500/50 rounded-full p-1 bottom-4 left-0 right-0 mx-auto  backdrop-blur">
                    <Icon icon="solar:camera-outline" className="size-4" />
                    <span className="text-sm font-medium ml-2">
                        Change Photo
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProfileImage;
