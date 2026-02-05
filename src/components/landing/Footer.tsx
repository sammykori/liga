'use client'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const footerLinks = {
    company: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Contact', href: '#' },
    ],
    resources: [
        { name: 'Matches', href: '#matches' },
        { name: 'Team', href: '#team' },
        { name: 'News', href: '#news' },
        { name: 'Tickets', href: '#' },
    ],
    legal: [
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
        { name: 'Cookie Policy', href: '#' },
    ],
}

export const Footer = () => {
    return (
        <footer className="bg-primary text-primary-foreground pt-24 pb-8 px-4">
            <div className="container mx-auto">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center py-4"
                            >
                                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                    <Icon
                                        icon="noto-v1:soccer-ball"
                                        className="w-8 h-8"
                                    />
                                </div>
                                <h1 className="font-lobster text-4xl font-bold text-white">
                                    liga
                                </h1>
                            </motion.div>
                        </Link>
                        <p className="text-primary-foreground/60 text-sm mb-6">
                            The ultimate football community. Experience the
                            beautiful game like never before.
                        </p>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full px-4 py-2 text-sm placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/40"
                            />
                            <button className="w-10 h-10 bg-primary-foreground text-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-display font-bold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold mb-4">
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-display font-bold mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Big Typography */}
                <motion.div
                    className="border-t border-primary-foreground/10 pt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-wrap gap-4 text-6xl md:text-8xl lg:text-9xl font-display font-bold text-primary-foreground/10 leading-none">
                        <span>LIGA.APP</span>
                    </div>
                </motion.div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-12 pt-8 border-t border-primary-foreground/10 gap-4">
                    <p className="text-sm text-primary-foreground/40">
                        © 2026 Liga App. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1"
                        >
                            Twitter <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a
                            href="#"
                            className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1"
                        >
                            Instagram <ArrowUpRight className="w-3 h-3" />
                        </a>
                        <a
                            href="#"
                            className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors flex items-center gap-1"
                        >
                            LinkedIn <ArrowUpRight className="w-3 h-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
