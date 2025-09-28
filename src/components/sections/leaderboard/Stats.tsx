import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
const stats = [
    {
        playerName: "Kevin De Bruyne",
        location: "Bournemouth, England",
        position: "Striker",
        rating: 24,
    },
    {
        playerName: "Lionel Messi",
        location: "Paris, France",
        position: "Forward",
        rating: 22,
    },
    {
        playerName: "Cristiano Ronaldo",
        location: "Manchester, England",
        position: "Forward",
        rating: 21,
    },
];
function Stats() {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold">Weekly Leaders</h2>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-6"
            >
                <Carousel>
                    <CarouselContent>
                        {stats.map((ma, index) => (
                            <CarouselItem key={index}>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    className="cursor-pointer"
                                >
                                    <Card className="relative w-full p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white overflow-hidden">
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold mb-1">
                                                {ma.playerName}{" "}
                                            </h3>
                                            <p className="text-purple-100 text-sm mb-2">
                                                {ma.location}
                                            </p>
                                            <p className="text-purple-100 text-sm mb-4">
                                                {ma.position}
                                            </p>
                                            <div className="text-6xl font-bold">
                                                {ma.rating}
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4 w-12 h-12 bg-pink-400 rounded-lg flex items-center justify-center">
                                            <Icon
                                                icon="mdi:trophy"
                                                className="w-6 h-6"
                                            />
                                        </div>
                                    </Card>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </motion.div>
        </div>
    );
}

export default Stats;
