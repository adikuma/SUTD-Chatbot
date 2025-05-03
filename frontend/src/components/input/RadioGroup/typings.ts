import { SxProps, Theme } from '@mui/material'
import { Color } from '@enums/ui'

export interface RadioGroupProps {
  label: string
  attribute: string
  setAttribute?: React.Dispatch<React.SetStateAction<any>>
  options: Array<{ label: string; value: any }>
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  rowDisplay?: boolean
  color?: Color.Default
  sx?: SxProps<Theme>
}

export interface RadioGroupItemProps {
  option: { label: string; value: any }
  attribute: string
  color?: Color.Default
}
