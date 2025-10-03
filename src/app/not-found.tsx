import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="h-screen w-full flex flex-col gap-4 items-center justify-center">
            <h2 className="text-6xl font-black">404</h2>
            <h2 className="text-2xl font-bold">Page Not Found</h2>
            <Image
                src="/images/player-waiting.png"
                width={100}
                height={100}
                alt="Player Waiting"
                className="w-40 h-auto"
            />
            <p>Could not find requested resource</p>
            <Link href="/">
                <Button>Return Home</Button>
            </Link>
        </div>
    );
}
