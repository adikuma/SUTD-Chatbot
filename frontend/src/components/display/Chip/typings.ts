import { ReactElement } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Color, Variant } from '@enums/ui'

export interface ChipProps {
  label: string
  clickable?: boolean
  onClick?: () => void
  onDelete?: () => void
  disabled?: boolean
  variant?: Variant.Chip
  color?: Color.Default
  avatar?: ReactElement
  icon?: ReactElement
  sx?: SxProps<Theme>
}
