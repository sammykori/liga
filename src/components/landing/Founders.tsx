'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

const founders = [
    {
        name: 'JASON',
        lastName: 'HARRISON',
        role: 'Chief Executive Officer',
        bio: 'Former professional player with 15 years of management experience.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    },
    {
        name: 'ADAM',
        lastName: 'HOLMES',
        role: 'Sporting Director',
        bio: 'Led scouting operations for top European clubs before joining Liga.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    },
]

export const Founders = () => {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-6">
                            <span className="text-sm font-medium">
                                The People Behind
                            </span>
                        </div>
                        <h2 className="text-display text-4xl md:text-6xl">
                            OUR VISIONARY
                            <br />
                            <span className="text-muted-foreground">
                                — FOUNDERS
                            </span>
                        </h2>
                    </div>
                    <Button className="btn-liga mt-6 md:mt-0">
                        Full Team
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={founder.name}
                            className="group flex gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors"
                            initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            {/* Image */}
                            <div className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0">
                                <img
                                    src={founder.image}
                                    alt={`${founder.name} ${founder.lastName}`}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                                <h3 className="text-display text-2xl font-bold leading-tight">
                                    {founder.name}
                                    <br />
                                    <span className="text-muted-foreground">
                                        {founder.lastName}
                                    </span>
                                </h3>
                                <p className="text-sm text-muted-foreground mt-2">
                                    {founder.role}
                                </p>
                                <p className="text-sm text-muted-foreground mt-4">
                                    {founder.bio}
                                </p>

                                {/* Social Links */}
                                <div className="flex gap-2 mt-4">
                                    <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                        <Twitter className="w-4 h-4" />
                                    </button>
                                    <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
