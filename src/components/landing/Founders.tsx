'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { link } from 'fs'
import Link from 'next/link'

const founders = [
    {
        name: 'DELE',
        lastName: 'AROGUNDADE',
        role: 'Chief Executive Officer',
        bio: 'Former professional player with 15 years of management experience.',
        image: '/images/team/dele.jpeg',
        linkedIn: 'https://www.linkedin.com/in/dele-arogundade/',
    },
    {
        name: 'SAMUEL',
        lastName: 'KORI',
        role: 'Chief Technology Officer',
        bio: 'Led scouting operations for top European clubs before joining Liga.',
        image: '/images/team/sam.jpeg',
        linkedIn: 'https://www.linkedin.com/in/samuelkori/',
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
                            <div className="w-32 h-40 rounded-xl overflow-hidden flex-shrink-0 relative">
                                <Image
                                    src={founder.image}
                                    alt={`${founder.name} ${founder.lastName}`}
                                    fill
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

                                {/* Social Links */}
                                <div className="flex gap-2 mt-4">
                                    <Link
                                        href={founder.linkedIn}
                                        target="_blank"
                                    >
                                        <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                            <Icon
                                                icon="mdi:linkedin"
                                                className="w-4 h-4"
                                            />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
