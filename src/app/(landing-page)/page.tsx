import { Hero } from '@/components/landing/Hero'
import { News } from '@/components/landing/News'
import { Founders } from '@/components/landing/Founders'

const Index = () => {
    return (
        <div className="min-h-screen bg-background">
            <main>
                <Hero />

                <News />
                <Founders />
            </main>
        </div>
    )
}

export default Index
