import { SxProps, Theme } from '@mui/material'
import { LabelVisibility } from '@enums/ui'

export interface SliderProps {
  label: string
  attribute: number | number[]
  setAttribute: React.Dispatch<React.SetStateAction<number | number[]>>
  required?: boolean
  disabled?: boolean
  error?: boolean
  helperText?: string
  min?: number
  max?: number
  step?: number
  marks?: boolean | { label: string; value: number }[]
  labelVisibility?: LabelVisibility
  sx?: SxProps<Theme>
}
