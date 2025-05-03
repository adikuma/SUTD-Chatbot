import { SxProps, Theme } from '@mui/material'
import { Variant } from '@enums/ui'

export interface TextFieldProps {
  label?: string
  attribute: any
  setAttribute?: React.Dispatch<React.SetStateAction<any>>
  type?: Variant.TextField
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  min?: number
  max?: number
  step?: number
  variant?: Variant.InputField
  fullWidth?: boolean
  sx?: SxProps<Theme>
  [x: string]: any
}
