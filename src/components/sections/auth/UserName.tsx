import { useState } from 'react'
import { Label } from '@/components/ui/label'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group'
import { Icon } from '@iconify/react'
import { debounce } from 'lodash'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { memo } from 'react'

interface UserNameProps {
    mode: 'login' | 'signup' | 'forgot-password'
    handleInputChange: (field: string, value: string) => void
}

const UserName = memo(function UserName({
    mode,
    handleInputChange,
}: UserNameProps) {
    const supabase = createClient()

    const [isUsernameAvailable, setIsUsernameAvailable] = useState<
        boolean | null
    >(null)
    const handleCheckUsername = async (username: string) => {
        console.log(username)
        handleInputChange('userName', username)
        if (username.length < 2) {
            setIsUsernameAvailable(null)
            return
        }
        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .maybeSingle()

        if (error && error.code !== 'PGRST116') {
            toast.error('Error checking username:', {
                description: error.message,
            })
            console.error('Error', error.message, error.details, error)
            setIsUsernameAvailable(false)

            return
        }
        if (error) {
            console.error('Error', error.message, error.details, error)
        }
        if (!data) {
            console.log(data)
            setIsUsernameAvailable(true)
        }

        if (data) {
            toast.error('Username already taken')
            console.log(data)
            setIsUsernameAvailable(false)
        }
    }
    const debouncedCheck = debounce(handleCheckUsername, 500)
    return (
        <div>
            <Label htmlFor="userName" className="text-card-foreground">
                Username
            </Label>

            <InputGroup id="userName" className="mt-1">
                <InputGroupInput
                    placeholder="Enter your username"
                    type="text"
                    required={mode === 'signup'}
                    onChange={(e) => debouncedCheck(e.target.value)}
                />
                <InputGroupAddon>
                    <p>@</p>
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                    {isUsernameAvailable !== null && (
                        <div className="flex size-4 items-center justify-center rounded-full">
                            <Icon
                                icon={`${
                                    isUsernameAvailable
                                        ? 'uis:check-circle'
                                        : 'akar-icons:circle-x-fill'
                                }`}
                                className={`size-4 ${
                                    isUsernameAvailable
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }`}
                            />
                        </div>
                    )}
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
})

export default UserName
