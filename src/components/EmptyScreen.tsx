import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon } from "lucide-react";
import { Icon } from "@iconify/react";
import Link from "next/link";

type EmptyScreenProp = {
    title?: string;
    desc?: string;
    icon?: string;
};

function EmptyScreen({
    title = "No Group Yet",
    desc = `You haven't created any groups yet. Get started by
                    creating your first group.`,
    icon = `fa6-solid:people-group`,
}: EmptyScreenProp) {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Icon icon={icon} />
                </EmptyMedia>
                <EmptyTitle>{title}</EmptyTitle>
                <EmptyDescription>{desc}</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <div className="flex gap-2">
                    <Link href="">
                        <Button>Create a Group</Button>
                    </Link>
                    <Link href="">
                        <Button variant="outline">Create Match</Button>
                    </Link>
                </div>
            </EmptyContent>
            <Link href="/profile">
                <Button
                    variant="link"
                    className="text-muted-foreground"
                    size="sm"
                >
                    Go to Profile <ArrowUpRightIcon />
                </Button>
            </Link>
        </Empty>
    );
}

export default EmptyScreen;
