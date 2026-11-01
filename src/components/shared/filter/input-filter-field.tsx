import { forwardRef } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type InputFilterFieldProps = React.ComponentProps<'input'> & {
  id: string
  label: string
}

export const InputFilterField = forwardRef<
  HTMLInputElement,
  InputFilterFieldProps
>(({ id, label, className, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>

      <Input
        id={id}
        ref={ref}
        className={`h-10 w-full ${className ?? ''}`}
        {...props}
      />
    </div>
  )
})

InputFilterField.displayName = 'InputFilterField'