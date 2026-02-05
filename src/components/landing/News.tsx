'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export const News = () => {
    return (
        <section id="news" className="relative py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/stadium-bg.jpg"
                    alt="Stadium background"
                    fill
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary/85" />
            </div>

            <div className="container mx-auto relative z-10">
                <motion.div
                    className="max-w-3xl mx-auto text-center text-primary-foreground"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full mb-8">
                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                        <span className="text-sm font-medium">Latest News</span>
                    </div>

                    <h2 className="text-display text-4xl md:text-6xl lg:text-7xl mb-6">
                        KNOW MORE ABOUT
                        <br />
                        <span className="opacity-60">
                            WHAT&apos;S HAPPENING
                        </span>
                    </h2>

                    <p className="text-lg text-primary-foreground/70 mb-10 max-w-xl mx-auto">
                        Stay updated with the latest news, transfer rumors,
                        match reports, and exclusive behind-the-scenes content
                        from Liga FC.
                    </p>

                    <Button className="btn-liga bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                        Read Latest News
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </motion.div>
            </div>

            {/* Social Links Marquee */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-primary-foreground/10">
                <div className="overflow-hidden py-6">
                    <motion.div
                        className="flex gap-16 whitespace-nowrap"
                        animate={{ x: ['0%', '-50%'] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    >
                        {[...Array(2)].map((_, setIndex) => (
                            <div key={setIndex} className="flex gap-16">
                                {[
                                    'TWITTER',
                                    'LINKEDIN',
                                    'INSTAGRAM',
                                    'TIKTOK',
                                    'FACEBOOK',
                                    'YOUTUBE',
                                ].map((social) => (
                                    <a
                                        key={`${setIndex}-${social}`}
                                        href="#"
                                        className="text-2xl md:text-3xl font-display font-bold text-primary-foreground/40 hover:text-primary-foreground transition-colors flex items-center gap-2"
                                    >
                                        {social}
                                        <ArrowRight className="w-5 h-5 rotate-[-45deg]" />
                                    </a>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
