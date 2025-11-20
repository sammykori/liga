import { motion } from "framer-motion";
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
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h3 className="text-lg font-semibold text-foreground">
                    Live Matches
                </h3>
                <div className="bg-red-50 w-full aspect-video rounded-xl flex justify-center-safe items-center-safe">
                    <div className="flex gap-2 justify-center items-center">
                        <div className="size-4 bg-red-500 animate-pulse rounded-full"></div>
                        <h1 className="font-bold text-xl">NO LIVE MATCH</h1>
                    </div>
                </div>
            </motion.section>
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
                    Live Matches
                </h3>
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
