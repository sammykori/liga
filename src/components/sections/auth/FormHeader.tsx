'use client'
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import Link from 'next/link'
function FormHeader({
    mode,
}: {
    mode: 'login' | 'signup' | 'forgot-password'
}) {
    const getTitle = () => {
        switch (mode) {
            case 'signup':
                return 'Create Account'
            case 'forgot-password':
                return 'Reset Password'
            default:
                return 'Welcome Back'
        }
    }

    const getDescription = () => {
        switch (mode) {
            case 'signup':
                return 'Create your account to start rating players'
            case 'forgot-password':
                return 'Enter your email to receive a password reset link'
            default:
                return 'Sign in to your account to continue'
        }
    }
    return (
        <CardHeader className="text-center space-y-4">
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto"
            >
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
            </motion.div>
            <div>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                    {getTitle()}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2">
                    {getDescription()}
                </CardDescription>
            </div>
        </CardHeader>
    )
}

export default FormHeader
