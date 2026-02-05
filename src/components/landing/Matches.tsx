'use client'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const upcomingMatches = [
    {
        id: 1,
        date: '15 Feb 2025',
        time: '20:00',
        homeTeam: 'LIGA FC',
        awayTeam: 'ARSENAL',
        venue: 'Liga Stadium',
        competition: 'Premier League',
        homeScore: null,
        awayScore: null,
    },
    {
        id: 2,
        date: '22 Feb 2025',
        time: '17:30',
        homeTeam: 'CHELSEA',
        awayTeam: 'LIGA FC',
        venue: 'Stamford Bridge',
        competition: 'Premier League',
        homeScore: null,
        awayScore: null,
    },
    {
        id: 3,
        date: '01 Mar 2025',
        time: '15:00',
        homeTeam: 'LIGA FC',
        awayTeam: 'BARCELONA',
        venue: 'Liga Stadium',
        competition: 'Champions League',
        homeScore: null,
        awayScore: null,
    },
]

const recentMatches = [
    {
        id: 4,
        date: '08 Feb 2025',
        time: '20:00',
        homeTeam: 'LIGA FC',
        awayTeam: 'MAN CITY',
        venue: 'Liga Stadium',
        competition: 'Premier League',
        homeScore: 3,
        awayScore: 1,
    },
    {
        id: 5,
        date: '01 Feb 2025',
        time: '17:30',
        homeTeam: 'LIVERPOOL',
        awayTeam: 'LIGA FC',
        venue: 'Anfield',
        competition: 'Premier League',
        homeScore: 2,
        awayScore: 2,
    },
    {
        id: 6,
        date: '25 Jan 2025',
        time: '15:00',
        homeTeam: 'LIGA FC',
        awayTeam: 'REAL MADRID',
        venue: 'Liga Stadium',
        competition: 'Champions League',
        homeScore: 4,
        awayScore: 0,
    },
]

interface Match {
    id: number
    date: string
    time: string
    homeTeam: string
    awayTeam: string
    venue: string
    competition: string
    homeScore: number | null
    awayScore: number | null
}

const MatchRow = ({ match, index }: { match: Match; index: number }) => (
    <motion.div
        className="grid grid-cols-12 gap-4 py-6 border-b border-border items-center hover:bg-secondary/50 transition-colors px-4 -mx-4 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
    >
        <div className="col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {match.date}
        </div>
        <div className="col-span-1 text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {match.time}
        </div>
        <div className="col-span-3 text-right font-display font-bold text-lg">
            {match.homeTeam}
        </div>
        <div className="col-span-2 text-center">
            {match.homeScore !== null ? (
                <div className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-bold">
                    <span>{match.homeScore}</span>
                    <span className="text-muted-foreground">-</span>
                    <span>{match.awayScore}</span>
                </div>
            ) : (
                <span className="text-muted-foreground font-medium">VS</span>
            )}
        </div>
        <div className="col-span-3 font-display font-bold text-lg">
            {match.awayTeam}
        </div>
        <div className="col-span-1 text-right">
            <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowRight className="w-4 h-4" />
            </Button>
        </div>
    </motion.div>
)

export const Matches = () => {
    return (
        <section id="matches" className="py-24 bg-background">
            <div className="container mx-auto">
                <motion.div
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div>
                        <h2 className="text-display text-4xl md:text-6xl mb-4">
                            UPCOMING AND
                            <br />
                            <span className="text-muted-foreground">
                                LATEST MATCHES
                            </span>
                        </h2>
                    </div>
                    <Button className="btn-liga mt-6 md:mt-0">
                        View All Matches
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </motion.div>

                <Tabs defaultValue="upcoming" className="w-full">
                    <TabsList className="mb-8 bg-secondary/50 p-1 rounded-full">
                        <TabsTrigger
                            value="upcoming"
                            className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            Upcoming Matches
                        </TabsTrigger>
                        <TabsTrigger
                            value="recent"
                            className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            Recent Results
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="hidden md:block">
                        <div className="bg-card rounded-2xl border border-border p-6">
                            {upcomingMatches.map((match, index) => (
                                <MatchRow
                                    key={match.id}
                                    match={match}
                                    index={index}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="recent" className="hidden md:block">
                        <div className="bg-card rounded-2xl border border-border p-6">
                            {recentMatches.map((match, index) => (
                                <MatchRow
                                    key={match.id}
                                    match={match}
                                    index={index}
                                />
                            ))}
                        </div>
                    </TabsContent>

                    {/* Mobile View */}
                    <TabsContent value="upcoming" className="md:hidden">
                        <div className="space-y-4">
                            {upcomingMatches.map((match, index) => (
                                <motion.div
                                    key={match.id}
                                    className="bg-card rounded-xl border border-border p-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-muted-foreground">
                                            {match.competition}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {match.date}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-display font-bold">
                                            {match.homeTeam}
                                        </span>
                                        <span className="text-muted-foreground">
                                            VS
                                        </span>
                                        <span className="font-display font-bold">
                                            {match.awayTeam}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        {match.venue}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="recent" className="md:hidden">
                        <div className="space-y-4">
                            {recentMatches.map((match, index) => (
                                <motion.div
                                    key={match.id}
                                    className="bg-card rounded-xl border border-border p-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-sm text-muted-foreground">
                                            {match.competition}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {match.date}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-display font-bold">
                                            {match.homeTeam}
                                        </span>
                                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg font-bold text-sm">
                                            {match.homeScore} -{' '}
                                            {match.awayScore}
                                        </div>
                                        <span className="font-display font-bold">
                                            {match.awayTeam}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}
