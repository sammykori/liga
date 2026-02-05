import { Header } from '@/components/landing/Header'
import { Hero } from '@/components/landing/Hero'
import { Matches } from '@/components/landing/Matches'
import { News } from '@/components/landing/News'
import { Founders } from '@/components/landing/Founders'
import { Footer } from '@/components/landing/Footer'

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <main>
                <Hero />
                <Matches />
                <News />
                <Founders />
            </main>
        </div>
    )
}

export default Index
