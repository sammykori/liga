import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MatchCard } from "../../MatchCard";
import { useRouter } from "next/navigation";
import { useGroupMatches } from "@/hooks/useGroupMatches";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

function LiveMatchesCarousel({ groupId }: { groupId: string | undefined }) {
    const { data: matches } = useGroupMatches(groupId);
    const router = useRouter();

    const handleMatchClick = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };

    if (!matches || matches.length < 1) {
        return (
            <div>
                <h1>No matches have been added yet.</h1>
            </div>
        );
    }
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                    Live Match
                </h3>
                <Button
                    variant="link"
                    size="sm"
                    className=" text-xs font-semibold text-primary"
                >
                    See all{" "}
                    <Icon icon="mdi:arrow-right" className="w-4 h-4 ml-1" />
                </Button>
            </div>
            <Carousel
                opts={{
                    loop: true,
                    inViewThreshold: 0.5,
                    align: "start",
                }}
            >
                <CarouselContent>
                    {matches.map((match, index) => (
                        <CarouselItem key={index}>
                            <MatchCard
                                match={match}
                                variant="hero"
                                onClick={() => handleMatchClick(match.id)}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </motion.section>
    );
}

export default LiveMatchesCarousel;
