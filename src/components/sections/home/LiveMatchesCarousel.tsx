import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { MatchCard } from "../../MatchCard";
import { useRouter } from "next/navigation";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const matches = [
    {
        id: "1",
        teamA: "Team A",
        teamB: "Team B",
        scoreA: 4,
        scoreB: 2,
        date: "Sunday, 31 Jun",
        time: "15:30",
        venue: "Strouden Park",
        isLive: true,
        status: "live",
    },
    {
        id: "2",
        teamA: "Team C",
        teamB: "Team D",
        date: "Today",
        time: "08:00 PM",
        venue: "Central Stadium",
        status: "upcoming",
    },
    {
        id: "3",
        teamA: "Team E",
        teamB: "Team F",
        date: "Tomorrow",
        time: "08:00 PM",
        venue: "North Arena",
        status: "upcoming",
    },
];
function LiveMatchesCarousel() {
    const router = useRouter();
    const handleMatchClick = (matchId: string) => {
        router.push(`/match/${matchId}`);
    };
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
                    {matches.map((ma, index) => (
                        <CarouselItem key={index}>
                            <MatchCard
                                match={ma}
                                variant="hero"
                                onClick={() => handleMatchClick(ma.id)}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </motion.section>
    );
}

export default LiveMatchesCarousel;
