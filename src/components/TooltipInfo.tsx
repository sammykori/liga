import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react";
import { useIsMobile } from "@/hooks/use-mobile";
function TooltipInfo({ content }: { content: string }) {
    const isMobile = useIsMobile();
    if (isMobile) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Icon
                        icon="heroicons-outline:light-bulb"
                        className="inline-flex"
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <p className="italic text-xs">{content}</p>
                </PopoverContent>
            </Popover>
        );
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Icon
                    icon="heroicons-outline:light-bulb"
                    className="inline-flex"
                />
            </TooltipTrigger>
            <TooltipContent className="max-w-sm">
                <p className="italic text-xs">{content}</p>
            </TooltipContent>
        </Tooltip>
    );
}

export default TooltipInfo;
