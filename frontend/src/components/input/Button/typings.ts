import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Color, Size, Variant } from '@enums/ui'

export interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: Variant.Button
  color?: Color.Inherit
  size?: Size.LongSize
  startIcon?: ReactNode
  endIcon?: ReactNode
  sx?: SxProps<Theme>
}
