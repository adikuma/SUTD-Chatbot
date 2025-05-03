import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Color, Target, Underline, Variant } from '@enums/ui'

export interface LinkProps {
  children: ReactNode
  href: string
  target?: Target
  variant?: Variant.Text
  color?: Color.Link
  underline?: Underline
  sx?: SxProps<Theme>
}
