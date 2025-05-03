import { SxProps, Theme } from '@mui/material'
import { Size } from '@enums/ui'

export interface RatingProps {
  label?: string
  attribute: number | null
  setAttribute?: React.Dispatch<React.SetStateAction<number | null>>
  disabled?: boolean
  error?: boolean
  helperText?: string
  readOnly?: boolean
  precision?: number
  max?: number
  size?: Size.LongSize
  sx?: SxProps<Theme>
}
