import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type LoginFormData } from '@/app/login/page'
import { memo } from 'react'

type DoBProps = {
    formData: LoginFormData
    handleInputChange: (field: string, value: string) => void
    mode: 'login' | 'signup' | 'forgot-password'
}

const DoB = memo(function DoB({ formData, handleInputChange, mode }: DoBProps) {
    return (
        <div>
            <Label htmlFor="dob" className="text-card-foreground">
                Date of Birth
            </Label>
            <Input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                required={mode === 'signup'}
                className="mt-1"
            />
        </div>
    )
})

export default DoB
