import { SxProps, Theme } from '@mui/material'
import { Color } from '@enums/ui'

export interface SwitchProps {
  label?: string
  attribute: boolean
  setAttribute: React.Dispatch<React.SetStateAction<boolean>>
  disabled?: boolean
  error?: boolean
  helperText?: string
  color?: Color.Default
  sx?: SxProps<Theme>
}
