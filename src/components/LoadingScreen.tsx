import { Icon } from "@iconify/react";

function LoadingScreen() {
    return (
        <div className="h-screen w-full flex items-center justify-center">
            <Icon
                icon="emojione:soccer-ball"
                className="size-20 animate-spin"
            />
        </div>
    );
}

export default LoadingScreen;
