import { SxProps, Theme } from '@mui/material'
import { Variant } from '@enums/ui'

export interface PasswordFieldProps {
  label?: string
  attribute: string
  setAttribute: React.Dispatch<React.SetStateAction<string>>
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  variant?: Variant.InputField
  fullWidth?: boolean
  sx?: SxProps<Theme>
}
