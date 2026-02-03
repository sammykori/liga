import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { type LoginFormData } from '@/app/login/page'

type PasswordProps = {
    formData: LoginFormData
    handleInputChange: (field: string, value: string) => void
}
function Password({ formData, handleInputChange }: PasswordProps) {
    return (
        <div>
            <Label htmlFor="password" className="text-card-foreground">
                Password
            </Label>
            <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                className="mt-1"
            />
        </div>
    )
}

export default Password
