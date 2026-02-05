'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Icon } from '@iconify/react'

const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Matches', href: '#matches' },
    { name: 'Team', href: '#team' },
    { name: 'News', href: '#news' },
    { name: 'About', href: '#about' },
]

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg px-4">
            <div className="container mx-auto">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}

                    <Link href="/">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center"
                        >
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <Icon
                                    icon="noto-v1:soccer-ball"
                                    className="w-8 h-8"
                                />
                            </div>
                            <h1 className="font-lobster text-4xl font-bold text-card-foreground">
                                liga
                            </h1>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, index) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors link-underline"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.1,
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <motion.div
                        className="hidden md:block"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Button
                            size="lg"
                            className="rounded-full py-6 px-10 gap-2"
                        >
                            Join Now
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </motion.div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden absolute top-20 left-0 right-0 bg-background"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <nav className="container py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium py-2 hover:text-muted-foreground transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <Button className="rounded-full w-full mt-4">
                                Join Now
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
