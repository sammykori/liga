'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Users, Trophy, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const stats = [
    { icon: Users, value: '500+', label: 'Players' },
    { icon: Trophy, value: '120+', label: 'Trophies' },
    { icon: Star, value: '19', label: 'Years' },
]

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Pattern */}
            {/* <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent blur-3xl" />
            </div> */}

            <div className="container mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6">
                                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                <span className="text-sm font-medium">
                                    Season 2024/25 is Live
                                </span>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-display text-5xl md:text-7xl lg:text-8xl leading-none"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <span className="block">19 YEARS</span>
                            <span className="block text-muted-foreground text-4xl md:text-5xl lg:text-6xl italic font-normal">
                                of
                            </span>
                            <span className="block">EXPERIENCE</span>
                            <span className="block">PLAYERS/</span>
                            <span className="block text-muted-foreground">
                                WORLDWIDE
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-muted-foreground max-w-md"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Join the ultimate football community. Connect with
                            players, follow matches, and experience the
                            beautiful game like never before.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Button className="rounded-full gap-2">
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="btn-liga-outline rounded-full"
                            >
                                <Play className="w-4 h-4" />
                                Watch Trailer
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="flex gap-8 pt-8 border-t border-border"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                                        <stat.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold font-display">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="h-40 w-1/2 border-4 border-gray-200 rounded-4xl"></div>

                        {/* Floating Cards */}
                        {/* <motion.div
                            className="absolute -right-4 top-1/4 bg-background rounded-2xl p-4 shadow-xl border border-border"
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                                    <Trophy className="w-6 h-6 text-accent-foreground" />
                                </div>
                                <div>
                                    <div className="font-bold">Champions</div>
                                    <div className="text-sm text-muted-foreground">
                                        League Winners
                                    </div>
                                </div>
                            </div>
                        </motion.div> */}

                        {/* <motion.div
                            className="absolute -left-4 bottom-1/4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl"
                            animate={{ y: [0, 10, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="text-3xl font-display font-bold">
                                    4.9
                                </div>
                                <div>
                                    <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 fill-accent text-accent"
                                            />
                                        ))}
                                    </div>
                                    <div className="text-sm opacity-80">
                                        User Rating
                                    </div>
                                </div>
                            </div>
                        </motion.div> */}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
