import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react'

type SubmitButtonProps = {
    isLoading: boolean
    mode: 'login' | 'signup' | 'forgot-password'
}

function SubmitButton({ isLoading, mode }: SubmitButtonProps) {
    return (
        <Button
            type="submit"
            className="w-full hover:opacity-90 transition-opacity"
            disabled={isLoading}
        >
            {isLoading ? (
                <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
            ) : mode === 'forgot-password' ? (
                'Send Reset Link'
            ) : mode === 'signup' ? (
                'Create Account'
            ) : (
                'Sign In'
            )}
        </Button>
    )
}

export default SubmitButton
