'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Users, Trophy, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const stats = [
    { icon: Users, value: '500+', label: 'Players' },
    { icon: Trophy, value: '120+', label: 'Trophies' },
    { icon: Star, value: '19', label: 'Years' },
]

export const Hero = () => {
    return (
        <section className="w-full relative flex items-start pt-20 overflow-hidden p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-red-500 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-green-500 blur-3xl animate-pulse" />
            </div>

            <div className="w-full container mx-auto relative z-10">
                <div className="w-full flex flex-col lg:flex-row  gap-12 items-start pt-10 pb-20">
                    {/* Text Content */}
                    <div className="w-full space-y-8">
                        {/* <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full ">
                                <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                                <span className="text-sm font-medium">
                                    Beta Testing
                                </span>
                            </div>
                        </motion.div> */}

                        <motion.h1
                            className="text-display text-5xl md:text-6xl lg:text-7xl leading-none"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                        >
                            <div>
                                <span className="font-bold">CONNECT</span>
                            </div>
                            <div>
                                <span className=" text-muted-foreground text-3xl md:text-5xl lg:text-3xl italic font-normal">
                                    with
                                </span>

                                <span className="">GRASSROOT</span>
                            </div>
                            <div>
                                <span className="">FOOTBALL</span>
                                <span className=" text-muted-foreground text-3xl md:text-5xl lg:text-3xl italic font-normal">
                                    in your
                                </span>
                            </div>
                            <span className="block font-bold text-muted-foreground">
                                COMMUNITY
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-lg text-muted-foreground max-w-md"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            Join the ultimate grassrots and amateur football
                            community. Connect with players, follow matches, and
                            experience the beautiful game like never before.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Link href="/login">
                                <Button className="rounded-full gap-2">
                                    Get Started
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Hero Image */}
                    <motion.div
                        className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="hidden lg:block w-full border-2 border-gray-200 rounded-4xl relative overflow-hidden p-4">
                            <motion.div
                                className="relative -right-10 -top-10"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex text-right justify-end tracking-tighter flex-wrap gap-4 text-9xl  lg:text-9xl font-display font-bold text-gray-200 leading-none">
                                    <span>LIGA</span>
                                    <span>.APP</span>
                                </div>
                            </motion.div>
                            <motion.div
                                className="pt-12 flex flex-col gap-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div>
                                    <span className="px-4 py-1 bg-accent rounded-full">
                                        Community
                                    </span>
                                </div>
                                <div className="w-full flex">
                                    <span className="text-2xl">600+</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground text-sm ">
                                        Join our global sport community
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                        <div className="w-full min-h-96 border-2 border-gray-200 rounded-4xl">
                            <div className="w-full h-full relative">
                                <Image
                                    src="/images/hero-huddle.jpg"
                                    alt="Hero Image"
                                    fill
                                    className="w-full h-auto object-cover rounded-4xl grayscale-100 hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>

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
