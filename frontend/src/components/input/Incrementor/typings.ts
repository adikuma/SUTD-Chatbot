import { SxProps, Theme } from '@mui/material'

export interface IncrementorProps {
  label?: string
  attribute: number
  setAttribute: React.Dispatch<React.SetStateAction<number>>
  disabled?: boolean
  error?: boolean
  helperText?: string
  min?: number
  max?: number
  step?: number
  sx?: SxProps<Theme>
}
