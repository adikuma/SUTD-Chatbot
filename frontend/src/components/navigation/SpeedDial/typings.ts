import { ReactNode } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Direction } from '@enums/ui'

export interface SpeedDialProps {
  items: SpeedDialItemProps[]
  icon?: ReactNode
  openIcon?: ReactNode
  direction?: Direction
  sx?: SxProps<Theme>
}

export interface SpeedDialItemProps {
  icon: ReactNode
  description: string
  onClick: () => void
}
