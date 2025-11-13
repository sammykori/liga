import type { Metadata } from "next";
import { Geist, Geist_Mono, Lobster, Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import { AuthWatcher } from "@/lib/AuthWatcher";
import InstallPrompt from "@/components/sections/notifications/install-prompt";
import PushNotificationManager from "@/components/sections/notifications/push-notification-manager";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
const lobster = Lobster({
    variable: "--font-lobster",
    subsets: ["latin"],
    weight: ["400"],
});

const lexend = Lexend({
    variable: "--font-lexend",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Liga",
    description: "A Player Rating App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${lobster.variable} ${lexend.className} antialiased`}
            >
                <ReactQueryProvider>
                    <AuthWatcher />
                    <PushNotificationManager />
                    <InstallPrompt />
                    <Toaster position="top-right" richColors />
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    );
}
