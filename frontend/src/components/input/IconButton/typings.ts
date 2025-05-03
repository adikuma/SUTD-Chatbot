import { ReactNode, MouseEvent } from 'react'
import { SxProps, Theme } from '@mui/material'
import { Color, Edge, Size } from '@enums/ui'

export interface IconButtonProps {
  icon: ReactNode
  description: string
  onClick: () => void
  onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  color?: Color.DefaultInherit
  size?: Size.LongSize
  edge?: Edge | false
  sx?: SxProps<Theme>
}
