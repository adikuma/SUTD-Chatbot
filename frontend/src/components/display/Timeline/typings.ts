import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Color, Variant } from '@enums/ui'

export interface TimelineProps {
  items: ReactNode[]
  variant?: Variant.TimelineDot
  color?: Color.Inherit
  sx?: SxProps<Theme>
}

export interface TimelineItemProps {
  item: ReactNode
  lastItem: boolean
  variant?: Variant.TimelineDot
  color?: Color.Inherit
}
