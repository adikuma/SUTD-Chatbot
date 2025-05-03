import { SxProps, Theme } from '@mui/material'
import { DateRangeMode } from '@enums'
import { Variant } from '@enums/ui'

export interface DatePickerProps {
  label?: string
  attribute: any
  setAttribute?: React.Dispatch<React.SetStateAction<any>>
  targetKey?: string
  options?: DateRangeMode[]
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  variant?: Variant.InputField
  fullWidth?: boolean
  sx?: SxProps<Theme>
}
