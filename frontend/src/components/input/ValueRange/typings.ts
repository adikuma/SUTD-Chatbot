import { SxProps, Theme } from '@mui/material'
import { ValueRange } from '@typings/common'

export interface ValueRangeProps {
  label: string
  attribute: ValueRange
  setAttribute: React.Dispatch<React.SetStateAction<ValueRange>>
  disabled?: boolean
  helperText?: string
  constraints?: { min: number[]; max: number[]; step: number[] }
  spaceBetween?: boolean
  sx?: SxProps<Theme>
}
