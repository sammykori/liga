import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function NoGroupData() {
    return (
        <div className="flex flex-col w-full h-screen justify-start items-center p-8">
            <h1 className="font-bold text-2xl">Not part of a group yet?</h1>
            <p className="mt-4 text-center text-gray-400">
                You can create a{" "}
                <Link
                    href="#"
                    className="font-medium text-black hover:text-blue-500 underline"
                >
                    Create
                </Link>{" "}
                a group or{" "}
                <Link
                    href="#"
                    className="font-medium text-black hover:text-blue-500 underline"
                >
                    Join
                </Link>{" "}
                an existing one.
            </p>
            <Image
                src="/images/player-waiting.png"
                width={100}
                height={100}
                alt="Player Waiting"
                className="w-40 h-auto"
            />
            <Link href="profile">
                <Button>Go to Profile Page</Button>
            </Link>
        </div>
    );
}

export default NoGroupData;
