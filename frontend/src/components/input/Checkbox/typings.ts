import { SxProps, Theme } from '@mui/material'
import { Color } from '@enums/ui'

export interface CheckboxProps {
  label?: string
  attribute: boolean
  setAttribute?: React.Dispatch<React.SetStateAction<boolean>>
  onChange?: () => void
  indeterminate?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  color?: Color.Default
  sx?: SxProps<Theme>
}
