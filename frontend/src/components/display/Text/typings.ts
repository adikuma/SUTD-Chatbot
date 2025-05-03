import { SxProps, Theme } from '@mui/material'
import { Align, Color, Variant } from '@enums/ui'

export interface TextProps {
  content: string
  variant?: Variant.Text
  color?: Color.Text
  align?: Align
  sx?: SxProps<Theme>
}
