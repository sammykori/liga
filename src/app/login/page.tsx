'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { Icon } from '@iconify/react'
import { z } from 'zod'
import { useState, useEffect, useCallback } from 'react'
import { PostgrestError } from '@supabase/supabase-js'
import Password from '@/components/sections/auth/Password'
import FormFooter from '@/components/sections/auth/FormFooter'
import FormHeader from '@/components/sections/auth/FormHeader'
import DoB from '@/components/sections/auth/DoB'

import UserName from '@/components/sections/auth/UserName'
import SubmitButton from '@/components/sections/auth/SubmitButton'

const authSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: 'Invalid email address' })
        .max(255, { message: 'Email must be less than 255 characters' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' })
        .max(128, { message: 'Password must be less than 128 characters' }),
    userName: z
        .string()
        .trim()
        .min(3, { message: 'Name must be at least 2 characters' })
        .max(100, { message: 'Name must be less than 100 characters' })
        .optional(),
})

type AuthMode = 'login' | 'signup' | 'forgot-password'
export type LoginFormData = {
    email: string
    password: string
    userName: string
    dob: string
}

export default function Auth() {
    const supabase = createClient()
    const navigate = useRouter()
    const searchParams = useSearchParams()
    const [mode, setMode] = useState<AuthMode>('login')
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        userName: '',
        dob: '',
    })
    const [isUsernameAvailable, setIsUsernameAvailable] = useState<
        boolean | null
    >(null)

    useEffect(() => {
        const authMode = searchParams.get('mode') as AuthMode
        if (
            authMode &&
            ['login', 'signup', 'forgot-password'].includes(authMode)
        ) {
            setMode(authMode)
        }
    }, [searchParams])

    useEffect(() => {
        // Check if user is already logged in
        const checkSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            if (session) {
                navigate.push('/')
            }
        }
        checkSession()

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                navigate.push('/')
            }
        })

        return () => subscription.unsubscribe()
    }, [navigate, supabase])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setIsUsernameAvailable(null)

        try {
            if (mode === 'forgot-password') {
                const emailValidation = z
                    .string()
                    .email()
                    .safeParse(formData.email)
                if (!emailValidation.success) {
                    toast.error('Invalid email', {
                        description: emailValidation.error.message,
                    })
                    return
                }

                const { error } = await supabase.auth.resetPasswordForEmail(
                    formData.email,
                    {
                        redirectTo: `${window.location.origin}`,
                    }
                )

                if (error) throw error

                toast('Password reset email sent', {
                    description:
                        'Check your email for the password reset link.',
                })
                setMode('login')
            } else {
                const validation = authSchema.safeParse({
                    ...formData,
                    userName: mode === 'signup' ? formData.userName : undefined,
                    dob: mode === 'signup' ? formData.dob : undefined,
                })

                if (!validation.success) {
                    console.log(formData)
                    toast.error('Validation error', {
                        description: validation.error.message,
                    })
                    return
                }

                if (mode === 'signup') {
                    const { data, error } = await supabase.auth.signUp({
                        email: formData.email,
                        password: formData.password,
                        options: {
                            emailRedirectTo: `${window.location.origin}`,
                            data: {
                                givenName: formData.userName,
                                dob: formData.dob,
                            },
                        },
                    })
                    if (!data.user) {
                        console.warn(
                            'User not created: email may already exist.'
                        )
                        toast.error('User not created:', {
                            description: 'Email may already exist.',
                        })
                    }

                    if (error) {
                        console.error(error)

                        toast.error('Signup error:', {
                            description: error.name + ': ' + error.message,
                        })
                    }

                    toast.success('Account created successfully', {
                        description:
                            'Please check your email to verify your account.',
                    })
                    setMode('login')
                } else {
                    const { error } = await supabase.auth.signInWithPassword({
                        email: formData.email,
                        password: formData.password,
                    })

                    if (error) {
                        console.error(error)

                        toast.error('Invalid username or password', {
                            description:
                                'Please check your email and password are correct.',
                        })
                    }

                    // Navigation is handled by auth state change
                }
            }
        } catch (error) {
            if (error instanceof PostgrestError) {
                toast.error('Authentication error', {
                    description:
                        error.message || 'An unexpected error occurred.',
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = useCallback((field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }, [])

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-border shadow-soft">
                    <FormHeader mode={mode} />

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="wait">
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        <UserName
                                            handleInputChange={
                                                handleInputChange
                                            }
                                            mode={mode}
                                        />
                                        <DoB
                                            formData={formData}
                                            handleInputChange={
                                                handleInputChange
                                            }
                                            mode={mode}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div>
                                <Label
                                    htmlFor="email"
                                    className="text-card-foreground"
                                >
                                    Email
                                </Label>
                                <div>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            handleInputChange(
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        required
                                        className="mt-1"
                                    />
                                    <div>
                                        <Icon icon="" />
                                    </div>
                                </div>
                            </div>

                            {mode !== 'forgot-password' && (
                                <Password
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                />
                            )}
                            <SubmitButton mode={mode} isLoading={isLoading} />
                        </form>

                        <FormFooter mode={mode} setMode={setMode} />
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
