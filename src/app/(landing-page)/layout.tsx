import type { Metadata } from 'next'
import { Header } from '@/components/landing/Header'
import { Footer } from '@/components/landing/Footer'

export const metadata: Metadata = {
    title: 'Liga',
    description: 'A Player Rating App',
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="w-full min-h-screen bg-background relative">
            <Header />

            {children}

            <Footer />
        </div>
    )
}
