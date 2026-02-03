type FormFooterProps = {
    mode: 'login' | 'signup' | 'forgot-password'
    setMode: (mode: 'login' | 'signup' | 'forgot-password') => void
}

function FormFooter({ mode, setMode }: FormFooterProps) {
    return (
        <div className="mt-6 space-y-3 text-center">
            {mode === 'login' && (
                <>
                    <button
                        type="button"
                        onClick={() => setMode('forgot-password')}
                        className="text-sm text-primary hover:underline"
                    >
                        Forgot your password?
                    </button>
                    <div className="text-sm text-muted-foreground">
                        Don&apos;t have an account?{' '}
                        <button
                            type="button"
                            onClick={() => setMode('signup')}
                            className="text-primary hover:underline font-medium"
                        >
                            Sign up
                        </button>
                    </div>
                </>
            )}

            {mode === 'signup' && (
                <div className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </button>
                </div>
            )}

            {mode === 'forgot-password' && (
                <div className="text-sm text-muted-foreground">
                    Remember your password?{' '}
                    <button
                        type="button"
                        onClick={() => setMode('login')}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign in
                    </button>
                </div>
            )}
        </div>
    )
}

export default FormFooter
